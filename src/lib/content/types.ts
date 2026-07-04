export interface Project {
  slug: string
  title: string
  description: string
  year: string
  order: number
  stack: string[]
  github?: string
  demo?: string
  content: string
}

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  content: string
}
