import { notFound } from 'next/navigation'
import { Container } from '@/src/components/Container'
import { Tag } from '@/src/components/Tag'
import { getPostBySlug, getAllPosts } from '@/src/lib/content/posts'
import { MdxContent } from '@/src/components/MdxContent'
import { createMetadata } from '@/src/lib/seo/metadata'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Container className="py-16">
      <article>
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Writing</p>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight font-serif sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <time>{post.date}</time>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </header>

        <div className="mt-10">
          <MdxContent source={post.content} />
        </div>
      </article>
    </Container>
  )
}
