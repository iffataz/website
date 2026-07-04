import { LedgerRow } from '@/src/components/LedgerRow'
import { MonoLabel } from '@/src/components/MonoLabel'
import { Reveal } from '@/src/components/Reveal'
import { getAllProjects } from '@/src/lib/content/projects'
import { createMetadata } from '@/src/lib/seo/metadata'
import { siteConfig } from '@/src/lib/site'

export const metadata = createMetadata()

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <div className="pt-14">
      <section>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">{siteConfig.positioning}</p>
        <MonoLabel className="mt-6 block">{siteConfig.status}</MonoLabel>
      </section>

      <Reveal>
        <section className="mt-16" aria-label="Projects">
          <div className="border-t border-rule">
            {projects.map((project) => (
              <LedgerRow
                key={project.slug}
                index={project.order}
                href={`/projects/${project.slug}`}
                name={project.title}
                description={project.description}
                stack={project.stack}
                year={project.year}
              />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
