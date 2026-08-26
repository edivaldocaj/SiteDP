import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import {
  AreaCards,
  Container,
  CtaSection,
  Eyebrow,
  OutlineButton,
  PageHero,
  ProcessSteps,
  ServiceGrid,
  WhatsAppButton,
} from '@/components/Marketing'
import { institutionalSteps, values } from '@/lib/marketingContent'

export const metadata: Metadata = {
  description: 'Conheça a atuação da Deila Pinto Advocacia e Consultoria.',
  title: 'Sobre',
}

export default function SobrePage() {
  return (
    <div className="site-shell about-page">
      <PageHero
        eyebrow="Sobre"
        image="hero"
        label="sobre-title"
        text="Conheça a trajetória, os valores e o propósito que guiam cada atendimento."
        title="Sobre"
      />

      <section className="section-white">
        <Container className="about-editorial">
          <div className="about-photo">
            <Image
              alt="Dra. Deila Pinto"
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              src="/imagens/deila/deila-perfil.webp"
              unoptimized
            />
          </div>
          <div className="about-copy">
            <Eyebrow>Quem é Deila Pinto</Eyebrow>
            <h2>Advocacia com propósito, escuta e excelência.</h2>
            <p>
              Deila Pinto é advogada inscrita na OAB/RN 22.940, com atuação em
              Direito Previdenciário, BPC/LOAS, Direito do Trabalho, Licitações e
              Contratos.
            </p>
            <p>
              A proposta do atendimento é unir técnica, clareza e cuidado na
              organização das informações, documentos e próximos passos.
            </p>
            <div className="actions">
              <WhatsAppButton />
              <OutlineButton href="/contato">Agendar atendimento</OutlineButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ivory">
        <Container>
          <div className="section-title">
            <Eyebrow>Nossos valores</Eyebrow>
            <h2>Princípios que orientam cada passo</h2>
          </div>
          <ServiceGrid items={values} />
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <Eyebrow>Nossa forma de atuar</Eyebrow>
          <ProcessSteps items={institutionalSteps} title="Um atendimento próximo e estratégico" />
        </Container>
      </section>

      <section className="section-ivory">
        <Container>
          <div className="section-heading">
            <div>
              <Eyebrow>Áreas de atuação</Eyebrow>
              <h2>Atuação especializada com atenção aos detalhes</h2>
            </div>
            <OutlineButton href="/areas-de-atuacao">Ver todas as áreas</OutlineButton>
          </div>
          <AreaCards compact />
        </Container>
      </section>

      <CtaSection title="Vamos conversar sobre o seu caso?" />
    </div>
  )
}
