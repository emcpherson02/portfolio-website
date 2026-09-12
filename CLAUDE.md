# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio and CV for Elliott McPherson: Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, exported as a **static site** (`output: 'export'`). Its purpose is to demonstrate employability, so correctness and polish are the product rather than incidental.

The site is **not currently deployed**. The original AWS account was deleted, taking the Amplify deployment and the CloudFront image origin with it. Target is S3 + CloudFront with OAC, behind a GoDaddy domain, deployed by GitHub Actions via OIDC.

## Commands

- `npm run dev` — dev server. Fast, but structurally blind to export-only bugs (see below)
- `npm run build` — `tsc --noEmit && next build`, exporting to `out/`
- `npm run preview` — builds and serves `out/` on :3001, which is the real deployable output
- `npm run verify` — build, then assert the export is shippable. **Run before deploying**
- `npm run lint` — ESLint (flat config)
- `npm run check:a11y` — axe, against a running `preview`

No test suite.

## The dev server cannot catch export-only bugs

This is the most important thing to know about the repo. `next dev` hydrates immediately, so anything that depends on JS having run looks fine there while being broken in the exported HTML that actually deploys. Two such bugs shipped here:

- Motion serialises `initial` into the markup, so `initial={{ opacity: 0 }}` put sections into the HTML invisible.
- `/resume` gated all content behind a timer, so the exported page held a splash screen and no CV text.

`scripts/verify-export.sh` guards both by grepping the built output. When adding content that must be indexable, add a term to its content checks. When touching animation, gating, routing or config, verify through `npm run preview`, not `npm run dev`.

## Architecture

**Two routes, both client components** — the site is animation-heavy with no server-side data fetching, no API routes and no dynamic segments.

- `src/app/page.tsx` composes the sections in `src/components/sections/`, each wrapped in `ScrollRevealSection`.
- `src/app/resume/page.tsx` renders the CV from `src/data/resume.ts`. Keep content in the data module, not the component.

**`ScrollRevealSection`** ([src/components/ScrollRevealSection.tsx](src/components/ScrollRevealSection.tsx)) is the shared scroll-reveal wrapper, and two of its details are deliberate:
- It renders visible on the server and only arms the hidden state after hydration (`useSyncExternalStore`), so nothing reaches the HTML invisible.
- `amount: "some"`, never a number. `amount` is a fraction *of the element*, not the viewport, so a numeric value can never be satisfied by a section taller than the viewport — it stays hidden permanently.

Sections should not add their own entrance animation on top of it. They used to, which both double-animated and put content into the HTML hidden.

**Timeline disclosure panels** are always rendered and toggled via the `hidden` attribute rather than conditionally rendered, so role detail exists in the page for crawlers and for print while staying out of the accessibility tree when collapsed. The print stylesheet relies on this.

**UI primitives** in [src/components/ui/](src/components/ui/) are shadcn/ui (new-york, slate, per [components.json](components.json)). Add more with `npx shadcn add <component>`. They are unmodified from upstream — keep it that way. `cn()` from [src/lib/utils.ts](src/lib/utils.ts) composes class names; never interpolate `className` into a template string, which renders literal `undefined` when the prop is absent.

**Brand icons** live in [src/components/icons/BrandIcons.tsx](src/components/icons/BrandIcons.tsx) as inline SVGs. lucide-react 1.x removed every brand icon, so `Github`/`Linkedin` do not exist in the package.

## Styling

Tailwind 4, CSS-native config — no `tailwind.config.js`. Theme tokens are in `@theme inline` in [src/app/globals.css](src/app/globals.css), which also holds the print stylesheet.

There is no dark mode; the palette was removed. **The `@custom-variant dark` line must stay** — it pins `dark:` to a class nothing sets. Removing it hands those utilities (still present in the shadcn primitives) back to `prefers-color-scheme`, where they would apply against light tokens for anyone on a dark OS.

Never define utility-shaped classes outside a `@layer`. A previous `animations.css` defined `.duration-300` as `animation-duration` at top level and beat Tailwind's own utility on source order, silently breaking every `transition-* duration-300` pairing in the app.

## Dependency constraints

Two versions are pinned against "latest" on purpose:

- **`typescript` exactly `6.0.2`**, not `^6.0.2`. typescript-eslint supports `<6.1.0`; a caret drifts past it.
- **`eslint` on 9.x.** `eslint-config-next@16` advertises `>=9.0.0`, but its own `eslint-plugin-react` dependency caps at `^9.7` and crashes under 10.

There is no `.npmrc`. `legacy-peer-deps` was removed once it resolved clean — it had been suppressing the install error that would have caught the ESLint 10 conflict immediately.

## Conventions

- 4-space indentation; match the prevailing JSX formatting rather than reformatting.
- `@/*` maps to `src/*`.
- Prefer plain `<a>` for external and `mailto:` links; `next/link` is for internal navigation.
