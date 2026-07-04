import Link from 'next/link'
import { Tag } from './Tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'

interface ProjectCardProps {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
}

export function ProjectCard({ title, description, date, tags, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <Card className="h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary">
              {title}
            </CardTitle>
            <time className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
              {date}
            </time>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        {tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
