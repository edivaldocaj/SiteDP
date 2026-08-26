import type { Metadata } from 'next'
import React from 'react'

import { AreaPageTemplate } from '@/components/AreaPageTemplate'
import { BrandIcon } from '@/components/BrandIcons'
import { Container, Eyebrow } from '@/components/Marketing'
import { trabalhoFaq, trabalhoServices } from '@/lib/areaPages'

const situations = [
  'Demissão sem pagamento correto',
  'Não pagamento de horas extras',
  'Desvio ou acúmulo de função',
  'Ambiente de trabalho hostil',
  'Acidente ou doença relacionada ao trabalho',
  'Negativa de direitos ou benefícios',
]

export const metadata: Metadata = {
  description: 'Orientação em rescisão, jornada, verbas trabalhistas, justa causa, assédio e acidentes.',
  title: 'Direito do Trabalho',
}

export default function DireitoDoTrabalhoPage() {
  return (
    <AreaPageTemplate
      afterCards={
        <section className="section-ivory">
          <Container className="work-support">
            <div>
              <Eyebrow>Situações em que podemos ajudar</Eyebrow>
              <div className="situation-list">
                {situations.map((situation) => (
                  <span key={situation}>{situation}</span>
                ))}
              </div>
            </div>
            <div className="document-panel">
              <BrandIcon name="document" />
              <h2>Documentos que podem ser necessários</h2>
              <ul>
                <li>Carteira de trabalho física ou digital</li>
                <li>Contracheques e comprovantes de pagamento</li>
                <li>Contrato de trabalho, se houver</li>
                <li>Comprovantes de jornada e mensagens</li>
              </ul>
            </div>
          </Container>
        </section>
      }
      cards={trabalhoServices}
      ctaTitle="Fale direto comigo no WhatsApp"
      description="Rescisão, jornada, verbas trabalhistas, justa causa, assédio, acidentes e demais direitos do trabalhador."
      faq={trabalhoFaq}
      heroIcon="briefcase"
      title="Direito do Trabalho"
    />
  )
}
