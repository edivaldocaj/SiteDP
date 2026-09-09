import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import { BrandIcon } from '@/components/BrandIcons'
import { ContactForm } from '@/components/ContactForm'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FraudWarning } from '@/components/FraudWarning'
import { Container, Eyebrow, WhatsAppButton } from '@/components/Marketing'
import { getPublicSiteConfig, getPublicText, type PublicSiteConfig } from '@/lib/siteConfig'
import { getSiteContent, listValues, mediaURL } from '@/lib/siteContent'

export const dynamic = 'force-dynamic'

const fallbackAreas = ['Previdenciario', 'Assistencial', 'Trabalhista', 'Licitacoes e Contratos']

export const metadata: Metadata = {
  description: 'Canais de contato da Deila Pinto Advocacia e Consultoria.',
  title: 'Contato | Deila Pinto Advocacia',
}

function formatAddress(address: NonNullable<PublicSiteConfig['endereco']>[number]) {
  const street = getPublicText(address.logradouro)
  const district = getPublicText(address.bairro)
  const city = getPublicText(address.cidade)
  const uf = getPublicText(address.uf)
  const cep = getPublicText(address.cep)
  const cityLine = [city, uf].filter(Boolean).join('/')

  return [street, district, cityLine, cep ? `CEP ${cep}` : null].filter(Boolean).join(' · ')
}

export default async function ContactPage() {
  const config = await getPublicSiteConfig()
  const content = await getSiteContent(); const page = content?.contato || {}
  const primaryEmail = getPublicText(config?.emails?.[0]?.email)
  const primaryAddress = config?.endereco?.find((address) => getPublicText(formatAddress(address)))
  const addressText = primaryAddress ? formatAddress(primaryAddress) : null
  const horario = getPublicText(config?.horarioAtendimento)
  const configuredAreas =
    config?.areasDeAtuacao
      ?.map((area) => getPublicText(area.nome))
      .filter((area): area is string => Boolean(area)) || []
  const areas = configuredAreas.length ? configuredAreas : fallbackAreas

  return (
    <div className="site-shell contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <Container className="contact-hero-inner">
          <div className="contact-hero-copy">
            <Eyebrow>{page.heroChapeu}</Eyebrow>
            <h1 id="contact-title">{page.heroTitulo}</h1>
            <p>{page.heroTexto}</p>
            <div className="actions">
              <WhatsAppButton href="/ir/whatsapp?o=contato">{content?.compartilhados?.whatsappBotao}</WhatsAppButton>
              <span className="hero-note">{page.heroNota}</span>
            </div>
          </div>
          <div className="contact-hero-photo" aria-hidden="true">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={mediaURL(page.heroImagem) || ''}
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container className="contact-main-grid">
          <ContactForm
            consentimentoTexto={getPublicText(config?.textoConsentimento)}
            consentimentoVersao={getPublicText(config?.consentimentoVersao)}
          />

          <aside className="contact-methods">
            <h2>{page.metodosTitulo}</h2>
            <a className="contact-method-row" href="/ir/whatsapp?o=contato">
              <BrandIcon name="phone" />
              <span>
                <strong>{page.whatsappTitulo}</strong>
                <small>{page.whatsappAcao}</small>
              </span>
              <b aria-hidden="true">→</b>
            </a>
            {primaryEmail ? (
              <a className="contact-method-row" href={`mailto:${primaryEmail}`}>
                <BrandIcon name="email" />
                <span>
                  <strong>{page.emailTitulo}</strong>
                  <small>{primaryEmail}</small>
                </span>
              </a>
            ) : null}
            <div className="contact-method-row">
              <BrandIcon name="location" />
              <span>
                <strong>{page.localizacaoTitulo}</strong>
                <small>{addressText || page.localizacaoFallback}</small>
              </span>
            </div>
            <div className="contact-method-row">
              <BrandIcon name="clock" />
              <span>
                <strong>{page.horarioTitulo}</strong>
                <small>{horario || page.horarioFallback}</small>
              </span>
            </div>
          </aside>
        </Container>
      </section>

      {areas.length ? (
        <section className="section-ivory" aria-labelledby="contact-areas-title">
          <Container>
            <div className="section-heading">
              <div>
                <Eyebrow>{page.areasChapeu}</Eyebrow>
                <h2 id="contact-areas-title">{page.areasTitulo}</h2>
              </div>
            </div>
            <div className="contact-area-list">
              {areas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section-white">
        <Container className="faq-inner">
          <div>
            <Eyebrow>{page.faqChapeu}</Eyebrow>
            <h2>{page.faqTitulo}</h2>
          </div>
          <FaqAccordion
            items={listValues<any>(page.faq).map((item) => ({ answer: item.resposta, question: item.pergunta }))}
          />
        </Container>
      </section>

      <section className="contact-security" aria-label="Aviso de segurança">
        <Container className="split">
          <div>
            <Eyebrow>{page.segurancaChapeu}</Eyebrow>
            <h2>{page.segurancaTitulo}</h2>
          </div>
          <FraudWarning />
        </Container>
      </section>
    </div>
  )
}
