import type { Metadata } from 'next'
import React from 'react'

import { AreaPageTemplate } from '@/components/AreaPageTemplate'
import { bpcAudience, bpcCards, bpcFaq } from '@/lib/areaPages'

export const metadata: Metadata = {
  description: 'Orientação sobre BPC/LOAS para idosos e pessoas com deficiência.',
  title: 'BPC/LOAS',
}

export default function BpcLoasPage() {
  return (
    <AreaPageTemplate
      audience={bpcAudience}
      cards={bpcCards}
      ctaTitle="Precisa de ajuda para solicitar o BPC/LOAS?"
      description="Benefício de Prestação Continuada para idosos e pessoas com deficiência."
      eyebrow="Direito assistencial"
      faq={bpcFaq}
      heroIcon="bpc"
      title="BPC/LOAS"
    />
  )
}
