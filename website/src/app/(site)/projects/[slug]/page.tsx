import { notFound } from 'next/navigation'
import { Container } from '@/src/components/Container'
import { Tag } from '@/src/components/Tag'
import { getProjectBySlug, getAllProjects } from '@/src/lib/content/projects'
import { serializeMdx, MdxContent } from '@/src/lib/content/mdx'
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
    <Container className="py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
          <p className="text-xl text-zinc-600 mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-4">
            <div>
              <span className="font-medium">Date:</span> {project.date}
            </div>
            {project.role && (
              <div>
                <span className="font-medium">Role:</span> {project.role}
              </div>
            )}
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className="mb-6">
              <span className="font-medium text-sm text-zinc-700">Stack: </span>
              <span className="text-sm text-zinc-600">{project.stack.join(', ')}</span>
            </div>
          )}

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
              >
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-zinc-900 text-white text-sm hover:bg-zinc-800"
              >
                Live Demo
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-zinc max-w-none">
          <MdxContent source={mdxSource} />
        </div>
      </article>
    </Container>
  )
}
