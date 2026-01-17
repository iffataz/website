# Build Notes

## Project Structure
- Uses `src/` directory with Next.js App Router
- Route group `(site)` for organizing pages
- Content-driven with MDX in `src/content/`
- Reusable components in `src/components/`

## Routes Implemented
- `/` - Homepage with featured projects and latest posts
- `/projects` - Projects listing page
- `/projects/[slug]` - Individual project pages
- `/writing` - Writing/blog listing page
- `/writing/[slug]` - Individual blog post pages
- `/about` - About page
- `/now` - Now page

## SEO Features
- Metadata helpers with OpenGraph support
- `sitemap.ts` - Auto-generated sitemap
- `robots.ts` - Robots.txt configuration
- `/api/rss` - RSS feed endpoint

## Content
- 2 placeholder projects with frontmatter
- 2 placeholder blog posts with frontmatter
- MDX rendering with syntax highlighting support

## Next Steps
- Test in development mode: `npm run dev`
- Add `resume.pdf` to `public/` directory
- Verify all routes work correctly
- Customize content with actual projects and writing
