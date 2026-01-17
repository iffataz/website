import { getAllPosts } from '@/src/lib/content/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = 'https://iffataz.dev'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Iffat Abdul Azeez - Writing</title>
    <link>${baseUrl}</link>
    <description>Articles, tutorials, and thoughts on software development, data science, and web technologies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/writing/${post.slug}</link>
      <guid>${baseUrl}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
