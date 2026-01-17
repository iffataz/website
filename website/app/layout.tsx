import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-medium">
              Iffat
            </Link>
            <div className="flex gap-6 text-sm text-zinc-600">
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
