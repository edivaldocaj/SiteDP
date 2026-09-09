import React from 'react'

import type { DetailCard, Faq } from '@/lib/areaPages'

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
  processItems: Array<{ description: string; title: string }>
  heroNote?: string
  servicesEyebrow: string
  servicesTitle: string
  audienceTitle?: string
  processEyebrow: string
  extrasEyebrow?: string
  extrasTitle?: string
  faqEyebrow: string
  faqTitle: string
  ctaEyebrow: string
  ctaText?: string
  ctaButton?: string
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
  processItems,
  heroNote,
  servicesEyebrow,
  servicesTitle,
  audienceTitle,
  processEyebrow,
  extrasEyebrow,
  extrasTitle,
  faqEyebrow,
  faqTitle,
  ctaEyebrow,
  ctaText,
  ctaButton,
}: AreaPageTemplateProps) {

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
              <WhatsAppButton>{ctaButton}</WhatsAppButton>
              {heroNote ? <span className="hero-note">{heroNote}</span> : null}
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
            <Eyebrow>{servicesEyebrow}</Eyebrow>
            <h2>{servicesTitle}</h2>
          </div>
          <ServiceGrid items={cards} />
        </Container>
      </section>

      {afterCards}

      {audience?.length ? (
        <section className="section-ivory">
          <Container>
            <div className="section-title">
              <h2>{audienceTitle}</h2>
            </div>
            <ServiceGrid items={audience} />
          </Container>
        </section>
      ) : null}

      <section className="section-white">
        <Container>
          <Eyebrow>{processEyebrow}</Eyebrow>
          <ProcessSteps items={processItems} title={processTitle} />
        </Container>
      </section>

      {services?.length ? (
        <section className="section-ivory">
          <Container>
            <div className="section-title">
              <Eyebrow>{extrasEyebrow}</Eyebrow>
              <h2>{extrasTitle}</h2>
            </div>
            <ServiceGrid items={services} />
          </Container>
        </section>
      ) : null}

      <section className="faq-section">
        <Container className="faq-inner">
          <div>
            <Eyebrow>{faqEyebrow}</Eyebrow>
            <h2>{faqTitle}</h2>
          </div>
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <CtaSection buttonLabel={ctaButton} eyebrow={ctaEyebrow} text={ctaText} title={ctaTitle} />
    </div>
  )
}
