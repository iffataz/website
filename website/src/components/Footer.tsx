import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
          <div className="flex gap-6">
            <a href="https://github.com/iffataz" className="hover:text-zinc-900">
              GitHub
            </a>
            <a href="/resume.pdf" className="hover:text-zinc-900" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
          <p>© {new Date().getFullYear()} Iffat Abdul Azeez</p>
        </div>
      </div>
    </footer>
  )
}
