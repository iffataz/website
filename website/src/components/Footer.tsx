import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-12 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-5 font-medium text-foreground/80">
          <a href="https://github.com/iffataz" className="hover:text-foreground">
            GitHub
          </a>
          <a href="/resume.pdf" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <Link href="/now" className="hover:text-foreground">
            Now
          </Link>
        </div>
        <p>Copyright {new Date().getFullYear()} Iffat Abdul Azeez</p>
      </div>
    </footer>
  )
}
