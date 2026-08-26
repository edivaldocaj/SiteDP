import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  AreaCards,
  Container,
  CtaSection,
  Eyebrow,
  OutlineButton,
  ProcessSteps,
  SectionHeading,
  WhatsAppButton,
} from '@/components/Marketing'
import { BrandIcon } from '@/components/BrandIcons'
import { getPublishedLandingCampaigns, type PublicCampaign } from '@/lib/campaigns'
import { areaSummaries, homeSteps } from '@/lib/marketingContent'
import { getPublicText } from '@/lib/siteConfig'

import './styles.css'

export const dynamic = 'force-dynamic'

function campaignArea(campaign: PublicCampaign) {
  if (campaign.campaignCode === 'PREV-BPC') return 'Assistencial'
  if (campaign.campaignCode.startsWith('TRAB-')) return 'Trabalhista'
  return 'Previdenciario'
}

export default async function HomePage() {
  const campaigns = await getPublishedLandingCampaigns()
  const featuredCampaigns = campaigns.slice(0, 6)

  return (
    <div className="site-shell">
      <section className="home-hero" aria-labelledby="titulo-home">
        <Container className="home-hero-inner">
          <div className="home-hero-copy">
            <Eyebrow>Advocacia com propósito</Eyebrow>
            <h1 id="titulo-home">
              <span className="hero-title-line">Orientação jurídica</span>
              <span className="hero-title-line">
                com <em>clareza, atenção</em>
              </span>
              <span className="hero-title-line">e responsabilidade</span>
            </h1>
            <p>
              Atendimento em Direito Previdenciário, BPC/LOAS, Direito do Trabalho,
              Licitações e Contratos para organizar informações, orientar decisões e
              oferecer atendimento jurídico próximo e responsável.
            </p>
            <div className="actions">
              <WhatsAppButton />
              <span className="hero-note">Atendimento humanizado e sigiloso</span>
            </div>
          </div>
          <div className="home-hero-portrait" aria-hidden="true">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 96vw, 48vw"
              src="/imagens/deila/deila-perfil.webp"
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section className="home-areas" id="areas" aria-labelledby="areas-title">
        <Container>
          <SectionHeading eyebrow="Áreas de atuação" title="Como posso te ajudar" />
          <AreaCards />
        </Container>
      </section>

      <section className="home-area-banners" aria-labelledby="area-banners-title">
        <Container>
          <div className="section-title section-title-left">
            <Eyebrow>Atendimento por área</Eyebrow>
            <h2 id="area-banners-title">Caminhos de orientação</h2>
          </div>
          <div className="area-banner-grid">
            {areaSummaries.map((area, index) => (
              <Link
                className={`area-banner-card ${index % 2 === 0 ? 'area-banner-card-dark' : ''}`}
                href={area.href}
                key={area.href}
              >
                <span>{area.shortTitle}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <BrandIcon name={area.icon} />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-about" id="sobre" aria-labelledby="sobre-title">
        <Container className="about-inner">
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
            <Eyebrow>Quem vai atender você</Eyebrow>
            <h2 id="sobre-title">Prazer, eu sou Deila Pinto</h2>
            <p>
              Advogada inscrita na OAB/RN 22.940, com atuação voltada a demandas
              previdenciárias, assistenciais, trabalhistas, licitações e contratos.
            </p>
            <p>
              A primeira conversa busca entender o caso com linguagem clara, cuidado
              com documentos e respeito ao momento de cada pessoa.
            </p>
            <OutlineButton href="/sobre">Me conhecer melhor</OutlineButton>
          </div>
        </Container>
      </section>

      <section className="home-steps" id="como-funciona" aria-labelledby="steps-title">
        <Container>
          <Eyebrow>Como funciona</Eyebrow>
          <ProcessSteps items={homeSteps} title="Um atendimento em 3 passos" />
        </Container>
      </section>

      {featuredCampaigns.length ? (
        <section className="campaign-showcase" id="campanhas" aria-labelledby="titulo-campanhas">
          <Container>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Campanhas</p>
                <h2 id="titulo-campanhas">Orientações por situação</h2>
              </div>
              <Link className="button button-secondary" href="/campanhas">
                Ver todas
              </Link>
            </div>
            <div className="campaign-grid campaign-grid-featured">
              {featuredCampaigns.map((campaign) => {
                const titulo = getPublicText(campaign.titulo) || campaign.campaignCode
                const subtitulo = getPublicText(campaign.subtitulo)

                return (
                  <article className="campaign-card" key={campaign.id}>
                    <span>{campaignArea(campaign)}</span>
                    <h3>{titulo}</h3>
                    {subtitulo ? <p>{subtitulo}</p> : null}
                    <Link href={`/campanhas/${campaign.slug}`}>Abrir orientação</Link>
                  </article>
                )
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection
        eyebrow="Vamos conversar?"
        title="Inicie pelo caminho mais simples."
        text="O WhatsApp preserva o assunto escolhido e facilita a continuidade da conversa."
      />
    </div>
  )
}
