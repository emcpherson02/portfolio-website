# Portfolio

Personal portfolio and CV for Elliott McPherson. Next.js App Router, exported
as a static site and served from S3 behind CloudFront.

**Live:** not currently deployed.

## Running it

Requires Node 20.9 or newer (developed on 22).

```bash
npm ci
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. Fast, but see the warning below |
| `npm run build` | Type-checks, then builds and exports to `out/` |
| `npm run preview` | Builds and serves `out/` on :3001 — the real deployable output |
| `npm run verify` | Builds, then asserts the export is actually shippable |
| `npm run lint` | ESLint |
| `npm run check:a11y` | axe against a running `preview` server |

### Verify what you ship, not what dev shows you

`npm run dev` cannot catch a whole class of bug in this project, because the
dev server hydrates immediately and the exported HTML is what actually gets
deployed. Two real examples, both of which shipped in this repo:

- Motion serialises `initial` into the markup, so `initial={{ opacity: 0 }}`
  put every section into the HTML invisible. With JS it looked fine; to a
  crawler or link-preview bot the page was blank.
- The resume gated all its content behind a 3-second timer, so the exported
  `/resume` contained a loading splash and nothing else — no CV text at all.

`scripts/verify-export.sh` asserts against the built output: nothing ships at
`opacity: 0`, the CV exists as text (including inside collapsed timeline
panels), internal links carry the trailing slashes a CloudFront/S3 origin
needs, and the PDF was copied. **Run `npm run verify` before deploying.**

## Architecture

Two routes, both client components — the site is animation-heavy and has no
server-side data fetching.

- `src/app/page.tsx` — the single-page portfolio, composing the sections in
  `src/components/sections/`, each wrapped in `ScrollRevealSection`.
- `src/app/resume/page.tsx` — the CV. Content comes from `src/data/resume.ts`.

`ScrollRevealSection` renders visible on the server and only arms its hidden
state once hydrated, so nothing reaches the HTML invisible. It uses
`amount: "some"` deliberately: a numeric `amount` is measured against the
element rather than the viewport, so a section taller than the viewport can
never satisfy it and stays hidden forever.

Timeline disclosure panels are always rendered and toggled with `hidden`,
rather than conditionally rendered, so role detail is in the page for
crawlers and print while staying out of the accessibility tree when collapsed.

## Styling

Tailwind 4 with CSS-native config — there is no `tailwind.config.js`. Theme
tokens live in `@theme inline` in `src/app/globals.css`, alongside the print
stylesheet. UI primitives in `src/components/ui/` are shadcn/ui (new-york);
add more with `npx shadcn add <component>` rather than hand-rolling them.

There is no dark mode. The `@custom-variant dark` line in `globals.css` is
load-bearing anyway — see the comment there before removing it.

## Deployment

Static export to S3 + CloudFront with Origin Access Control, fronted by a
GoDaddy domain, deployed by GitHub Actions using OIDC role assumption rather
than stored AWS keys.

Note that CloudFront's Default Root Object only covers `/`. With an S3 REST
origin, `/resume/` maps to a key that does not exist and 403s, so the
distribution needs a CloudFront Function to append `index.html` to directory
paths.
