import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { getPublishedLandingCampaigns, type PublicCampaign } from '@/lib/campaigns'
import { getPublicText } from '@/lib/siteConfig'

import './styles.css'

export const dynamic = 'force-dynamic'

const practiceAreas = [
  {
    description: 'Aposentadorias, auxilios, pensoes, revisoes e beneficios por incapacidade.',
    href: '/campanhas',
    icon: 'INSS',
    title: 'Direito Previdenciario',
  },
  {
    description: 'BPC/LOAS para idosos, pessoas com deficiencia e familias em vulnerabilidade.',
    href: '/campanhas/prev-bpc',
    icon: 'BPC',
    title: 'BPC/LOAS',
  },
  {
    description: 'Rescisao, jornada, justa causa, ambiente nocivo e demais demandas trabalhistas.',
    href: '/campanhas',
    icon: 'CLT',
    title: 'Direito do Trabalho',
  },
  {
    description: 'Orientacao em licitacoes, contratos administrativos e documentos de contratacao.',
    href: '/ir/whatsapp?o=licitacoes-contratos',
    icon: 'LC',
    title: 'Licitacoes e Contratos',
  },
]

const steps = [
  {
    description: 'Envie uma mensagem pelo WhatsApp ou escolha uma campanha relacionada ao seu caso.',
    title: 'Fale comigo',
  },
  {
    description: 'Datas, documentos e contexto ajudam a entender qual caminho deve ser avaliado.',
    title: 'Organize o relato',
  },
  {
    description: 'A orientacao segue conforme as particularidades da situacao apresentada.',
    title: 'Proximos passos',
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
      <section className="home-hero" aria-labelledby="titulo-home">
        <div className="home-hero-copy">
          <p className="eyebrow">Advocacia com proposito</p>
          <h1 id="titulo-home">
            Orientacao juridica com <span>clareza, atencao</span> e responsabilidade
          </h1>
          <p>
            Atendimento em Direito Previdenciario, BPC/LOAS, Direito do Trabalho,
            Licitacoes e Contratos para organizar informacoes e proximos passos.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-whatsapp" href="/ir/whatsapp">
              <WhatsAppIcon />
              Fale comigo no WhatsApp
            </a>
            <a className="hero-note" href="#sobre">
              Atendimento em Goianinha e Natal/RN
            </a>
          </div>
        </div>
        <div className="home-hero-portrait" aria-hidden="true">
          <Image
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 90vw, 48vw"
            src="/imagens/deila/deila-hero.webp"
            unoptimized
          />
        </div>
      </section>

      <section className="home-areas" id="areas" aria-labelledby="areas-title">
        <div className="section-inner">
          <div className="section-kicker">
            <p className="eyebrow">Areas de atuacao</p>
            <h2 id="areas-title">Como posso te ajudar</h2>
          </div>
          <div className="area-card-grid">
            {practiceAreas.map((area) => (
              <Link className="area-card" href={area.href} key={area.title}>
                <span className="area-icon">{area.icon}</span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <small>Saiba mais</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-about" id="sobre" aria-labelledby="sobre-title">
        <div className="about-photo">
          <Image
            alt="Dra. Deila Pinto"
            fill
            sizes="(max-width: 900px) 92vw, 36vw"
            src="/imagens/deila/deila-perfil.webp"
            unoptimized
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Quem vai atender voce</p>
          <h2 id="sobre-title">Prazer, eu sou Deila Pinto</h2>
          <p>
            Advogada inscrita na OAB/RN 22.940, com atuacao voltada a demandas
            previdenciarias, assistenciais, trabalhistas, licitacoes e contratos.
          </p>
          <p>
            A primeira conversa busca entender o caso com linguagem clara, cuidado
            com documentos e respeito ao momento de cada pessoa.
          </p>
          <a className="button button-secondary" href="/contato">
            Me conhecer melhor
          </a>
        </div>
      </section>

      <section className="home-steps" id="como-funciona" aria-labelledby="steps-title">
        <div className="section-inner">
          <div className="section-kicker">
            <p className="eyebrow">Como funciona</p>
            <h2 id="steps-title">Um atendimento em 3 passos</h2>
          </div>
          <div className="steps-row">
            {steps.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
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
                <h2 id="titulo-campanhas">Orientacoes por situacao</h2>
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
                    <Link href={`/campanhas/${campaign.slug}`}>Abrir orientacao</Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="home-contact" id="contato" aria-labelledby="contato-title">
        <div className="home-contact-copy">
          <p className="eyebrow">Contato</p>
          <h2 id="contato-title">Inicie pelo caminho mais simples.</h2>
          <p>O WhatsApp preserva o assunto escolhido e facilita a continuidade da conversa.</p>
        </div>
        <a className="button button-primary button-whatsapp" href="/ir/whatsapp">
          <WhatsAppIcon />
          Fale no WhatsApp
        </a>
      </section>
    </div>
  )
}
