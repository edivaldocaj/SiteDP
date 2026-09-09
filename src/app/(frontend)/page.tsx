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
import { getSiteContent, iconName, listValues, mediaURL } from '@/lib/siteContent'
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
  const content = await getSiteContent()
  const page = content?.home || {}
  const areaSummaries = listValues<any>(content?.paginasArea).map((area) => ({ description: area.descricao, href: `/areas-de-atuacao/${area.slug}`, icon: iconName(area.icone), shortTitle: area.chapeu, title: area.titulo }))
  const homeSteps = listValues<any>(page.processoEtapas).map((item) => ({ title: item.titulo, description: item.descricao }))
  const featuredCampaigns = campaigns.slice(0, 6)

  return (
    <div className="site-shell">
      <section className="home-hero" aria-labelledby="titulo-home">
        <Container className="home-hero-inner">
          <div className="home-hero-copy">
            <Eyebrow>{page.heroChapeu}</Eyebrow>
            <h1 id="titulo-home">
              <span className="hero-title-line">{page.heroLinha1}</span>
              <span className="hero-title-line">
                {page.heroLinha2Antes} <em>{page.heroLinha2Destaque}</em>
              </span>
              <span className="hero-title-line">{page.heroLinha3}</span>
            </h1>
            <p>{page.heroTexto}</p>
            <div className="actions">
              <WhatsAppButton>{page.cta?.botao}</WhatsAppButton>
              <span className="hero-note">{page.heroNota}</span>
            </div>
          </div>
          <div className="home-hero-portrait" aria-hidden="true">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 96vw, 48vw"
              src={mediaURL(page.heroImagem) || '/imagens/deila/deila-hero.webp'}
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section className="home-areas" id="areas" aria-labelledby="areas-title">
        <Container>
          <SectionHeading eyebrow={page.areasChapeu} title={page.areasTitulo} />
          <AreaCards areas={areaSummaries} />
        </Container>
      </section>

      <section className="home-area-banners" aria-labelledby="area-banners-title">
        <Container>
          <div className="section-title section-title-left">
            <Eyebrow>{page.bannersChapeu}</Eyebrow>
            <h2 id="area-banners-title">{page.bannersTitulo}</h2>
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
              src={mediaURL(page.sobreImagem) || '/imagens/deila/deila-perfil.webp'}
              unoptimized
            />
          </div>
          <div className="about-copy">
            <Eyebrow>{page.sobreChapeu}</Eyebrow>
            <h2 id="sobre-title">{page.sobreTitulo}</h2>
            {listValues<any>(page.sobreParagrafos).map((item) => <p key={item.id || item.texto}>{item.texto}</p>)}
            <OutlineButton href="/sobre">{page.sobreBotao}</OutlineButton>
          </div>
        </Container>
      </section>

      <section className="home-steps" id="como-funciona" aria-labelledby="steps-title">
        <Container>
          <Eyebrow>{page.processoChapeu}</Eyebrow>
          <ProcessSteps items={homeSteps} title={page.processoTitulo} />
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

      <CtaSection buttonLabel={page.cta?.botao} eyebrow={page.cta?.chapeu} title={page.cta?.titulo || ''} text={page.cta?.texto} />
    </div>
  )
}
