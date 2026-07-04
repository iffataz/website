import { MonoLabel } from '@/src/components/MonoLabel'
import { createMetadata } from '@/src/lib/seo/metadata'
import { siteConfig } from '@/src/lib/site'

export const metadata = createMetadata({
  title: 'About',
  description: 'Who I am, what I work with, and what I am looking for.',
  path: '/about',
})

// DRAFT — mined from the project repos; Iffat review before merge.
const toolkit = ['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'SQL']

export default function AboutPage() {
  return (
    <div className="max-w-xl pt-14">
      <h1 className="text-3xl font-medium tracking-tight">About</h1>

      {/* DRAFT — Iffat review before merge. Facts limited to what is verifiable
          today; hackathons/internships/coursework are added in the content
          phase from the resume. */}
      <p className="mt-6 leading-relaxed">
        I like building small, complete tools and seeing them through — from
        first commit to something another person can actually use. The projects
        on this site are all real and all mine. I studied computer science at
        Monash University.
      </p>

      <section className="mt-12">
        <h2 className="border-b border-rule pb-2 text-xl font-medium tracking-tight">
          Toolkit
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {toolkit.map((tool) => (
            <MonoLabel key={tool}>{tool}</MonoLabel>
          ))}
        </div>
      </section>

      {siteConfig.resumeAvailable && (
        <section className="mt-12">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            resume (pdf) ↗
          </a>
        </section>
      )}
    </div>
  )
}
