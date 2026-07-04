import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project } from './types'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date ? String(data.date) : '',
        tags: data.tags || [],
        role: data.role,
        stack: data.stack || [],
        github: data.github,
        demo: data.demo,
        featured: data.featured || false,
        year: data.year ? String(data.year) : '',
        order: data.order ?? 99,
        content,
      } as Project
    })

  // Ledger order 01–05
  return allProjectsData.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      role: data.role,
      stack: data.stack || [],
      github: data.github,
      demo: data.demo,
      featured: data.featured || false,
      year: data.year ? String(data.year) : '',
      order: data.order ?? 99,
      content,
    } as Project
  } catch {
    return null
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}
