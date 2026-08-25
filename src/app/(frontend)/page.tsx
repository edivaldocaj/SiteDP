import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FraudWarning } from '@/components/FraudWarning'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { getPublishedLandingCampaigns, type PublicCampaign } from '@/lib/campaigns'
import { getPublicText } from '@/lib/siteConfig'

import './styles.css'

export const dynamic = 'force-dynamic'

const practiceAreas = [
  {
    description: 'Beneficios do INSS, revisoes, incapacidade, pensao e aposentadoria rural.',
    index: '01',
    title: 'Previdenciario',
  },
  {
    description: 'BPC/LOAS, CadUnico, documentos de renda e situacoes de vulnerabilidade.',
    index: '02',
    title: 'Assistencial',
  },
  {
    description: 'Rescisao, jornada, justa causa, ambiente nocivo e problemas graves no trabalho.',
    index: '03',
    title: 'Trabalhista',
  },
]

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
      <section className="hero hero-premium" aria-labelledby="titulo-home">
        <Image
          alt=""
          className="hero-background"
          fill
          priority
          sizes="100vw"
          src="/imagens/hero-consultoria-dp.webp"
          unoptimized
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-mark" aria-hidden="true">
          <Image alt="" height={420} src="/marca/dp-simbolo.png" unoptimized width={420} />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Advocacia e consultoria no RN</p>
          <h1 id="titulo-home">Vamos conversar sobre o seu direito?</h1>
          <p>
            Atendimento em Goianinha, com orientação também para quem está em Natal.
            Uma conversa inicial clara ajuda a organizar datas, documentos e próximos passos.
          </p>
          <div className="hero-tags" aria-label="Pontos do atendimento">
            <span>Previdenciario</span>
            <span>Assistencial</span>
            <span>Trabalhista</span>
          </div>
          <div className="actions">
            <a className="button button-primary" href="/ir/whatsapp">
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
            <a className="button button-secondary button-on-dark" href="#campanhas">
              Ver campanhas
            </a>
          </div>
        </div>
      </section>

      <section className="practice-section" id="orientacao" aria-labelledby="titulo-orientacao">
        <div className="section-inner">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Orientacao</p>
              <h2 id="titulo-orientacao">Áreas de atendimento</h2>
            </div>
            <p className="section-lead">
              As situações mais comuns ficam organizadas para um primeiro contato simples,
              com foco em datas, documentos e contexto.
            </p>
          </div>
          <div className="practice-grid">
            {practiceAreas.map((area) => (
              <article className="practice-card" key={area.title}>
                <span className="practice-index">{area.index}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredCampaigns.length ? (
        <section className="campaign-showcase" id="campanhas" aria-labelledby="titulo-campanhas">
          <div className="section-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Campanhas</p>
                <h2 id="titulo-campanhas">Situações que merecem atenção desde o início.</h2>
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
          </div>
        </section>
      ) : null}

      <section className="band dark-band" aria-labelledby="titulo-processo">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Primeiro contato</p>
            <h2 id="titulo-processo">O relato vem primeiro.</h2>
          </div>
          <div className="principles">
            <article className="principle-large">
              <span>Escuta</span>
              <h3>Conte o que aconteceu.</h3>
              <p>Datas, respostas do INSS, mensagens da empresa e documentos ajudam a orientar a conversa.</p>
            </article>
            <article>
              <span>Documentos</span>
              <h3>Separe o que tiver.</h3>
              <p>Mesmo quando falta algum papel, o primeiro passo é organizar o que já existe.</p>
            </article>
            <article>
              <span>Clareza</span>
              <h3>Sem excesso de formalidade.</h3>
              <p>As próximas etapas são explicadas conforme as particularidades da situação.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band light-band" id="contato" aria-labelledby="titulo-contato">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 id="titulo-contato">Inicie pelo caminho mais simples.</h2>
            <p className="section-copy">
              O WhatsApp preserva o assunto escolhido e facilita a continuidade da conversa.
            </p>
          </div>
          <div className="contact-panel">
            <Image alt="" height={76} src="/marca/dp-simbolo.png" unoptimized width={76} />
            <p>Use o WhatsApp para iniciar uma conversa sobre a sua situação.</p>
            <a className="button button-primary" href="/ir/whatsapp">
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
            <FraudWarning />
          </div>
        </div>
      </section>
    </div>
  )
}
