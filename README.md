# Personal Website

A fast, SEO-first personal website built with Next.js App Router, TypeScript, and MDX.

## Features

- ✅ Next.js 16 with App Router
- ✅ TypeScript
- ✅ MDX content system
- ✅ SEO optimized (metadata, sitemap, robots.txt, RSS feed)
- ✅ Server Components by default
- ✅ Tailwind CSS for styling
- ✅ Clean, minimal design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the website directory:
```bash
cd website
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (site)/       # Route group for main pages
│   │   │   ├── page.tsx  # Homepage
│   │   │   ├── projects/ # Projects pages
│   │   │   ├── writing/  # Blog posts
│   │   │   ├── about/    # About page
│   │   │   └── now/      # Now page
│   │   ├── api/          # API routes (RSS feed)
│   │   ├── layout.tsx    # Root layout
│   │   ├── sitemap.ts    # Sitemap generator
│   │   └── robots.ts     # Robots.txt
│   ├── components/       # Reusable React components
│   ├── content/         # MDX content files
│   │   ├── projects/     # Project case studies
│   │   └── writing/      # Blog posts
│   └── lib/              # Utility functions
│       ├── content/      # Content loaders
│       └── seo/          # SEO helpers
└── public/               # Static assets
```

## Adding Content

### Projects

Create a new `.mdx` file in `src/content/projects/` with frontmatter:

```mdx
---
title: Project Name
description: Short description
date: 2024-01-15
tags: [Tag1, Tag2]
role: Your Role
stack: [Tech1, Tech2]
github: https://github.com/...
demo: https://demo-url.com
featured: true
---

Your project content here...
```

### Blog Posts

Create a new `.mdx` file in `src/content/writing/` with frontmatter:

```mdx
---
title: Post Title
description: Post description
date: 2024-01-15
tags: [Tag1, Tag2]
published: true
---

Your blog post content here...
```

## Routes

- `/` - Homepage with featured projects and latest posts
- `/projects` - All projects
- `/projects/[slug]` - Individual project pages
- `/writing` - All blog posts
- `/writing/[slug]` - Individual blog post pages
- `/about` - About page
- `/now` - Now page
- `/api/rss` - RSS feed
- `/sitemap.xml` - Sitemap
- `/robots.txt` - Robots.txt

## License

Private project
