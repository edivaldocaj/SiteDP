import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import React from 'react'

import { campaignCategoryLabel, getPublishedLandingCampaigns } from '@/lib/campaigns'
import { getPublicText } from '@/lib/siteConfig'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description:
    'Campanhas de orientacao inicial sobre temas previdenciarios, assistenciais e trabalhistas.',
  title: 'Campanhas | Deila Pinto Advocacia',
}

export default async function CampaignsPage() {
  const campaigns = await getPublishedLandingCampaigns()

  return (
    <div className="site-shell listing-page">
      <section className="listing-hero" aria-labelledby="titulo-campanhas">
        <div className="listing-hero-inner">
          <div className="listing-hero-copy">
            <p className="eyebrow">Campanhas para começar</p>
            <h1 id="titulo-campanhas">Encontre uma orientação para a sua situação</h1>
            <p>
              Escolha um tema, veja as informações iniciais e decida se quer continuar
              pelo formulário ou pelo WhatsApp.
            </p>
            <Link className="button button-primary" href="/agendar">
              Solicitar horário de atendimento
            </Link>
          </div>
          <div className="listing-hero-mark" aria-hidden="true">
            <Image alt="" height={360} priority src="/marca/dp-simbolo.png" unoptimized width={360} />
          </div>
        </div>
      </section>

      <section className="campaign-showcase campaign-showcase-list" aria-label="Campanhas publicadas">
        <div className="section-inner">
          {campaigns.length ? (
            <>
              <div className="campaign-list-heading">
                <div>
                  <p className="eyebrow">Campanhas publicadas</p>
                  <h2>Escolha o tema que mais se aproxima do seu momento</h2>
                </div>
                <p>
                  Cada orientação explica o que observar e reúne perguntas curtas para
                  organizar o primeiro contato com cuidado e clareza.
                </p>
              </div>
              <div className="campaign-grid">
              {campaigns.map((campaign) => {
                const titulo = getPublicText(campaign.titulo) || campaign.campaignCode
                const subtitulo = getPublicText(campaign.subtitulo)

                return (
                  <article className="campaign-card" key={campaign.id}>
                    <div className="campaign-card-meta">
                      <span>{campaignCategoryLabel(campaign.categoria)}</span>
                      <small>Primeiro contato</small>
                    </div>
                    <h3>{titulo}</h3>
                    {subtitulo ? <p>{subtitulo}</p> : null}
                    <Link href={`/campanhas/${campaign.slug}`}>
                      <span>Ver campanha e começar</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                )
              })}
              </div>
            </>
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
