import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CampaignLeadForm } from '@/components/CampaignLeadForm'
import { FraudWarning } from '@/components/FraudWarning'
import { RichTextBlock } from '@/components/RichTextBlock'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
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

function campaignArea(campaignCode: string) {
  if (campaignCode === 'PREV-BPC') return 'Assistencial'
  if (campaignCode.startsWith('TRAB-')) return 'Trabalhista'
  return 'Previdenciario'
}

function questionTypeLabel(type?: string | null) {
  if (type === 'data') return 'Data'
  if (type === 'opcoes') return 'Opcoes'
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

  return {
    description,
    openGraph: {
      description,
      title,
      type: 'website',
      url: `/campanhas/${campaign.slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      title,
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
  const siteConfig = await getPublicSiteConfig()
  const titulo = getPublicText(currentCampaign.titulo)
  const subtitulo = getPublicText(currentCampaign.subtitulo)
  const mediaUrl = getMediaUrl(currentCampaign.midiaTopo)
  const hasDor = getPublicText(richTextToPlainText(currentCampaign.blocoDor))
  const hasProva = getPublicText(richTextToPlainText(currentCampaign.blocoProva))
  const mensagemWhatsapp = getPublicText(currentCampaign.mensagemWhatsapp)
  const qualificationQuestions = (currentCampaign.perguntas || [])
    .filter((question) => getPublicText(question.pergunta))
    .slice(0, 4)
  const whatsappHref = `/ir/whatsapp?c=${encodeURIComponent(currentCampaign.campaignCode)}&o=landing`

  return (
    <div className="site-shell campaign-page">
      <section className="campaign-hero" aria-labelledby="campaign-title">
        <div className="campaign-copy">
          <p className="eyebrow">{campaignArea(currentCampaign.campaignCode)} · {currentCampaign.campaignCode}</p>
          {titulo ? <h1 id="campaign-title">{titulo}</h1> : null}
          {subtitulo ? <p>{subtitulo}</p> : null}
          <div className="campaign-hero-actions">
            <a className="button button-primary" href={whatsappHref}>
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
            <a className="button button-secondary button-on-dark" href="#perguntas">
              Ver perguntas
            </a>
          </div>
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
              height={760}
              priority
              src="/imagens/deila/deila-livro.webp"
              unoptimized
              width={760}
            />
            <div className="campaign-fallback-seal">
              <Image alt="" height={72} src="/marca/dp-simbolo.png" unoptimized width={72} />
              <span>{campaignArea(currentCampaign.campaignCode)}</span>
            </div>
          </div>
        )}
      </section>

      <section className="campaign-intro-strip" aria-label="Como funciona o primeiro contato">
        <div>
          <strong>1</strong>
          <span>Informe telefone</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Veja perguntas curtas</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Continue pelo WhatsApp</span>
        </div>
      </section>

      {hasDor || hasProva ? (
        <section className="campaign-content-band">
          <div className="section-inner campaign-blocks">
            {hasDor ? (
              <article className="campaign-text-panel">
                <span>Contexto</span>
                <RichTextBlock value={currentCampaign.blocoDor} />
              </article>
            ) : null}
            {hasProva ? (
              <article className="campaign-text-panel campaign-text-panel-accent">
                <span>Documentos</span>
                <RichTextBlock value={currentCampaign.blocoProva} />
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="campaign-form-band" id="formulario">
        <div className="section-inner campaign-form-layout">
          <CampaignLeadForm
            campaignCode={currentCampaign.campaignCode}
            consentimentoTexto={getPublicText(siteConfig?.textoConsentimento)}
            consentimentoVersao={siteConfig?.consentimentoVersao || undefined}
            perguntas={currentCampaign.perguntas || []}
          />
          <div className="landing-side" id="perguntas">
            {qualificationQuestions.length ? (
              <article className="question-preview">
                <span>Triagem inicial</span>
                <h2>Perguntas desta campanha</h2>
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
                <span>Triagem inicial</span>
                <h2>Comece pelo WhatsApp</h2>
                <p>O atendimento fará as perguntas necessárias conforme o relato enviado.</p>
              </article>
            )}
            <a className="button button-gold" href={whatsappHref}>
              <WhatsAppIcon />
              {mensagemWhatsapp || 'Abrir WhatsApp'}
            </a>
            <FraudWarning />
          </div>
        </div>
      </section>
    </div>
  )
}
