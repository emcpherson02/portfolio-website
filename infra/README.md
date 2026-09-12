# Infrastructure

Two CloudFormation stacks and a GitHub Actions workflow. Nothing here has been
run — deploy it yourself and check each step.

- `site.yaml` — private S3 bucket, CloudFront + OAC, ACM certificate, and a
  CloudFront Function for directory indexes.
- `github-oidc.yaml` — the IAM role Actions assumes. No access keys anywhere.
- `../.github/workflows/deploy.yml` — build, verify, sync, invalidate.

## Order

Both stacks **must** go in `us-east-1`. CloudFront only accepts ACM
certificates from that region.

### 1. Site stack

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name portfolio-site \
  --template-file infra/site.yaml \
  --parameter-overrides DomainName=YOURDOMAIN.com IncludeWww=true
```

This will **stop and wait** on the certificate. That is expected, not a hang:
DNS is at GoDaddy, so ACM has no hosted zone to write to and the validation
records have to be added by hand.

While it waits, open the ACM console in `us-east-1`, find the pending
certificate, and copy the CNAME name/value pairs it shows. In GoDaddy's DNS
manager add each as a CNAME. GoDaddy appends the domain automatically, so
strip the trailing `.YOURDOMAIN.com.` from the record name it gives you —
pasting the full name creates `_x.yourdomain.com.yourdomain.com` and
validation never completes.

Validation usually lands within a few minutes of the records propagating, and
the stack then continues on its own.

### 2. Point the domain at CloudFront

Take `DistributionDomainName` from the stack outputs (`dxxxxx.cloudfront.net`).

In GoDaddy DNS:
- `www` → CNAME → the CloudFront domain.
- The apex is the awkward one. CNAMEs are not allowed at a zone apex, and
  GoDaddy has no ALIAS/ANAME record. Options, best first:
  1. Move the domain's nameservers to Route 53 and use an A/ALIAS record at
     the apex. Cleanest, and lets future certificates auto-validate.
  2. Use GoDaddy's forwarding to redirect the apex to `www`. Works, but adds a
     redirect hop and forwarding has historically been flaky.

If you would rather serve the apex properly, do option 1 before going further.

### 3. Deploy role

```bash
aws cloudformation deploy \
  --region us-east-1 \
  --stack-name portfolio-deploy-role \
  --template-file infra/github-oidc.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides SiteStackName=portfolio-site
```

Pass `CreateOidcProvider=false` if this account already trusts GitHub's OIDC
provider — there can only be one per account, and a second create fails.

The role can only be assumed from `main` of `emcpherson02/portfolio-website`.
Without that `sub` condition any repository on GitHub could assume it.

### 4. GitHub repository variables

Settings → Secrets and variables → Actions → **Variables** (not secrets —
none of these are sensitive):

| Variable | Value |
|---|---|
| `AWS_DEPLOY_ROLE` | `RoleArn` output from the deploy-role stack |
| `AWS_SITE_BUCKET` | `BucketName` output from the site stack |
| `AWS_DISTRIBUTION_ID` | `DistributionId` output from the site stack |

Then push to `main`, or run the workflow manually.

## Costs

CloudFront's free tier — 1 TB out and 10M requests a month — is permanent
rather than 12-month, and a personal portfolio will not approach it. S3 holds
a few MB. Realistically this is pennies a month, dominated by the Route 53
hosted zone at $0.50/month if you take that option.

`PriceClass_100` (US/Canada/Europe) is the default. Widen it only if you
expect traffic from elsewhere.

## Notes

The bucket has `DeletionPolicy: Retain`, so deleting the stack leaves the
content. Empty and remove it by hand if you genuinely want it gone.

The bucket policy grants read to the CloudFront *service principal*, narrowed
by `AWS:SourceArn` to this one distribution. Without that condition the grant
would extend to CloudFront generally.
