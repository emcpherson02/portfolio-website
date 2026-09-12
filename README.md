# Portfolio

Personal portfolio and CV for Elliott McPherson, platform engineer in Belfast.
A static site, exported from Next.js and served from Firebase Hosting.

**elliottmcpherson-portfolio.co.uk**

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion ·
shadcn/ui · lucide

Tailwind 4 is configured in CSS rather than a config file — theme tokens live in
`@theme inline` in `src/app/globals.css`.

## Architecture

Two routes, both client components. The site is animation-heavy and has no
server-side data fetching, API routes or dynamic segments, so it exports to
static files (`output: 'export'`).

| | |
|---|---|
| `src/app/page.tsx` | Single-page portfolio, composed from `src/components/sections/` |
| `src/app/resume/page.tsx` | CV, with content in `src/data/resume.ts` |

## Verifying the export

`next dev` hydrates immediately, so it structurally cannot show bugs that exist
only in the exported HTML — content shipping at `opacity: 0`, or a page whose
text is gated behind a client-side timer. Both of those shipped here before.

`scripts/verify-export.sh` asserts against the built output instead: nothing
hidden, the CV present as text, internal links carrying trailing slashes, static
assets copied. It runs in CI ahead of every deploy, so a build that would
publish a blank page fails first.

## CI/CD

GitHub Actions, on Firebase Hosting.

- **Push to `main`** — lint, build, export checks, then deploy to the live channel
- **Pull request** — the same checks, then a preview channel
- **PR closed** — the preview channel is deleted

Auth is a Google service account held in repository secrets. Workflows touching
it are guarded against pull requests from forks.

Cache headers and the Content-Security-Policy are in `firebase.json`.

## Scripts

| | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check, build, export to `out/` |
| `npm run preview` | Build and serve `out/` — the actual deployable output |
| `npm run verify` | Build, then assert the export is shippable |
| `npm run lint` | ESLint |
| `npm run check:a11y` | axe, against a running `preview` |
