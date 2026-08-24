import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import { CampaignLeadForm } from '@/components/CampaignLeadForm'
import { FraudWarning } from '@/components/FraudWarning'
import { RichTextBlock } from '@/components/RichTextBlock'
import { getPublishedCampaignBySlug, isPublicLandingCampaign } from '@/lib/campaigns'
import { richTextToPlainText } from '@/lib/richText'
import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'

export const dynamic = 'force-dynamic'

type CampaignPageProps = {
  params: Promise<{ slug: string }>
}

function getMediaUrl(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const media = value as { url?: string | null }
  return media.url || null
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params
  const campaign = await getPublishedCampaignBySlug(slug)

  if (!campaign || !isPublicLandingCampaign(campaign)) {
    notFound()
  }

  const currentCampaign = campaign
  const siteConfig = await getPublicSiteConfig()
  const titulo = getPublicText(currentCampaign.titulo)
  const subtitulo = getPublicText(currentCampaign.subtitulo)
  const mediaUrl = getMediaUrl(currentCampaign.midiaTopo)
  const hasDor = getPublicText(richTextToPlainText(currentCampaign.blocoDor))
  const hasProva = getPublicText(richTextToPlainText(currentCampaign.blocoProva))
  const mensagemWhatsapp = getPublicText(currentCampaign.mensagemWhatsapp)
  const whatsappHref = `/ir/whatsapp?c=${encodeURIComponent(currentCampaign.campaignCode)}&o=landing`

  return (
    <div className="site-shell campaign-page">
      <section className="campaign-hero" aria-labelledby="campaign-title">
        <div className="campaign-copy">
          <p className="eyebrow">{currentCampaign.campaignCode}</p>
          {titulo ? <h1 id="campaign-title">{titulo}</h1> : null}
          {subtitulo ? <p>{subtitulo}</p> : null}
          <a className="button button-primary" href={whatsappHref}>
            Abrir WhatsApp
          </a>
        </div>
        {mediaUrl ? (
          <Image
            alt=""
            className="campaign-media"
            height={900}
            priority
            src={mediaUrl}
            width={1350}
          />
        ) : null}
      </section>

      {hasDor || hasProva ? (
        <section className="band light-band">
          <div className="section-inner campaign-blocks">
            {hasDor ? (
              <article>
                <RichTextBlock value={currentCampaign.blocoDor} />
              </article>
            ) : null}
            {hasProva ? (
              <article>
                <RichTextBlock value={currentCampaign.blocoProva} />
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="band dark-band">
        <div className="section-inner split">
          <CampaignLeadForm
            campaignCode={currentCampaign.campaignCode}
            consentimentoTexto={getPublicText(siteConfig?.textoConsentimento)}
            consentimentoVersao={siteConfig?.consentimentoVersao || undefined}
            perguntas={currentCampaign.perguntas || []}
          />
          <div className="landing-side">
            <a className="button button-gold" href={whatsappHref}>
              {mensagemWhatsapp || 'Abrir WhatsApp'}
            </a>
            <FraudWarning />
          </div>
        </div>
      </section>
    </div>
  )
}
