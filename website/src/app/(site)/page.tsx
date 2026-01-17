import Link from 'next/link'
import { Container } from '@/src/components/Container'
import { ProjectCard } from '@/src/components/ProjectCard'
import { PostCard } from '@/src/components/PostCard'
import { Badge } from '@/src/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { buttonClasses } from '@/src/components/ui/button'
import { getFeaturedProjects } from '@/src/lib/content/projects'
import { getLatestPosts } from '@/src/lib/content/posts'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Iffat Abdul Azeez',
  description: 'Computer Science student building data-driven products, energy analytics, and full-stack software.',
})

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 3)
  const latestPosts = getLatestPosts(3)

  return (
    <Container className="py-16 lg:py-20">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Data + Energy + Software
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl font-serif">
            Iffat Abdul Azeez
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Computer Science student building data-driven products, energy analytics, and full-stack
            software with a focus on clarity, performance, and human-centered insights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={buttonClasses({ size: 'lg' })}>
              View projects
            </Link>
            <Link href="/writing" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
              Read writing
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <Card className="bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.2em] text-muted-foreground">
                Current focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  Energy analytics tools for forecasting and optimization.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  Product dashboards that turn data into decisions.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  Thoughtful UX for complex technical workflows.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base uppercase tracking-[0.2em] text-muted-foreground">
                Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
              <Badge variant="outline">Tailwind</Badge>
              <Badge variant="outline">Data Viz</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Selected work
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight font-serif">Featured Projects</h2>
            </div>
            <Link href="/projects" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                date={project.date}
                tags={project.tags}
                slug={project.slug}
              />
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Recent notes
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight font-serif">Latest Writing</h2>
            </div>
            <Link href="/writing" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
