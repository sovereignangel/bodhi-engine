import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_Tibetan } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerifTibetan = Noto_Serif_Tibetan({
  subsets: ['tibetan'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tibetan',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bodhi Engine | Buddhist Wisdom Platform',
  description: 'An AI-native platform for Indo-Tibetan Buddhist wisdom. Navigate 2,500 years of teachings through the lenses of physics, cognitive science, and AI.',
  keywords: ['Buddhism', 'Lamrim', 'meditation', 'Tibetan Buddhism', 'mindfulness', 'dharma'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${notoSerifTibetan.variable}`}>
      <body className="min-h-screen bg-bodhi-bg-dark font-serif antialiased">
        {children}
      </body>
    </html>
  )
}
