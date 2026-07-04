import Link from 'next/link'
import { Footer } from './Footer'
import { siteConfig } from '@/src/lib/site'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 sm:px-8">
      <header className="flex items-baseline justify-between border-b border-rule py-6">
        <Link href="/" className="font-medium tracking-tight hover:text-accent">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-6 font-mono text-xs">
          <Link href="/projects" className="text-ink-muted hover:text-accent">
            projects
          </Link>
          <Link href="/about" className="text-ink-muted hover:text-accent">
            about
          </Link>
        </nav>
      </header>
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
    </div>
  )
}
