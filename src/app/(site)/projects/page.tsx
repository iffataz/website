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
