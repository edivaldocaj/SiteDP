import type { Metadata } from 'next'
import React from 'react'

import { AreaPageTemplate } from '@/components/AreaPageTemplate'
import { previdenciarioFaq, previdenciarioServices } from '@/lib/areaPages'

export const metadata: Metadata = {
  description: 'Orientação em aposentadorias, auxílios, pensões, revisões e benefícios por incapacidade.',
  title: 'Direito Previdenciário',
}

export default function DireitoPrevidenciarioPage() {
  return (
    <AreaPageTemplate
      cards={previdenciarioServices}
      ctaTitle="Precisa de orientação sobre seu benefício previdenciário?"
      description="Aposentadorias, auxílios, pensões, revisões e benefícios por incapacidade."
      faq={previdenciarioFaq}
      heroIcon="protection"
      processTitle="Um atendimento claro e eficiente"
      title="Direito Previdenciário"
    />
  )
}
