import { Container } from '@/src/components/Container'
import { ProjectCard } from '@/src/components/ProjectCard'
import { PostCard } from '@/src/components/PostCard'
import { getFeaturedProjects } from '@/src/lib/content/projects'
import { getLatestPosts } from '@/src/lib/content/posts'
import { createMetadata } from '@/src/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Iffat Abdul Azeez',
  description: 'Computer Science student building data-driven products, energy analytics, and full-stack software.',
})

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 3)
  const latestPosts = getLatestPosts(3)

  return (
    <Container className="py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Iffat Abdul Azeez
        </h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          Computer Science student building data-driven products, energy analytics,
          and full-stack software.
        </p>
      </div>

      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                date={project.date}
                tags={project.tags}
                slug={project.slug}
              />
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Latest Writing</h2>
          <div className="space-y-4">
            {latestPosts.map((post) => (
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
        </section>
      )}
    </Container>
  )
}
