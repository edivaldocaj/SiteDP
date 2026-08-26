import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import {
  AreaCards,
  Container,
  CtaSection,
  Eyebrow,
  ProcessSteps,
  WhatsAppButton,
} from '@/components/Marketing'
import { BrandIcon } from '@/components/BrandIcons'
import { homeSteps } from '@/lib/marketingContent'

export const metadata: Metadata = {
  description:
    'Áreas de atuação da Deila Pinto Advocacia e Consultoria: Previdenciário, BPC/LOAS, Trabalho, Licitações e Contratos.',
  title: 'Áreas de Atuação',
}

export default function AreasPage() {
  return (
    <div className="site-shell areas-page">
      <section className="areas-hero" aria-labelledby="areas-title">
        <Container className="areas-hero-inner">
          <div>
            <Eyebrow>Atendimento humanizado e especializado</Eyebrow>
            <h1 id="areas-title">Áreas de atuação</h1>
            <p>
              Atuação jurídica com clareza, atenção e responsabilidade para proteger
              seus direitos e trazer tranquilidade.
            </p>
          </div>
          <div className="areas-hero-art" aria-hidden="true">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/imagens/hero-consultoria-dp.webp"
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <AreaCards />
        </Container>
      </section>

      <section className="section-ivory">
        <Container className="about-editorial">
          <div className="about-photo">
            <Image
              alt="Dra. Deila Pinto"
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              src="/imagens/deila/deila-hero.webp"
              unoptimized
            />
          </div>
          <div className="about-copy">
            <Eyebrow>Atuação que faz a diferença</Eyebrow>
            <h2>Assessoria jurídica feita para entender você e o seu caso</h2>
            <p>
              Cada pessoa tem uma história e cada caso exige atenção aos detalhes.
              Por isso, a conversa inicial organiza informações e documentos antes
              de qualquer providência.
            </p>
            <div className="feature-row">
              <span><BrandIcon name="search" />Escuta e análise</span>
              <span><BrandIcon name="document" />Clareza em cada etapa</span>
              <span><BrandIcon name="checklist" />Acompanhamento</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <Eyebrow>Como funciona</Eyebrow>
          <ProcessSteps items={homeSteps} title="Um atendimento em 3 passos" />
          <div className="center-action">
            <WhatsAppButton />
          </div>
        </Container>
      </section>

      <CtaSection title="Dê o primeiro passo para proteger seus direitos." />
    </div>
  )
}
