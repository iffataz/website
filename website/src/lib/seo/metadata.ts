import { Metadata } from 'next'

interface MetadataOptions {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function createMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title = 'Iffat Abdul Azeez',
    description = 'Computer Science student building data-driven products, energy analytics, and full-stack software.',
    path = '',
    type = 'website',
    publishedTime,
    modifiedTime,
    tags = [],
  } = options

  const url = `https://iffataz.dev${path}`
  const siteName = 'Iffat Abdul Azeez'

  return {
    title: title === siteName ? title : `${title} | ${siteName}`,
    description,
    openGraph: {
      title: title === siteName ? title : `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type,
      publishedTime,
      modifiedTime,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: title === siteName ? title : `${title} | ${siteName}`,
      description,
    },
  }
}
