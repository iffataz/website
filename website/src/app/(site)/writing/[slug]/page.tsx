import { notFound } from 'next/navigation'
import { Container } from '@/src/components/Container'
import { Tag } from '@/src/components/Tag'
import { getPostBySlug, getAllPosts } from '@/src/lib/content/posts'
import { serializeMdx } from '@/src/lib/content/mdx'
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

  const mdxSource = await serializeMdx(post.content)

  return (
    <Container className="py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <p className="text-xl text-zinc-600 mb-6">{post.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-4">
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

        <div className="prose prose-zinc max-w-none">
          <MdxContent source={mdxSource} />
        </div>
      </article>
    </Container>
  )
}
