import { Container } from '@/src/components/Container'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Now',
  description: 'What I\'m doing now - a brief update on my current projects, interests, and focus areas.',
  path: '/now',
})

export default function NowPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Now</h1>
        
        <div className="prose prose-zinc max-w-none">
          <p className="text-lg text-zinc-600 mb-6">
            This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">"now page"</a> - 
            a brief snapshot of what I'm currently focused on.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Currently</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-700">
              <li>Building this personal website using Next.js and MDX</li>
              <li>Working on energy analytics projects for optimizing consumption patterns</li>
              <li>Learning more about server-side rendering and React Server Components</li>
            </ul>
          </section>

          <section>
            <p className="text-sm text-zinc-500 italic">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
}
