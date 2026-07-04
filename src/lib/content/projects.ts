import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project } from './types'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

function parseProject(slug: string, fileContents: string): Project {
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title,
    description: data.description,
    year: String(data.year ?? ''),
    order: data.order ?? 99,
    stack: data.stack || [],
    github: data.github,
    demo: data.demo,
    content,
  }
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fileContents = fs.readFileSync(path.join(projectsDirectory, fileName), 'utf8')
      return parseProject(slug, fileContents)
    })
    .sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fileContents = fs.readFileSync(path.join(projectsDirectory, `${slug}.mdx`), 'utf8')
    return parseProject(slug, fileContents)
  } catch {
    return null
  }
}
