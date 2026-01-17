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
    <Container className="py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-zinc-600">
          A collection of projects showcasing data-driven products, energy analytics, and full-stack software.
        </p>
      </div>

      <div className="space-y-4">
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
