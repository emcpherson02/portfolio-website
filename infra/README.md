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

**Free permanently, independent of any free-tier status:**

| Service | Always-free allowance | This site's usage |
|---|---|---|
| CloudFront data out | 1 TB/month | a few MB |
| CloudFront requests | 10M/month | hundreds |
| CloudFront Functions | 2M invocations/month | one per request |
| ACM certificates | public certs are free | 1 |
| CloudFormation | no charge for `AWS::*` types | 2 stacks |
| IAM | free | 1 role |
| S3 → CloudFront transfer | free | cache misses only |

**Not free forever:** S3 storage and requests. For a ~5 MB site that is
fractions of a penny per month — but it is not zero once free-tier allowances
lapse. Versioning is deliberately disabled so stored bytes cannot creep up.

CloudFront invalidations are free for the first 1,000 paths per month. The
deploy workflow invalidates `/*`, which bills as a single path.

### Set a zero-spend budget first

Before deploying, create a budget so any charge at all reaches you:

Billing and Cost Management → Budgets → Create budget → **Zero spend budget**
template → add your email.

The first two budgets are free. This is the safety net: if something is ever
misconfigured, you hear about it at the first cent rather than at the end of
the month.

### Free Tier plan, if the account was created on or after 15 July 2025

Newer accounts are on a credit-based Free Tier rather than the old 12-month
one. The Free Plan ends six months after account creation, or when the signup
credits are exhausted, whichever comes first — and an expired Free Plan
account has to be upgraded to a Paid plan to stay active.

That matters for a site that needs to stay reachable. Check the plan and
remaining credits under Billing and Cost Management → Free Tier, and diarise
the expiry. Upgrading to a Paid plan does not itself cost anything; it just
means the sub-penny S3 charges above start landing on a card.

`PriceClass_100` (US/Canada/Europe) is the default. Widen it only if you
expect traffic from elsewhere.

## Notes

The bucket has `DeletionPolicy: Retain`, so deleting the stack leaves the
content. Empty and remove it by hand if you genuinely want it gone.

The bucket policy grants read to the CloudFront *service principal*, narrowed
by `AWS:SourceArn` to this one distribution. Without that condition the grant
would extend to CloudFront generally.
