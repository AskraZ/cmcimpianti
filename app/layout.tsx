import type { Metadata } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const sans = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Impianti elettrici, videosorveglianza, giardinaggio e siti web`, template: `%s | ${site.name}` },
  description: 'Impianti elettrici, videosorveglianza, giardinaggio e siti web: un unico referente per progettare, installare e seguire nel tempo.',
  openGraph: { siteName: site.name, locale: 'it_IT', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  )
}
