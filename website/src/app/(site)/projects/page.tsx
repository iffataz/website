import { Container } from '@/src/components/Container'
import { ProjectCard } from '@/src/components/ProjectCard'
import { getAllProjects } from '@/src/lib/content/projects'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Projects',
  description: 'A collection of projects showcasing data-driven products, energy analytics, and full-stack software.',
  path: '/projects',
})

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <Container className="py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight font-serif sm:text-5xl">
          Data-driven product work.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          A collection of projects showcasing data-driven products, energy analytics, and full-stack software.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
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
    </Container>
  )
}
