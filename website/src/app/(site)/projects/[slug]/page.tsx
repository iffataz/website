import { notFound } from 'next/navigation'
import { Container } from '@/src/components/Container'
import { Tag } from '@/src/components/Tag'
import { buttonClasses } from '@/src/components/ui/button'
import { getProjectBySlug, getAllProjects } from '@/src/lib/content/projects'
import { serializeMdx } from '@/src/lib/content/mdx'
import { MdxContent } from '@/src/components/MdxContent'
import { createMetadata } from '@/src/lib/seo/metadata'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: 'article',
    publishedTime: project.date,
    tags: project.tags,
  })
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const mdxSource = await serializeMdx(project.content)

  return (
    <Container className="py-16">
      <article>
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Project</p>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight font-serif sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground/80">Date:</span> {project.date}
            </div>
            {project.role && (
              <div>
                <span className="font-semibold text-foreground/80">Role:</span> {project.role}
              </div>
            )}
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">Stack:</span> {project.stack.join(', ')}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: 'outline' })}
              >
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: 'default' })}
              >
                Live Demo
              </a>
            )}
          </div>
        </header>

        <div className="mt-10">
          <MdxContent source={mdxSource} />
        </div>
      </article>
    </Container>
  )
}
