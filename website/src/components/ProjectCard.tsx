import Link from 'next/link'
import { Tag } from './Tag'

interface ProjectCardProps {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
}

export function ProjectCard({ title, description, date, tags, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <article className="p-6 border border-zinc-200 rounded-lg hover:border-zinc-300 transition-colors">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <time className="text-sm text-zinc-500 whitespace-nowrap">{date}</time>
        </div>
        <p className="text-zinc-600 mb-4">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
