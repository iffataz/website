# Personal Website (Next.js) — Build Spec

## Goal
Build a fast, SEO-first personal website using Next.js App Router. The site is content-driven (MDX) and showcases Projects (case studies) and Writing (blog). Minimal JS, clean UI, scalable structure.

## Non-negotiables
- Next.js App Router + TypeScript
- Content-driven pages using MDX in /src/content
- Server Components by default; use client components only when necessary
- Excellent SEO: metadata, OpenGraph, sitemap, robots, RSS
- Clean, minimal design with Tailwind

## Routes
- `/` Home: hero + featured projects + latest writing
- `/projects` list from content/projects
- `/projects/[slug]` MDX case study page
- `/writing` list from content/writing
- `/writing/[slug]` MDX blog post page
- `/about` about + experience + links
- `/resume` link to /public/resume.pdf
- `/now` optional “what I’m doing now”

## Folder structure
Use this structure:
- `src/app/(site)` for pages and layout
- `src/components` for reusable UI and sections
- `src/content/projects` and `src/content/writing` for MDX
- `src/lib/content` for content loaders and MDX utilities
- `src/lib/seo` for metadata helpers
- `public/resume.pdf` for downloadable resume

## Content contracts
Each MDX file must have frontmatter fields.
Projects:
- title, description, date, tags, role, stack, github, demo, featured
Writing:
- title, description, date, tags, published

## Rendering approach
- Load MDX content at build time
- Provide `getAllProjects()`, `getProjectBySlug()`, `getAllPosts()`, `getPostBySlug()`
- Use `generateStaticParams()` for `[slug]` routes

## UI requirements
- Reusable components: ProjectCard, PostCard, Tag/Badge, Callout, CodeBlock
- Minimal but premium layout: Container, Navbar, Footer
- Typography-first design, accessible contrast

## SEO requirements
- Metadata per page
- OpenGraph images (default is OK)
- sitemap.ts and robots.ts
- RSS feed at /api/rss

## Deliverables
- Implement the architecture above
- Provide placeholder content with 2 projects and 2 posts
- Ensure clean code, no unused dependencies, and consistent formatting
