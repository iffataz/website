import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-foreground hover:text-primary"
        >
          Iffat
        </Link>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/writing" className="hover:text-foreground">
            Writing
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/now" className="hover:text-foreground">
            Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
