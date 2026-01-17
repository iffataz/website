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
    <Container className="py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Writing</h1>
        <p className="text-lg text-zinc-600">
          Articles, tutorials, and thoughts on software development, data science, and web technologies.
        </p>
      </div>

      <div className="space-y-4">
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
