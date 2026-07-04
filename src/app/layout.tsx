import './globals.css'
import { Navbar } from '@/src/components/Navbar'
import { Footer } from '@/src/components/Footer'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'

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
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
