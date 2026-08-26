import type { Metadata } from 'next'
import React from 'react'

import { AreaPageTemplate } from '@/components/AreaPageTemplate'
import { licitacoesFaq, licitacoesServices, licitacoesShortServices } from '@/lib/areaPages'

export const metadata: Metadata = {
  description:
    'Assessoria jurídica em licitações, editais, recursos, impugnações, habilitação e contratos administrativos.',
  title: 'Licitações e Contratos',
}

export default function LicitacoesContratosPage() {
  return (
    <AreaPageTemplate
      accentTitle="Contratos"
      cards={licitacoesServices}
      ctaTitle="Precisa de orientação em uma licitação ou contrato administrativo?"
      description="Assessoria jurídica em todas as fases das contratações públicas, com análise de editais, recursos, impugnações, habilitação, contratos administrativos e apoio documental."
      eyebrow="Áreas de atuação"
      faq={licitacoesFaq}
      heroIcon="contract"
      processTitle="Etapas da assessoria"
      services={licitacoesShortServices}
      title="Licitações e Contratos"
    />
  )
}
