# Ledger Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as the "engineer's ledger on warm paper" system from the approved spec: 4 surfaces (home, /projects, /projects/[slug], /about), indexed ledger rows, command palette, all fake content removed.

**Architecture:** Next.js App Router (v16) + TypeScript + Tailwind v4, fully static. The MDX pipeline (`src/lib/content`) and SEO helper are retained; the shadcn UI layer is replaced by a small bespoke component set (PageShell, Footer, MonoLabel, LedgerRow, CommandPalette, Reveal). Old and new theme tokens coexist during the rebuild so every task ends with a passing build; the old tokens are deleted in the cleanup task.

**Tech Stack:** Next.js 16.1.1, React 19, Tailwind CSS v4 (CSS-based `@theme` config — no tailwind.config file), next-mdx-remote, gray-matter, next/font (Instrument Sans + IBM Plex Mono), next/og for the OG image.

## Global Constraints

- Branch: `redesign/ledger`, created from `chore/flatten-repo`. Conventional commits. Nothing merges to `main` without Iffat's review.
- **No fabricated content may ship.** Any drafted copy (descriptions, bio, toolkit, positioning line) must be derived from the real local repos or known facts, and marked `DRAFT — Iffat review` in a comment. No invented metrics. No external links (GitHub, demo, resume) until verified — `github`/`demo` frontmatter keys stay absent and `resumeAvailable` stays `false` until the content phase.
- Colors (exact): paper `#F6F1E9`, warm row hover `#EFE7DA`, ink `#1E1913`, muted ink `#6F6455`, hairline rule `#DDD3C4`, accent `#2545C8` (interactive elements only).
- Type: Instrument Sans (headings + body), IBM Plex Mono (all metadata: indexes, dates, stack tags, status line), via `next/font` with fallbacks.
- Light mode only. No gradients, no shadows, no uppercase-tracked eyebrow labels, no emoji, no card grids, no page-load animations.
- All motion respects `prefers-reduced-motion`. Everything keyboard-navigable with visible focus states.
- Status line copy (DRAFT — Iffat review): `now: building · open to software engineering roles`. Iffat is a Monash CS graduate — no copy anywhere may use student/new-grad framing ("cs student", "seeking internships", "recent grad"); the degree is an About-page fact, never the headline.
- Featured projects, ledger order 01–05: IT-MATE, Atlas, Ask-My-Docs, Decora, recipe-vault. Slugs: `it-mate`, `atlas`, `ask-my-docs`, `decora`, `recipe-vault`.
- Imports use the existing `@/src/...` alias convention.
- **Tailwind v4 builds fail on unknown utility classes.** Old theme tokens (`background`, `foreground`, `muted-foreground`, `border`, `primary`, …) must remain in `globals.css` until Task 7 deletes their last consumers.

## Verification Model (replaces per-task unit tests)

This project has no unit-test infrastructure and the approved spec defines verification as: **production build passes + live preview checks** (mobile 375px, tablet 768px, desktop 1280px; keyboard-only; `prefers-reduced-motion` on). Adding a test runner was not in the approved spec (YAGNI). So every task's test cycle is:

1. `npm run build` — must exit 0 (this runs the TypeScript check too).
2. A targeted preview check listed in the task (the lead session runs preview via the Claude Preview tools or `npm run dev`).

Do not add a test framework.

## Not In This Plan (content phase — blocked on Iffat's inputs)

| Pending input | Unblocks |
|---|---|
| Resume PDF | `/resume.pdf` file, `resumeAvailable: true`, About non-code section (hackathons/internships/coursework), bio facts |
| GitHub username + which repos are/will be public | `github:` frontmatter links, GitHub contact link |
| LinkedIn + display email | `siteConfig.contacts` entries |
| Iffat's review of drafted copy | Final project write-ups (MDX bodies), positioning line, bio, toolkit list |

---

### Task 1: Ledger theme foundation (tokens, fonts, site config)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/lib/site.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: Tailwind utilities `bg-paper`, `bg-paper-warm`, `text-ink`, `text-ink-muted`, `border-rule`, `text-accent`, `bg-accent`, `font-mono` (IBM Plex Mono), `font-sans` (Instrument Sans); `siteConfig` export `{ name: string; url: string; positioning: string; status: string; contacts: { label: string; href: string }[]; resumeAvailable: boolean }`. All later tasks use these exact names.

- [ ] **Step 1: Create the branch**

```bash
git checkout chore/flatten-repo
git checkout -b redesign/ledger
```

- [ ] **Step 2: Rewrite `src/app/globals.css`**

Replace the entire file with the content below. Note the old shadcn tokens are kept on purpose (Task 7 removes them); the dark-mode block is deleted (light mode is the identity).

```css
@import "tailwindcss";

:root {
  /* Ledger system */
  --paper: #f6f1e9;
  --paper-warm: #efe7da;
  --ink: #1e1913;
  --ink-muted: #6f6455;
  --rule: #ddd3c4;
  --accent: #2545c8;

  /* Legacy tokens — consumed by pages not yet rewritten. Removed in the cleanup task. */
  --background: #f6f1e9;
  --foreground: #1e1913;
  --card: #ffffff;
  --card-foreground: #1e1913;
  --popover: #ffffff;
  --popover-foreground: #1e1913;
  --primary: #2545c8;
  --primary-foreground: #f6f1e9;
  --secondary: #efe7da;
  --secondary-foreground: #1e1913;
  --muted: #efe7da;
  --muted-foreground: #6f6455;
  --accent-legacy: #efe7da;
  --accent-foreground: #1e1913;
  --destructive: #b42318;
  --destructive-foreground: #fef2f2;
  --border: #ddd3c4;
  --input: #ddd3c4;
  --ring: #2545c8;
  --radius: 0.9rem;
}

@theme inline {
  /* Ledger system */
  --color-paper: var(--paper);
  --color-paper-warm: var(--paper-warm);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --font-sans: var(--font-instrument-sans);
  --font-mono: var(--font-plex-mono);

  /* Legacy mappings — removed in the cleanup task. */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius: var(--radius);
}

@layer base {
  * {
    border-color: var(--rule);
  }

  body {
    background-color: var(--paper);
    color: var(--ink);
    font-family: var(--font-instrument-sans), system-ui, sans-serif;
    text-rendering: optimizeLegibility;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  ::selection {
    background: var(--accent);
    color: var(--paper);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Careful: the old `--color-accent` mapped to a beige; the ledger `--color-accent` is signal blue. The legacy beige is renamed `--accent-legacy` and gets **no** `@theme` mapping — check no source file uses the `accent` utility for the old meaning first: `grep -rn "accent" src/ --include=*.tsx`. Old usages (`ui/button.tsx` `hover:bg-accent`, etc.) will now render blue-tinted until Task 7 deletes those files — acceptable transitional state, do not fix.

- [ ] **Step 3: Rewrite `src/app/layout.tsx`**

```tsx
import './globals.css'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

(The radial-gradient background classes are gone — spec bans gradients. Navbar/Footer imports stay for now; Task 3 replaces them.)

- [ ] **Step 4: Create `src/lib/site.ts`**

```ts
export const siteConfig = {
  name: 'Iffat Abdul Azeez',
  url: 'https://iffataz.dev',
  // DRAFT — Iffat review before merge
  positioning: 'I build and ship complete software.',
  status: 'now: building · open to software engineering roles',
  // Filled in the content phase once links are verified to resolve (LinkedIn, email, GitHub).
  contacts: [] as { label: string; href: string }[],
  // Flipped to true once the real resume PDF lands in public/.
  resumeAvailable: false,
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0. (Old pages still render with legacy tokens; fonts and paper background are live.)

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/lib/site.ts
git commit -m "feat(theme): ledger tokens, Instrument Sans + IBM Plex Mono, site config"
```

---

### Task 2: Real project content skeletons

**Files:**
- Delete: `src/content/projects/energy-analytics-platform.mdx`, `src/content/projects/social-media-dashboard.mdx`
- Create: `src/content/projects/it-mate.mdx`, `src/content/projects/atlas.mdx`, `src/content/projects/ask-my-docs.mdx`, `src/content/projects/decora.mdx`, `src/content/projects/recipe-vault.mdx`
- Modify: `src/lib/content/types.ts`, `src/lib/content/projects.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Project` gains `year?: string` and `order?: number`; `getAllProjects()` returns the 5 real projects sorted by `order` ascending. Frontmatter contract for later tasks: `title`, `description`, `date`, `year`, `order`, `stack: string[]`, `featured: true` (legacy field, dropped in Task 7). No `github`/`demo` keys yet.

- [ ] **Step 1: Mine the real repos for honest frontmatter**

The five repos live locally. For each of `C:/Users/iffat/OneDrive/Documents/Projects/IT-MATE`, `.../Atlas`, `.../Ask-My-Docs`, `.../Decora`, `.../recipe-vault`:
- Read its README and manifest (`package.json` / `pyproject.toml`) to draft a one-line description and the stack tag list (3–5 tags, e.g. `React`, `FastAPI`, `SQLite`). Only technologies actually present in the manifest.
- Get the year: `git -C <repo> log --reverse --format=%ad --date=format:%Y | head -1` (first commit year; if work spans years, use the latest active year from `git log -1 --format=%ad --date=format:%Y`).

Every drafted description must be defensible from the repo contents. No metrics, no outcomes, no adjectives like "powerful".

- [ ] **Step 2: Delete the fabricated projects**

```bash
git rm src/content/projects/energy-analytics-platform.mdx src/content/projects/social-media-dashboard.mdx
```

- [ ] **Step 3: Create the five skeleton MDX files**

Template (repeat for all five, with mined values; `order`: it-mate 1, atlas 2, ask-my-docs 3, decora 4, recipe-vault 5):

```mdx
---
# DRAFT frontmatter — description/stack/year mined from the local repo. Iffat review before merge.
title: IT-MATE
description: "<one honest line mined from the repo>"
date: "<year>-01-01"
year: "<year>"
order: 1
stack: [<mined tags>]
featured: true
---

Write-up pending the content phase. Planned structure: what it is, why it was
built, two or three real technical decisions, and what I would do differently.
```

(`date` and `featured` keep the not-yet-rewritten home page and sitemap compiling; Task 7 removes them.)

- [ ] **Step 4: Add `year`/`order` to the content model**

In `src/lib/content/types.ts`, change the `Project` interface to:

```ts
export interface Project {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  role: string
  stack: string[]
  github?: string
  demo?: string
  featured: boolean
  year?: string
  order?: number
  content: string
}
```

In `src/lib/content/projects.ts`, inside **both** object literals (in `getAllProjects` and `getProjectBySlug`), add after the `featured` line:

```ts
      year: data.year ? String(data.year) : '',
      order: data.order ?? 99,
```

And replace the date sort at the bottom of `getAllProjects` with:

```ts
  // Ledger order 01–05
  return allProjectsData.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0; output lists 5 static `/projects/[slug]` pages (`/projects/it-mate` … `/projects/recipe-vault`).

- [ ] **Step 6: Commit**

```bash
git add -A src/content/projects src/lib/content
git commit -m "feat(content): replace fabricated projects with five real project skeletons"
```

---

### Task 3: Shell components — MonoLabel, Footer, PageShell

**Files:**
- Create: `src/components/MonoLabel.tsx`, `src/components/PageShell.tsx`
- Rewrite: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Delete: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `@/src/lib/site` (Task 1).
- Produces: `MonoLabel({ children, className? })` — mono metadata span; `PageShell({ children })` — header + nav + main + Footer, `max-w-3xl` column; `Footer()` — contacts + copyright. Tasks 4–6 render pages as bare content inside PageShell (no Container).

- [ ] **Step 1: Create `src/components/MonoLabel.tsx`**

```tsx
export function MonoLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`font-mono text-xs tracking-wide text-ink-muted ${className}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Rewrite `src/components/Footer.tsx`**

```tsx
import { siteConfig } from '@/src/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-rule py-8 font-mono text-xs text-ink-muted">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex flex-wrap gap-5">
          {siteConfig.contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {contact.label}
            </a>
          ))}
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · ctrl+k to navigate
        </p>
      </div>
    </footer>
  )
}
```

(Contacts render empty until the content phase — no dead `/resume.pdf` or unverified GitHub link, per spec.)

- [ ] **Step 3: Create `src/components/PageShell.tsx`**

```tsx
import Link from 'next/link'
import { Footer } from './Footer'
import { siteConfig } from '@/src/lib/site'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 sm:px-8">
      <header className="flex items-baseline justify-between border-b border-rule py-6">
        <Link href="/" className="font-medium tracking-tight hover:text-accent">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-6 font-mono text-xs">
          <Link href="/projects" className="text-ink-muted hover:text-accent">
            projects
          </Link>
          <Link href="/about" className="text-ink-muted hover:text-accent">
            about
          </Link>
        </nav>
      </header>
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Rewire `src/app/layout.tsx` and delete Navbar**

Replace the imports and body of `RootLayout` (fonts from Task 1 stay unchanged):

```tsx
import './globals.css'
import { PageShell } from '@/src/components/PageShell'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <PageShell>{children}</PageShell>
      </body>
    </html>
  )
}
```

```bash
git rm src/components/Navbar.tsx
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0. Known transitional state: old pages still wrap content in `Container` (double horizontal padding) and `/writing`/`/now` are no longer linked from the header but their routes still exist. Both resolved by Tasks 4–7.

- [ ] **Step 6: Commit**

```bash
git add -A src/components src/app/layout.tsx
git commit -m "feat(shell): PageShell header/footer, MonoLabel; drop Navbar"
```

---

### Task 4: LedgerRow + home page

**Files:**
- Create: `src/components/LedgerRow.tsx`
- Rewrite: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `MonoLabel` (Task 3), `siteConfig` (Task 1), `getAllProjects()` (Task 2 shape).
- Produces: `LedgerRow({ index: number; href: string; name: string; description: string; stack: string[]; year: string })`. Task 5 reuses it verbatim. Rows must sit inside a parent with `border-t border-rule` (each row draws only its bottom rule).

- [ ] **Step 1: Create `src/components/LedgerRow.tsx`**

Pure CSS hover/focus (server component, no client JS — spec: no client JS beyond palette and sprinkles):

```tsx
import Link from 'next/link'
import { MonoLabel } from './MonoLabel'

interface LedgerRowProps {
  index: number
  href: string
  name: string
  description: string
  stack: string[]
  year: string
}

export function LedgerRow({ index, href, name, description, stack, year }: LedgerRowProps) {
  return (
    <Link
      href={href}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-rule px-2 py-5 transition-colors hover:bg-paper-warm focus-visible:bg-paper-warm sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,38%)_3.25rem] sm:gap-x-4"
    >
      <MonoLabel className="transition-colors group-hover:text-accent group-focus-visible:text-accent">
        {String(index).padStart(2, '0')}
      </MonoLabel>
      <span className="min-w-0">
        <span className="font-medium">{name}</span>
        <span
          aria-hidden
          className="ml-2 inline-block -translate-x-1 text-accent opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          →
        </span>
        <span className="mt-1 block text-sm text-ink-muted">{description}</span>
      </span>
      <span className="hidden flex-wrap justify-end gap-x-3 gap-y-1 sm:flex">
        {stack.map((tag) => (
          <MonoLabel key={tag}>{tag}</MonoLabel>
        ))}
      </span>
      <MonoLabel className="justify-self-end">{year}</MonoLabel>
    </Link>
  )
}
```

- [ ] **Step 2: Rewrite `src/app/(site)/page.tsx`**

```tsx
import { LedgerRow } from '@/src/components/LedgerRow'
import { MonoLabel } from '@/src/components/MonoLabel'
import { getAllProjects } from '@/src/lib/content/projects'
import { createMetadata } from '@/src/lib/seo/metadata'
import { siteConfig } from '@/src/lib/site'

export const metadata = createMetadata()

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <div className="pt-14">
      <section>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">{siteConfig.positioning}</p>
        <MonoLabel className="mt-6 block">{siteConfig.status}</MonoLabel>
      </section>

      <section className="mt-16" aria-label="Projects">
        <div className="border-t border-rule">
          {projects.map((project, i) => (
            <LedgerRow
              key={project.slug}
              index={project.order ?? i + 1}
              href={`/projects/${project.slug}`}
              name={project.title}
              description={project.description}
              stack={project.stack}
              year={project.year ?? ''}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Preview check (lead session)**

Home shows name, positioning line, mono status line, ledger rows 01–05. Hover a row: index turns blue, background warms, arrow slides in. Tab through rows: visible focus outline, same treatment. No cards, no gradients.

- [ ] **Step 5: Commit**

```bash
git add src/components/LedgerRow.tsx "src/app/(site)/page.tsx"
git commit -m "feat(home): ledger home page with indexed project rows"
```

---

### Task 5: Projects list + project detail pages

**Files:**
- Rewrite: `src/app/(site)/projects/page.tsx`
- Rewrite: `src/app/(site)/projects/[slug]/page.tsx`
- Rewrite: `src/components/MdxContent.tsx`

**Interfaces:**
- Consumes: `LedgerRow`, `MonoLabel`, `getAllProjects()`, `getProjectBySlug()`, `serializeMdx()`, `MdxContent`, `createMetadata()`.
- Produces: nothing new for later tasks.

- [ ] **Step 1: Rewrite `src/app/(site)/projects/page.tsx`**

```tsx
import { LedgerRow } from '@/src/components/LedgerRow'
import { MonoLabel } from '@/src/components/MonoLabel'
import { getAllProjects } from '@/src/lib/content/projects'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Projects',
  description: 'An indexed ledger of projects: what they are, and how they were built.',
  path: '/projects',
})

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="pt-14">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
        <MonoLabel>{String(projects.length).padStart(2, '0')} entries</MonoLabel>
      </div>
      <div className="mt-10 border-t border-rule">
        {projects.map((project, i) => (
          <LedgerRow
            key={project.slug}
            index={project.order ?? i + 1}
            href={`/projects/${project.slug}`}
            name={project.title}
            description={project.description}
            stack={project.stack}
            year={project.year ?? ''}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `src/app/(site)/projects/[slug]/page.tsx`**

Note `params` is a **Promise** in Next 16 — the old sync signature is replaced.

```tsx
import { notFound } from 'next/navigation'
import { MonoLabel } from '@/src/components/MonoLabel'
import { MdxContent } from '@/src/components/MdxContent'
import { getAllProjects, getProjectBySlug } from '@/src/lib/content/projects'
import { serializeMdx } from '@/src/lib/content/mdx'
import { createMetadata } from '@/src/lib/seo/metadata'

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: 'article',
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const mdxSource = await serializeMdx(project.content)

  return (
    <article className="pt-14">
      <header className="border-b border-rule pb-10">
        <div className="flex items-baseline justify-between">
          <MonoLabel>{String(project.order ?? 0).padStart(2, '0')}</MonoLabel>
          <MonoLabel>{project.year}</MonoLabel>
        </div>
        <h1 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-muted">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
          {project.stack.map((tag) => (
            <MonoLabel key={tag}>{tag}</MonoLabel>
          ))}
        </div>
        {(project.github || project.demo) && (
          <div className="mt-6 flex gap-6 font-mono text-xs">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                github ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                live ↗
              </a>
            )}
          </div>
        )}
      </header>
      <div className="mt-10">
        <MdxContent source={mdxSource} />
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Rewrite `src/components/MdxContent.tsx` with ledger styling**

```tsx
'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
  h2: (props: any) => (
    <h2 className="mt-10 mb-4 border-b border-rule pb-2 text-xl font-medium tracking-tight" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 mb-3 text-lg font-medium tracking-tight" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="mb-4 list-disc space-y-2 pl-5" {...props} />,
  ol: (props: any) => <ol className="mb-4 list-decimal space-y-2 pl-5" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => (
    <a className="text-accent underline underline-offset-4 hover:no-underline" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-paper-warm px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="mb-4 overflow-x-auto border border-rule bg-paper-warm px-5 py-4 font-mono text-sm" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-4 border-l-2 border-rule pl-4 text-ink-muted" {...props} />
  ),
}

export function MdxContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />
}
```

(h1 mapping dropped — page owns the h1; write-ups start at h2. Still `'use client'` per next-mdx-remote's renderer. `src/app/(site)/writing/[slug]/page.tsx` also imports this — it gets the new styles until Task 7 deletes it; that's fine.)

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 5: Preview check (lead session)**

`/projects` shows the full ledger with entry count; each row navigates. `/projects/it-mate` shows index/year rules, title, stack in mono, no GitHub/demo buttons (none defined yet), skeleton body text.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(site)/projects" src/components/MdxContent.tsx
git commit -m "feat(projects): ledger list and build-log detail pages"
```

---

### Task 6: About page

**Files:**
- Rewrite: `src/app/(site)/about/page.tsx`

**Interfaces:**
- Consumes: `MonoLabel`, `siteConfig`, `createMetadata()`.
- Produces: nothing new.

- [ ] **Step 1: Rewrite `src/app/(site)/about/page.tsx`**

```tsx
import { MonoLabel } from '@/src/components/MonoLabel'
import { createMetadata } from '@/src/lib/seo/metadata'
import { siteConfig } from '@/src/lib/site'

export const metadata = createMetadata({
  title: 'About',
  description: 'Who I am, what I work with, and what I am looking for.',
  path: '/about',
})

// DRAFT — mined from the project repos; Iffat review before merge.
const toolkit = ['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'SQL']

export default function AboutPage() {
  return (
    <div className="max-w-xl pt-14">
      <h1 className="text-3xl font-medium tracking-tight">About</h1>

      {/* DRAFT — Iffat review before merge. Facts limited to what is verifiable
          today; hackathons/internships/coursework are added in the content
          phase from the resume. */}
      <p className="mt-6 leading-relaxed">
        I like building small, complete tools and seeing them through — from
        first commit to something another person can actually use. The projects
        on this site are all real and all mine. I studied computer science at
        Monash University.
      </p>

      <section className="mt-12">
        <h2 className="border-b border-rule pb-2 text-xl font-medium tracking-tight">
          Toolkit
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {toolkit.map((tool) => (
            <MonoLabel key={tool}>{tool}</MonoLabel>
          ))}
        </div>
      </section>

      {siteConfig.resumeAvailable && (
        <section className="mt-12">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            resume (pdf) ↗
          </a>
        </section>
      )}
    </div>
  )
}
```

**Executor note:** cross-check the `toolkit` list against the five repos' manifests (same mining as Task 2) — list only technologies that actually appear; adjust the array if the draft above doesn't match reality.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 3: Preview check (lead session)**

`/about` shows bio, toolkit in mono, and **no** resume link (flag is false — no dead links).

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/about/page.tsx"
git commit -m "feat(about): ledger about page with draft bio and toolkit"
```

---

### Task 7: Remove the old system (routes, components, legacy tokens)

**Files:**
- Delete: `src/app/(site)/writing/page.tsx`, `src/app/(site)/writing/[slug]/page.tsx`, `src/app/(site)/now/page.tsx`, `src/app/api/rss/route.ts`, `src/content/writing/getting-started-with-mdx.mdx`, `src/content/writing/server-components-vs-client-components.mdx`, `src/components/ProjectCard.tsx`, `src/components/PostCard.tsx`, `src/components/Tag.tsx`, `src/components/Container.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/lib/utils.ts`
- Create: `src/content/writing/.gitkeep`
- Modify: `src/app/sitemap.ts`, `src/lib/content/types.ts`, `src/lib/content/projects.ts`, `src/app/globals.css`
- Keep untouched: `src/lib/content/posts.ts`, `src/lib/content/mdx.tsx` (writing pipeline retained per spec), `src/app/robots.ts`

**Interfaces:**
- Consumes: everything above already rewritten (Tasks 4–6) so nothing imports the deleted files.
- Produces: final `Project` shape — `{ slug: string; title: string; description: string; year: string; order: number; stack: string[]; github?: string; demo?: string; content: string }`. `getAllProjects()`/`getProjectBySlug()` unchanged in name.

- [ ] **Step 1: Delete routes, filler content, and orphaned components**

```bash
git rm -r "src/app/(site)/writing" "src/app/(site)/now" src/app/api/rss
git rm src/content/writing/getting-started-with-mdx.mdx src/content/writing/server-components-vs-client-components.mdx
git rm src/components/ProjectCard.tsx src/components/PostCard.tsx src/components/Tag.tsx src/components/Container.tsx
git rm -r src/components/ui
git rm src/lib/utils.ts
```

Create empty `src/content/writing/.gitkeep` (file with no content) so `getAllPosts()`'s `readdirSync` keeps a directory to read when writing returns later.

- [ ] **Step 2: Tighten the Project type**

Replace the `Project` interface in `src/lib/content/types.ts` (keep the `Post` interface as is):

```ts
export interface Project {
  slug: string
  title: string
  description: string
  year: string
  order: number
  stack: string[]
  github?: string
  demo?: string
  content: string
}
```

Rewrite `src/lib/content/projects.ts`:

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project } from './types'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

function parseProject(slug: string, fileContents: string): Project {
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title,
    description: data.description,
    year: String(data.year ?? ''),
    order: data.order ?? 99,
    stack: data.stack || [],
    github: data.github,
    demo: data.demo,
    content,
  }
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fileContents = fs.readFileSync(path.join(projectsDirectory, fileName), 'utf8')
      return parseProject(slug, fileContents)
    })
    .sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fileContents = fs.readFileSync(path.join(projectsDirectory, `${slug}.mdx`), 'utf8')
    return parseProject(slug, fileContents)
  } catch {
    return null
  }
}
```

(`getFeaturedProjects` is deleted — nothing uses it after Task 4. Remove `date`/`featured` lines from the five MDX frontmatter blocks, and drop `?? i + 1` / `?? 0` / `?? ''` fallbacks for `order`/`year` in `src/app/(site)/page.tsx`, `src/app/(site)/projects/page.tsx`, and `src/app/(site)/projects/[slug]/page.tsx` — the fields are now required: use `project.order` and `project.year` directly.)

- [ ] **Step 3: Rewrite `src/app/sitemap.ts`**

```ts
import { getAllProjects } from '@/src/lib/content/projects'

export default function sitemap() {
  const baseUrl = 'https://iffataz.dev'

  const projects = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const routes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  return [...routes, ...projects]
}
```

- [ ] **Step 4: Verify nothing still uses legacy tokens, then delete them**

Run: `grep -rn "muted-foreground\|bg-background\|text-foreground\|border-border\|bg-card\|text-primary\|bg-muted\|font-serif\|ring-\|bg-secondary" src/`
Expected: no matches. If any line matches, fix that file first (it was missed by an earlier task).

Then in `src/app/globals.css`: delete every line between the `/* Legacy tokens ... */` comment and the end of the `:root` block's legacy section, and delete every line under `/* Legacy mappings ... */` in `@theme inline` (all `--color-background` … `--color-ring` and `--radius` mappings). The remaining file has only the six ledger tokens, the two font mappings, the base layer, and the reduced-motion block.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0. Route list contains exactly: `/`, `/projects`, 5 × `/projects/[slug]`, `/about`, `/robots.txt`, `/sitemap.xml`, `/_not-found`. No `/writing`, `/now`, or `/api/rss`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove writing/now/rss, shadcn primitives, and legacy theme tokens"
```

---

### Task 8: Command palette + scroll reveals

**Files:**
- Create: `src/components/CommandPalette.tsx`, `src/components/Reveal.tsx`
- Modify: `src/app/layout.tsx`, `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `getAllProjects()` (Task 7 shape), ledger tokens.
- Produces: `CommandPalette({ items: PaletteItem[] })` with `PaletteItem = { label: string; hint: string; href: string }`; `Reveal({ children, className? })` client wrapper.

- [ ] **Step 1: Create `src/components/CommandPalette.tsx`**

No library — small, fast, keyboard-first, per spec:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface PaletteItem {
  label: string
  hint: string
  href: string
}

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((wasOpen) => !wasOpen)
        setQuery('')
        setActive(0)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function select(href: string) {
    setOpen(false)
    router.push(href)
  }

  if (!open) return null

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/20 pt-[20vh]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Jump to page or project"
        className="mx-4 w-full max-w-md border border-rule bg-paper"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((current) => Math.min(current + 1, filtered.length - 1))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((current) => Math.max(current - 1, 0))
            } else if (event.key === 'Enter' && filtered[active]) {
              select(filtered[active].href)
            }
          }}
          placeholder="jump to…"
          className="w-full border-b border-rule bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-ink-muted"
        />
        <ul className="max-h-64 overflow-y-auto py-1">
          {filtered.map((item, index) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => select(item.href)}
                onMouseEnter={() => setActive(index)}
                className={`flex w-full items-baseline justify-between px-4 py-2 text-left text-sm ${
                  index === active ? 'bg-paper-warm text-accent' : ''
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-ink-muted">{item.hint}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-2 font-mono text-xs text-ink-muted">no matches</li>
          )}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/Reveal.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} transition duration-500 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Mount the palette in `src/app/layout.tsx`**

Add imports and build the item list inside `RootLayout` (it's a server component; content reads are build-time):

```tsx
import { CommandPalette } from '@/src/components/CommandPalette'
import { getAllProjects } from '@/src/lib/content/projects'
```

Inside `RootLayout`, before `return`:

```tsx
  const paletteItems = [
    { label: 'home', hint: 'page', href: '/' },
    { label: 'projects', hint: 'page', href: '/projects' },
    { label: 'about', hint: 'page', href: '/about' },
    ...getAllProjects().map((project) => ({
      label: project.title.toLowerCase(),
      hint: String(project.order).padStart(2, '0'),
      href: `/projects/${project.slug}`,
    })),
  ]
```

And render it as a sibling of `PageShell`:

```tsx
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <PageShell>{children}</PageShell>
        <CommandPalette items={paletteItems} />
      </body>
```

- [ ] **Step 4: Add reveals to the home page**

In `src/app/(site)/page.tsx`, import `Reveal` and wrap only the ledger section (the hero renders immediately — spec bans page-load animations, and the hero is above the fold):

```tsx
import { Reveal } from '@/src/components/Reveal'
```

```tsx
      <Reveal>
        <section className="mt-16" aria-label="Projects">
          <div className="border-t border-rule">
            {/* rows unchanged */}
          </div>
        </section>
      </Reveal>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 6: Preview check (lead session)**

Ctrl+K opens the palette; typing filters; ↑/↓ move the active row; Enter navigates; Esc and backdrop click close; Ctrl+K toggles closed. With reduced motion emulated, the ledger section is visible without translate animation.

- [ ] **Step 7: Commit**

```bash
git add src/components/CommandPalette.tsx src/components/Reveal.tsx src/app/layout.tsx "src/app/(site)/page.tsx"
git commit -m "feat(interaction): command palette (ctrl+k) and one-time scroll reveal"
```

---

### Task 9: OG image

**Files:**
- Create: `src/app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1).
- Produces: site-wide OG image auto-wired by Next's file convention.

- [ ] **Step 1: Create `src/app/opengraph-image.tsx`**

Ledger-styled: paper, ink, hairline rules, mono metadata, accent index. (Every div with multiple children needs explicit `display: 'flex'` — Satori requirement.)

```tsx
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/src/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Iffat Abdul Azeez — project ledger'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F6F1E9',
          color: '#1E1913',
          padding: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #DDD3C4',
            paddingBottom: 24,
            fontSize: 24,
          }}
        >
          <span style={{ color: '#2545C8' }}>01</span>
          <span style={{ color: '#6F6455' }}>{siteConfig.status}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, color: '#6F6455', marginTop: 16 }}>
            {siteConfig.positioning}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            borderTop: '2px solid #DDD3C4',
            paddingTop: 24,
            fontSize: 24,
            color: '#6F6455',
          }}
        >
          iffataz.dev
        </div>
      </div>
    ),
    size
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0; route list includes `/opengraph-image`.

- [ ] **Step 3: Preview check (lead session)**

Load `/opengraph-image` in the preview: paper background, rules top and bottom, name large, status line in the top rule.

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat(seo): ledger-styled site OG image"
```

---

## Final verification sweep (lead session, before Iffat's review)

Per the spec's workflow section — run after Task 9:

1. `npm run build` — exit 0, expected route list only.
2. Preview at 375px, 768px, 1280px: home, /projects, one detail page, /about. Ledger grid collapses cleanly at 375 (stack tags hidden, no horizontal scroll).
3. Keyboard only: Tab reaches header nav, every ledger row (visible focus), footer links; Ctrl+K palette fully operable without mouse.
4. `prefers-reduced-motion` emulated: no translate/opacity animation anywhere; everything visible.
5. Every rendered link resolves (no `/writing`, `/now`, `/resume.pdf`, or GitHub links present until verified).
6. Flag all `DRAFT` markers to Iffat for the content-phase review.
