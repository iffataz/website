import './globals.css'
import { PageShell } from '@/src/components/PageShell'
import { CommandPalette } from '@/src/components/CommandPalette'
import { getAllProjects } from '@/src/lib/content/projects'
import { siteConfig } from '@/src/lib/site'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
}

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const paletteItems = [
    { label: 'home', hint: 'page', href: '/' },
    { label: 'projects', hint: 'page', href: '/projects' },
    { label: 'about', hint: 'page', href: '/about' },
    ...getAllProjects().map((project) => ({
      label: project.title.toLowerCase(),
      hint: String(project.order).padStart(2, '0'),
      href: `/projects/${project.slug}`,
    })),
  ]

  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <PageShell>{children}</PageShell>
        <CommandPalette items={paletteItems} />
      </body>
    </html>
  )
}
