import { Container } from '@/src/components/Container'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'About',
  description: 'Learn more about Iffat Abdul Azeez, a Computer Science student building data-driven products and full-stack software.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-6">About</h1>
        
        <div className="prose prose-zinc max-w-none">
          <p className="text-lg text-zinc-600 mb-6">
            I'm a Computer Science student passionate about building data-driven products, 
            energy analytics, and full-stack software. I enjoy working on projects that 
            solve real-world problems and create meaningful impact.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Full-stack Developer</h3>
                <p className="text-zinc-600">Building modern web applications with React, Next.js, and TypeScript.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Data Science Enthusiast</h3>
                <p className="text-zinc-600">Exploring machine learning and data analytics to extract insights from complex datasets.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <div className="flex flex-col gap-3">
              <a 
                href="https://github.com/iffataz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GitHub
              </a>
              <a 
                href="/resume" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Resume
              </a>
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}
