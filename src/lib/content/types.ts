export interface Project {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  role: string
  stack: string[]
  github?: string
  demo?: string
  featured: boolean
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
