import { Container } from '@/src/components/Container'
import { PostCard } from '@/src/components/PostCard'
import { getAllPosts } from '@/src/lib/content/posts'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Writing',
  description: 'Articles, tutorials, and thoughts on software development, data science, and web technologies.',
  path: '/writing',
})

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <Container className="py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Writing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight font-serif sm:text-5xl">
          Notes on building.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Articles, tutorials, and thoughts on software development, data science, and web technologies.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
          />
        ))}
      </div>
    </Container>
  )
}
