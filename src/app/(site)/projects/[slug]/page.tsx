import { notFound } from 'next/navigation'
import { MonoLabel } from '@/src/components/MonoLabel'
import { MdxContent } from '@/src/components/MdxContent'
import { getAllProjects, getProjectBySlug } from '@/src/lib/content/projects'
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
        <MdxContent source={project.content} />
      </div>
    </article>
  )
}
