# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio website for Elliott McPherson, built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4. Its purpose is to demonstrate employability to potential employers, so correctness, polish, and working links/images matter more than they would on a throwaway project.

The repo was originally vibe-coded a year ago with an earlier Claude model against an AWS account that has since been deleted. **The site is not currently deployed anywhere.** `amplify.yml` reflects the old AWS Amplify deployment, which is defunct — a new AWS account exists, but hosting may move to Firebase instead (undecided as of this writing; confirm before doing migration work). Treat existing code as unreviewed and verify behavior rather than assuming it still works.

**Known broken: project images.** [src/config/aws-config.ts](src/config/aws-config.ts) points at a CloudFront distribution (`d3sc4ffh0e7l94.cloudfront.net`) tied to the deleted AWS account — the domain no longer resolves (DNS failure). Every project screenshot rendered via `awsConfig.imageBaseUrl` in `FeaturedProjects.tsx` needs new image hosting once a hosting decision is made (S3+CloudFront under the new AWS account, Firebase Storage, or simply serving images from `public/`).

## Commands

- `npm run dev` — start dev server with Turbopack
- `npm run build` — type-checks against `tsconfig.amplify.json` (relaxed: `strict: false`, `noImplicitAny: false`) then runs `next build`. This is the same build used in Amplify CI.
- `npm run start` — serve the production build
- `npm run lint` — run `next lint` (flat config extending `next/core-web-vitals` and `next/typescript`)

There is no test suite configured in this repo.

## Architecture

**Two routes only**: `/` ([src/app/page.tsx](src/app/page.tsx)) is the single-page portfolio; `/resume` ([src/app/resume/page.tsx](src/app/resume/page.tsx)) is a standalone CV page. Both are client components (`'use client'`) rather than server components, since the site is animation-heavy and interactive throughout.

**Home page composition**: `page.tsx` composes section components (`Hero`, `FeaturedProjects`, `Skills`, `Contact` in [src/components/sections/](src/components/sections/)) each wrapped in [ScrollRevealSection.tsx](src/components/ScrollRevealSection.tsx) — a shared scroll-triggered animation wrapper (Framer Motion `useInView`) that also staggers the animation of its direct children. New homepage sections should follow this same wrap-in-`ScrollRevealSection` pattern rather than rolling custom scroll-reveal logic.

**Resume page composition**: `/resume` is assembled from dedicated components in [src/components/resume/](src/components/resume/) — `InteractiveTimeline` (expandable work/education/project entries defined inline in `resume/page.tsx` as an `events` array), `SkillList`/`ProgressBar`, `CVTitle`, `ResumeLoading` (a timed splash screen gating page reveal), `ResumeNav`, `ScrollButton`, and `PrintableResume` (print-specific rendering). Resume content (timeline events, skill lists, summary text) is hardcoded directly in `resume/page.tsx`, not pulled from a CMS or data file.

**UI primitives**: [src/components/ui/](src/components/ui/) holds shadcn/ui components (`button`, `badge`, `input`, `textarea`) configured via [components.json](components.json) (style: new-york, base color: slate, icon library: lucide). Use `npx shadcn add <component>` to add more rather than hand-rolling primitives, to stay consistent with existing ones. The `cn()` helper in [src/lib/utils.ts](src/lib/utils.ts) (clsx + tailwind-merge) is the standard way to compose conditional class names throughout the codebase.

**Styling**: Tailwind CSS 4 using the new `@theme inline` / `@import "tailwindcss"` syntax in [src/app/globals.css](src/app/globals.css) (no `tailwind.config.js` — theme tokens and dark-mode variant (`@custom-variant dark`) are defined directly in CSS). Global keyframe/animation classes live in [src/animations.css](src/animations.css), imported once in [src/app/layout.tsx](src/app/layout.tsx) alongside `globals.css`.

**Images**: Project screenshots are hosted on S3 behind CloudFront rather than committed to `public/`. The CloudFront base URL is set in [src/config/aws-config.ts](src/config/aws-config.ts) (`awsConfig.imageBaseUrl`) and must also be whitelisted in `next.config.ts`'s `images.domains` for `next/image` to load it. `FeaturedProjects.tsx` builds full image URLs by concatenating `awsConfig.imageBaseUrl` with a project-specific path.

**InteractiveTerminal**: [src/components/InteractiveTerminal.tsx](src/components/InteractiveTerminal.tsx) is a self-contained simulated terminal component (typed command/output sequences) used for portfolio flair — not a real shell.

## Conventions

- 4-space indentation, and component files consistently open JSX props on the line after the tag name (see any existing `sections/` or `resume/` component for the prevailing formatting style) — match it when adding new components rather than reformatting.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json` and `components.json` aliases).
