import './globals.css'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'

const sans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans-next',
  weight: ['400', '500', '600', '700'],
})

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-next',
  weight: ['500', '600', '700', '800'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen bg-background text-foreground antialiased bg-[radial-gradient(1200px_600px_at_20%_-10%,#fdebd3_0%,transparent_60%),radial-gradient(1000px_500px_at_95%_0%,#cfe4f7_0%,transparent_55%)]`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
