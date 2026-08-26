import React from 'react'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './styles.css'
import { UtmTracker } from './UtmTracker'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { UrgencyShortcut } from '@/components/UrgencyShortcut'

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
  description:
    'Atendimento juridico em Direito Previdenciario, BPC/LOAS, Direito do Trabalho, Licitacoes e Contratos.',
  icons: {
    icon: '/marca/icone-32.png',
    apple: '/marca/icone-180.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    description:
      'Orientacao juridica com clareza, atencao e responsabilidade.',
    images: ['/og.png'],
    siteName: 'Deila Pinto Advocacia',
    title: 'Deila Pinto Advocacia e Consultoria',
  },
  title: {
    default: 'Deila Pinto Advocacia e Consultoria',
    template: '%s | Deila Pinto Advocacia',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${montserrat.variable}`}>
        <UtmTracker />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <UrgencyShortcut />
      </body>
    </html>
  )
}
