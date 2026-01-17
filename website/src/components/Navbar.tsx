import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="border-b border-zinc-200 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-medium text-zinc-900 hover:text-zinc-600">
          Iffat
        </Link>
        <div className="flex gap-6 text-sm text-zinc-600">
          <Link href="/projects" className="hover:text-zinc-900">
            Projects
          </Link>
          <Link href="/writing" className="hover:text-zinc-900">
            Writing
          </Link>
          <Link href="/about" className="hover:text-zinc-900">
            About
          </Link>
          <Link href="/now" className="hover:text-zinc-900">
            Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
