import { MonoLabel } from '@/src/components/MonoLabel'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'About',
  description: 'Who I am, what I work with, and what I am looking for.',
  path: '/about',
})

const toolkit = [
  'TypeScript',
  'React / Next.js',
  'Node.js',
  'Python',
  'SQL',
  'AWS',
  'Google Cloud',
]

export default function AboutPage() {
  return (
    <div className="max-w-xl pt-14">
      <h1 className="text-3xl font-medium tracking-tight">About</h1>

      <p className="mt-6 leading-relaxed">
        I&apos;m a full stack developer. I build complete tools and see them
        through, from first commit to something another person can actually
        use. I work across React, Next.js, Node.js, and Python, with AWS and
        Google Cloud, and I like the data side of software as much as the
        interface: retrieval pipelines, vector search, and the SQL in between.
        I studied computer science at Monash University. The projects on this
        site are all real and all mine.
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
    </div>
  )
}
