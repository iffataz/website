import { Container } from '@/src/components/Container'
import { Card, CardContent } from '@/src/components/ui/card'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Now',
  description: "What I'm doing now - a brief update on my current projects, interests, and focus areas.",
  path: '/now',
})

export default function NowPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Now</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight font-serif sm:text-5xl">
          The current chapter.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          This is a{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            now page
          </a>
          , a brief snapshot of what I'm currently focused on.
        </p>

        <Card className="mt-10">
          <CardContent className="space-y-4 py-6 text-muted-foreground">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Currently
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Building this personal website using Next.js and MDX.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Working on energy analytics projects for optimizing consumption patterns.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                Learning more about server-side rendering and React Server Components.
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-6 text-sm italic text-muted-foreground">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </Container>
  )
}
