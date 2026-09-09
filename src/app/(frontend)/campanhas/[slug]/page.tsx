import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CampaignLeadForm } from '@/components/CampaignLeadForm'
import { FraudWarning } from '@/components/FraudWarning'
import { CampaignRichText } from '@/components/CampaignRichText'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { campaignCategoryLabel, getCampaignPresentation, getPublishedCampaignBySlug, isPublicLandingCampaign } from '@/lib/campaigns'
import { getVideoEmbedUrl } from '@/lib/campaignVideo'
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

function questionTypeLabel(type?: string | null) {
  if (type === 'data') return 'Data'
  if (type === 'opcoes') return 'Opções'
  return 'Resposta curta'
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params
  const campaign = await getPublishedCampaignBySlug(slug)

  if (!campaign || !isPublicLandingCampaign(campaign)) {
    return {
      title: 'Campanha nao encontrada',
    }
  }

  const title = getPublicText(campaign.seo?.titulo) || getPublicText(campaign.titulo) || campaign.campaignCode
  const description = getPublicText(campaign.seo?.descricao) || getPublicText(campaign.subtitulo) || undefined
  const ogImage = getMediaUrl(campaign.seo?.ogImage) || getMediaUrl(campaign.midiaTopo)

  return {
    alternates: { canonical: `/campanhas/${campaign.slug}` },
    description,
    openGraph: {
      description,
      title,
      type: 'website',
      url: `/campanhas/${campaign.slug}`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      title,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params
  const campaign = await getPublishedCampaignBySlug(slug)

  if (!campaign || !isPublicLandingCampaign(campaign)) {
    notFound()
  }

  const currentCampaign = campaign
  const presentation = getCampaignPresentation(currentCampaign)
  const siteConfig = await getPublicSiteConfig()
  const titulo = getPublicText(currentCampaign.titulo)
  const subtitulo = getPublicText(currentCampaign.subtitulo)
  const mediaUrl = getMediaUrl(currentCampaign.midiaTopo)
  const hasDor = getPublicText(richTextToPlainText(currentCampaign.blocoDor))
  const hasProva = getPublicText(richTextToPlainText(currentCampaign.blocoProva))
  const hasOrientacao = getPublicText(richTextToPlainText(currentCampaign.blocoOrientacao))
  const urgencyText = getPublicText(currentCampaign.textoUrgencia)
  const fallbackMediaUrl = getMediaUrl(presentation.midiaFallback) || '/imagens/deila/deila-hero.webp'
  const sealMediaUrl = getMediaUrl(presentation.seloMarca) || '/marca/dp-simbolo.png'
  const videoFileUrl = getMediaUrl(currentCampaign.videoFile)
  const videoEmbedUrl = getVideoEmbedUrl(currentCampaign.videoUrl)
  const faqItems = (currentCampaign.faq || [])
    .map((item) => ({
      pergunta: getPublicText(item.pergunta),
      resposta: getPublicText(item.resposta),
    }))
    .filter((item) => item.pergunta && item.resposta)
    .slice(0, 8)
  const showForm = currentCampaign.mostrarFormulario !== false
  const qualificationQuestions = (currentCampaign.perguntas || [])
    .filter((question) => getPublicText(question.pergunta))
    .slice(0, 4)
  const whatsappHref = `/ir/whatsapp?c=${encodeURIComponent(currentCampaign.campaignCode)}&o=landing`

  return (
    <div className="site-shell campaign-page">
      <section className="campaign-hero" aria-labelledby="campaign-title">
        <div className="campaign-copy">
          <p className="eyebrow">{campaignCategoryLabel(currentCampaign.categoria)} · Informação jurídica</p>
          {titulo ? <h1 id="campaign-title">{titulo}</h1> : null}
          {subtitulo ? <p>{subtitulo}</p> : null}
          <div className="campaign-hero-actions">
            <a className="button button-primary" href={whatsappHref}>
              <WhatsAppIcon />
              {presentation.ctaWhatsapp}
            </a>
            {showForm ? <a className="button button-secondary button-on-dark" href="#formulario">
              {presentation.ctaFormulario}
            </a> : null}
          </div>
          <p className="campaign-care-note">{presentation.notaCuidado}</p>
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
        ) : (
          <div className="campaign-visual-fallback" aria-hidden="true">
            <Image
              alt=""
              className="campaign-fallback-photo"
              height={899}
              priority
              src={fallbackMediaUrl}
              unoptimized
              width={989}
            />
            <div className="campaign-fallback-seal">
              <Image alt="" height={72} src={sealMediaUrl} unoptimized width={72} />
              <span>{campaignCategoryLabel(currentCampaign.categoria)}</span>
            </div>
          </div>
        )}
      </section>

      {urgencyText ? (
        <aside className="campaign-urgency-bar" aria-label="Aviso da campanha">
          <span aria-hidden="true">!</span>
          <p>{urgencyText}</p>
        </aside>
      ) : null}

      <section className="campaign-intro-strip" aria-label="Como funciona o primeiro contato">
        {presentation.etapasContato.map((etapa, index) => <div key={`${etapa.titulo}-${index}`}><strong>{index + 1}</strong><span>{etapa.titulo}</span></div>)}
      </section>

      {hasDor || hasProva || hasOrientacao ? (
        <section className="campaign-content-band">
          <div className="section-inner campaign-blocks">
            {hasDor ? (
              <article className="campaign-text-panel">
                <h2>{presentation.blocoDorTitulo}</h2>
                <CampaignRichText value={currentCampaign.blocoDor} />
              </article>
            ) : null}
            {hasProva ? (
              <article className="campaign-text-panel campaign-text-panel-accent">
                <h2>{presentation.blocoProvaTitulo}</h2>
                <CampaignRichText value={currentCampaign.blocoProva} />
              </article>
            ) : null}
            {hasOrientacao ? (
              <article className="campaign-text-panel campaign-text-panel-guidance">
                <h2>{presentation.blocoOrientacaoTitulo}</h2>
                <CampaignRichText value={currentCampaign.blocoOrientacao} />
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {videoEmbedUrl || videoFileUrl ? (
        <section className="campaign-video-band" aria-labelledby="campaign-video-title">
          <div className="section-inner campaign-video-layout">
            <div>
              <span className="eyebrow">{presentation.videoEyebrow}</span>
              <h2 id="campaign-video-title">{presentation.videoTitulo}</h2>
              <p>{presentation.videoDescricao}</p>
            </div>
            <div className="campaign-video-frame">
              {!videoFileUrl && videoEmbedUrl ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={videoEmbedUrl}
                  title={`Vídeo da campanha ${titulo || currentCampaign.campaignCode}`}
                />
              ) : (
                <video controls preload="metadata" src={videoFileUrl || undefined}>
                  Seu navegador não consegue reproduzir este vídeo.
                </video>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {faqItems.length ? (
        <section className="campaign-faq-band" aria-labelledby="campaign-faq-title">
          <div className="section-inner campaign-faq-layout">
            <div>
              <span className="eyebrow">{presentation.faqEyebrow}</span>
              <h2 id="campaign-faq-title">{presentation.faqTitulo}</h2>
              <p>{presentation.faqDescricao}</p>
            </div>
            <div className="campaign-faq-list">
              {faqItems.map((item, index) => (
                <details key={`${item.pergunta}-${index}`}>
                  <summary>{item.pergunta}</summary>
                  <p>{item.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="campaign-form-band" id="formulario">
        <div className="section-inner campaign-form-layout">
          {showForm ? (
            <CampaignLeadForm
              campaignCode={currentCampaign.campaignCode}
              consentimentoTexto={getPublicText(siteConfig?.textoConsentimento)}
              consentimentoVersao={siteConfig?.consentimentoVersao || undefined}
              perguntas={currentCampaign.perguntas || []}
            />
          ) : (
            <article className="campaign-contact-card">
              <span>Primeiro contato</span>
              <h2>{presentation.formularioTituloWhatsapp}</h2>
              <p>{presentation.formularioTextoWhatsapp}</p>
              <a className="button button-gold" href={whatsappHref}>
                <WhatsAppIcon />
                Conversar com a equipe
              </a>
            </article>
          )}
          <div className="landing-side" id="perguntas">
            {qualificationQuestions.length ? (
              <article className="question-preview">
                <span>{presentation.triagemEyebrow}</span>
                <h2>{presentation.triagemTitulo}</h2>
                <ol>
                  {qualificationQuestions.map((question, index) => (
                    <li key={question.id || `${question.pergunta}-${index}`}>
                      <strong>{question.pergunta}</strong>
                      <small>{questionTypeLabel(question.tipo)}</small>
                    </li>
                  ))}
                </ol>
              </article>
            ) : (
              <article className="question-preview">
                <span>{presentation.triagemEyebrow}</span>
                <h2>{presentation.triagemVaziaTitulo}</h2>
                <p>{presentation.triagemVaziaTexto}</p>
              </article>
            )}
            {showForm ? (
              <a className="button button-gold" href={whatsappHref}>
                <WhatsAppIcon />
                {presentation.ctaWhatsapp}
              </a>
            ) : null}
            <FraudWarning />
          </div>
        </div>
      </section>
    </div>
  )
}
