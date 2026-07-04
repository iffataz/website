import { Metadata } from 'next'
import { siteConfig } from '@/src/lib/site'

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
    title = siteConfig.name,
    description = siteConfig.positioning,
    path = '',
    type = 'website',
    publishedTime,
    modifiedTime,
    tags = [],
  } = options

  const url = `${siteConfig.url}${path}`
  const siteName = siteConfig.name

  return {
    metadataBase: new URL(siteConfig.url),
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
