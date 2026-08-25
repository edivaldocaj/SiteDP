import Link from 'next/link'
import type { Metadata } from 'next'
import React from 'react'

import { getPublishedLandingCampaigns, type PublicCampaign } from '@/lib/campaigns'
import { getPublicText } from '@/lib/siteConfig'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Campanhas de orientacao inicial sobre temas previdenciarios, assistenciais e trabalhistas.',
  title: 'Campanhas | Deila Pinto Advocacia',
}

function campaignArea(campaign: PublicCampaign) {
  if (campaign.campaignCode === 'PREV-BPC') return 'Assistencial'
  if (campaign.campaignCode.startsWith('TRAB-')) return 'Trabalhista'
  return 'Previdenciario'
}

export default async function CampaignsPage() {
  const campaigns = await getPublishedLandingCampaigns()

  return (
    <div className="site-shell listing-page">
      <section className="listing-hero" aria-labelledby="titulo-campanhas">
        <p className="eyebrow">Campanhas</p>
        <h1 id="titulo-campanhas">Orientações por situação</h1>
        <p>
          Escolha o assunto mais próximo do seu caso para iniciar com perguntas simples
          e direcionamento correto para o WhatsApp.
        </p>
      </section>

      <section className="campaign-showcase campaign-showcase-list" aria-label="Campanhas publicadas">
        <div className="section-inner">
          {campaigns.length ? (
            <div className="campaign-grid">
              {campaigns.map((campaign) => {
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
          ) : (
            <div className="empty-state">
              <h2>Nenhuma campanha publicada no momento.</h2>
              <a className="button button-primary" href="/ir/whatsapp">
                Abrir WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
