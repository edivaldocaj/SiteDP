import React from 'react'

import type { DetailCard, Faq } from '@/lib/areaPages'
import { homeSteps, institutionalSteps } from '@/lib/marketingContent'

import { BrandIcon, type BrandIconName } from './BrandIcons'
import { FaqAccordion } from './FaqAccordion'
import {
  Breadcrumb,
  Container,
  CtaSection,
  Eyebrow,
  ProcessSteps,
  ServiceGrid,
  WhatsAppButton,
} from './Marketing'

type AreaPageTemplateProps = {
  accentTitle?: string
  afterCards?: React.ReactNode
  audience?: DetailCard[]
  cards: DetailCard[]
  ctaTitle: string
  description: string
  eyebrow?: string
  faq: Faq[]
  heroIcon: BrandIconName
  processTitle?: string
  services?: DetailCard[]
  title: string
}

export function AreaPageTemplate({
  accentTitle,
  afterCards,
  audience,
  cards,
  ctaTitle,
  description,
  eyebrow = 'Áreas de atuação',
  faq,
  heroIcon,
  processTitle = 'Como funciona o atendimento',
  services,
  title,
}: AreaPageTemplateProps) {
  const processItems = title.includes('Licitações') ? institutionalSteps : homeSteps

  return (
    <div className="site-shell area-detail-page">
      <section className="area-detail-hero">
        <Container className="area-detail-hero-inner">
          <div className="area-detail-copy">
            <Breadcrumb current={title} />
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>
              {accentTitle ? (
                <>
                  {title.replace(accentTitle, '').trim()} <span>{accentTitle}</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p>{description}</p>
            <div className="actions">
              <WhatsAppButton />
              <span className="hero-note">Atendimento humanizado e sigiloso</span>
            </div>
          </div>
          <div className="area-hero-icon" aria-hidden="true">
            <BrandIcon name={heroIcon} />
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <div className="section-title">
            <Eyebrow>{title.includes('Licitações') ? 'Nossa atuação' : 'Como podemos ajudar'}</Eyebrow>
            <h2>
              {title.includes('Licitações')
                ? 'Como podemos assessorar'
                : title.includes('Previdenciário')
                  ? 'Soluções para cada momento da sua vida'
                  : 'Como posso te ajudar'}
            </h2>
          </div>
          <ServiceGrid items={cards} />
        </Container>
      </section>

      {afterCards}

      {audience?.length ? (
        <section className="section-ivory">
          <Container>
            <div className="section-title">
              <h2>Quem pode ter direito?</h2>
            </div>
            <ServiceGrid items={audience} />
          </Container>
        </section>
      ) : null}

      <section className="section-white">
        <Container>
          <Eyebrow>{title.includes('Licitações') ? 'Etapas da assessoria' : 'Como funciona'}</Eyebrow>
          <ProcessSteps items={processItems} title={processTitle} />
        </Container>
      </section>

      {services?.length ? (
        <section className="section-ivory">
          <Container>
            <div className="section-title">
              <Eyebrow>O que fazemos</Eyebrow>
              <h2>Serviços mais procurados</h2>
            </div>
            <ServiceGrid items={services} />
          </Container>
        </section>
      ) : null}

      <section className="faq-section">
        <Container className="faq-inner">
          <div>
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2>Perguntas comuns</h2>
          </div>
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <CtaSection eyebrow="Fale comigo" title={ctaTitle} />
    </div>
  )
}
