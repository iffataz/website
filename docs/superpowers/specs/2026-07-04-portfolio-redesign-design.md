# Portfolio redesign — design spec

Date: 2026-07-04
Status: approved direction, pending final spec review
Owner: Iffat Abdul Azeez

## Goal

A recruiter-facing personal site that reads as precise, honest, and hand-made. Success criteria: every link resolves, every claim is verifiable, the design carries one distinctive idea (the ledger) executed with restraint, and a recruiter can go from landing to "this person ships real software" in under a minute.

## What this replaces

The current site is a shadcn-styled template with fabricated placeholder content: two fake featured projects with dead GitHub links and invented metrics, a blog of filler posts, and a `/resume.pdf` link with no file behind it. All of that is removed. No fabricated numbers, links, or claims may ship — content is drafted from the real repos and fact-checked by Iffat before merge.

## Site structure

Four surfaces:

1. **Home** — name, one positioning line, a monospace status line ("now: cs student · seeking internships"), then the indexed project ledger (rows 01–05) as the centerpiece. Contact links in the footer.
2. **Projects** (`/projects`) — the full ledger. Each row: index, name, one-line description, stack tags in mono, year.
3. **Project detail** (`/projects/[slug]`) — a build-log narrative per project: what it is, why it was built, 2–3 real technical decisions, and what would be done differently. MDX-sourced.
4. **About** (`/about`) — short first-person bio, non-code work (hackathons / internships / coursework), toolkit, resume download.

Removed: `/writing` and its posts, `/now` (folded into the home status line), the RSS route. The MDX content pipeline is retained so writing can return later without replumbing.

Featured projects (all real, from Iffat's repos): IT-MATE, Atlas, Ask-My-Docs, Decora, recipe-vault.

## Visual system — "engineer's ledger on warm paper"

- **Background** warm paper (`#F6F1E9` family); **ink** `#1E1913`; hairline rules in warm gray (`#DDD3C4` family); **one accent**: signal blue (`#2545C8` family), used only on interactive elements.
- **Type**: Instrument Sans for headings and body; IBM Plex Mono for all metadata (indexes, dates, stack tags, status line). Loaded via `next/font` with fallbacks.
- **Layout**: ruled hairlines and indexed rows, not card grids. Generous whitespace. No gradients, no shadows, no uppercase-tracked eyebrow labels, no emoji.
- **Light mode only at launch.** The paper tone is the identity; dark mode is a deliberate non-goal for v1.

## Interactivity — polished and restrained

- Ledger rows: on hover/focus the index number turns accent blue, row background warms one step, an arrow slides in. Fully keyboard-navigable with visible focus states.
- Signature moment: a command palette (Ctrl+K / Cmd+K) that jumps to any page or project. Small, fast, no library bloat beyond what's justified.
- One-time scroll reveals via IntersectionObserver, subtle (opacity/short translate).
- All motion respects `prefers-reduced-motion`.
- No page-load animations, no cursor effects, no parallax.

## Content rules

- Write-ups are drafted by mining each project's actual repo (README, code, commit history) and reviewed by Iffat before merge.
- No invented metrics or outcomes. Specific true statements beat impressive vague ones.
- External links (GitHub repos, demos) appear only if verified to resolve publicly.
- Voice: first person, plain, concrete. No "passionate about", no "leveraging".

### Required inputs from Iffat before the content phase completes

- Resume PDF (also the source for hackathon/internship/coursework facts).
- GitHub username and which repos are (or will be made) public.
- Contact links to display: LinkedIn, email.

## Technical approach

- Keep Next.js (App Router) + TypeScript + Tailwind. Rebuild the UI layer: delete the generic shadcn primitives (`ui/button`, `ui/card`, `ui/badge`) and build the small bespoke component set the ledger needs (LedgerRow, MonoLabel, CommandPalette, PageShell, Footer).
- Keep and reuse: MDX pipeline (`src/lib/content`), SEO metadata helper, sitemap/robots.
- Static generation throughout; no client JS beyond the palette and interaction sprinkles.
- OG image styled to match the ledger system.

## Repo restructure (precedes redesign)

The app currently lives at `website/website/` under the repo root with a delegating `package.json`. Fix on branch `chore/flatten-repo`: `git mv` the inner app to the repo root, remove the delegating root `package.json` and the stale root `README.md`/`SETUP.md` (they document the nested layout), keep the inner app README as the repo README. Verified by a passing `npm run build` from the root.

## Workflow

- Branch per phase: `chore/flatten-repo`, then `redesign/ledger` (structure + visual system), with focused conventional commits.
- Execution delegated to Sonnet subagents; design, review, and verification stay with the lead session.
- Verification before merge: production build passes, live preview checked at mobile (375px), tablet (768px), desktop (1280px); interactions checked with keyboard only and with `prefers-reduced-motion` on.
- Nothing merges to `main` without Iffat's review.
