import React from 'react'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './styles.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  description: 'Site institucional em preparacao.',
  icons: {
    icon: '/marca/icone-32.png',
    apple: '/marca/icone-180.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    description: 'Site institucional em preparacao.',
    images: ['/og.png'],
    title: 'Site institucional',
  },
  title: 'Site institucional',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${montserrat.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
