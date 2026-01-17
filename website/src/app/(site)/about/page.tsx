import { Container } from '@/src/components/Container'
import { Card, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { buttonClasses } from '@/src/components/ui/button'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'About',
  description: 'Learn more about Iffat Abdul Azeez, a Computer Science student building data-driven products and full-stack software.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight font-serif sm:text-5xl">Building with data.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          I'm a Computer Science student passionate about building data-driven products, energy analytics,
          and full-stack software. I enjoy translating complex systems into clear, useful experiences.
        </p>

        <div className="mt-10 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Full-stack Developer</CardTitle>
              <CardDescription>
                Building modern web applications with React, Next.js, and TypeScript.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Science Enthusiast</CardTitle>
              <CardDescription>
                Exploring machine learning and analytics to extract insight from complex datasets.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://github.com/iffataz"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: 'outline' })}
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            className={buttonClasses({ variant: 'secondary' })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </Container>
  )
}
