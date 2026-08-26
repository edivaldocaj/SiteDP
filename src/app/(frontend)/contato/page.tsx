import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import { FraudWarning } from '@/components/FraudWarning'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { getPublicSiteConfig, getPublicText, type PublicSiteConfig } from '@/lib/siteConfig'

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
  const title = getPublicText(config?.razaoSocial) || 'Deila Pinto Advocacia e Consultoria'
  const titular = getPublicText(config?.titular)
  const oab = getPublicText(config?.oab)
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
        <div className="contact-hero-copy">
          <p className="eyebrow">Contato</p>
          <h1 id="contact-title">Vamos conversar sobre o seu direito?</h1>
          <p>
            O primeiro contato pode ser feito pelo WhatsApp. Envie uma mensagem simples
            contando o que aconteceu e, se tiver, separe datas e documentos.
          </p>
          <div className="actions">
            <a className="button button-primary" href="/ir/whatsapp?o=contato">
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
            {primaryEmail ? (
              <a className="button button-secondary button-on-dark" href={`mailto:${primaryEmail}`}>
                Enviar e-mail
              </a>
            ) : null}
          </div>
        </div>
        <div className="contact-hero-card" aria-label="Dados do escritorio">
          <Image
            alt=""
            className="contact-portrait"
            height={760}
            src="/imagens/deila/deila-livro.webp"
            unoptimized
            width={760}
          />
          <div>
            <strong>{title}</strong>
            {titular || oab ? <span>{[titular, oab].filter(Boolean).join(' · ')}</span> : null}
          </div>
        </div>
      </section>

      <section className="contact-details" aria-label="Canais de contato">
        <div className="section-inner contact-grid">
          <article className="contact-method contact-method-primary">
            <span>WhatsApp</span>
            <h2>Canal principal de atendimento</h2>
            <p>Use para enviar seu relato inicial e receber orientação sobre os próximos passos.</p>
            <a className="button button-primary" href="/ir/whatsapp?o=contato">
              <WhatsAppIcon />
              Abrir WhatsApp
            </a>
          </article>

          <article className="contact-method">
            <span>Atendimento</span>
            <h2>Presencial mediante agendamento</h2>
            {addressText ? <p>{addressText}</p> : <p>O endereço completo será confirmado pelo atendimento.</p>}
            {horario ? <p>{horario}</p> : null}
          </article>

          <article className="contact-method">
            <span>Documentos</span>
            <h2>O que ajuda no primeiro contato</h2>
            <p>Datas, cartas do INSS, prints, carteira de trabalho, laudos e comprovantes podem ajudar na conversa.</p>
          </article>
        </div>
      </section>

      {areas.length ? (
        <section className="contact-areas" aria-labelledby="contact-areas-title">
          <div className="section-inner">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Áreas</p>
                <h2 id="contact-areas-title">Assuntos atendidos</h2>
              </div>
            </div>
            <div className="contact-area-list">
              {areas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="contact-security" aria-label="Aviso de seguranca">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Segurança</p>
            <h2>Antes de enviar qualquer dado sensível.</h2>
          </div>
          <FraudWarning />
        </div>
      </section>
    </div>
  )
}
