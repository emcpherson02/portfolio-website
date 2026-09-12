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

DNS stays at GoDaddy. `www` is the canonical address and the apex redirects to
it:

- **`www`** → CNAME → the CloudFront domain. Straightforward.
- **The apex** (the bare domain) cannot be a CNAME. A CNAME may not coexist
  with other records at the same name, and the apex must carry SOA and NS
  records, so the DNS spec forbids it. GoDaddy has no ALIAS/ANAME record to
  work around this. Use **Domain Forwarding** instead: forward the apex to
  `https://www.YOURDOMAIN.com`, permanent (301), forward only.

That costs one redirect for anyone typing the bare domain. It is fine for SEO
as long as one version is consistently canonical, which is why `www` is set as
the canonical URL in `src/app/layout.tsx`.

The distribution is created with both names as aliases and the certificate
covers both, so switching the apex to a proper ALIAS later — by moving
nameservers to Route 53, about $6/year — needs no changes here.

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
a few MB, and DNS stays at GoDaddy where it is already paid for. Realistically
this runs at pennies a month.

`PriceClass_100` (US/Canada/Europe) is the default. Widen it only if you
expect traffic from elsewhere.

## Notes

The bucket has `DeletionPolicy: Retain`, so deleting the stack leaves the
content. Empty and remove it by hand if you genuinely want it gone.

The bucket policy grants read to the CloudFront *service principal*, narrowed
by `AWS:SourceArn` to this one distribution. Without that condition the grant
would extend to CloudFront generally.
