import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { areaSummaries } from '@/lib/marketingContent'
import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'

import { FraudWarning } from './FraudWarning'
import { WhatsAppIcon } from './WhatsAppIcon'

const fallbackAreas = areaSummaries.map((area) => area.title)

export async function SiteFooter() {
  const config = await getPublicSiteConfig()
  const configuredAreas =
    config?.areasDeAtuacao
      ?.map((area) => getPublicText(area.nome))
      .filter((area): area is string => Boolean(area)) || []
  const areas = configuredAreas.length ? configuredAreas : fallbackAreas
  const email = getPublicText(config?.emails?.[0]?.email)
  const horario = getPublicText(config?.horarioAtendimento)

  return (
    <footer className="site-footer">
      <Image
        alt=""
        aria-hidden="true"
        className="footer-monogram"
        height={320}
        src="/marca/dp-simbolo.png"
        style={{ height: 'auto', width: '220px' }}
        unoptimized
        width={320}
      />
      <div className="site-footer-main">
        <Image
          alt="Deila Pinto Advocacia e Consultoria"
          height={54}
          src="/marca/dp-horizontal-claro.png"
          style={{ height: 'auto', width: 'min(240px, 70vw)' }}
          unoptimized
          width={240}
        />
        <p>Advocacia com propósito, técnica e sensibilidade para defender o que é seu por direito.</p>
      </div>
      <div className="site-footer-column">
        <strong>Áreas de atuação</strong>
        {areaSummaries.map((area) => (
          <Link href={area.href} key={area.href}>
            {area.title}
          </Link>
        ))}
        {configuredAreas.length
          ? areas
              .filter((area) => !fallbackAreas.includes(area))
              .map((area) => <span key={area}>{area}</span>)
          : null}
      </div>
      <div className="site-footer-column">
        <strong>Institucional</strong>
        <Link href="/sobre">Sobre</Link>
        <Link href="/#como-funciona">Como Funciona</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contato">Contato</Link>
      </div>
      <div className="site-footer-column">
        <strong>Atendimento</strong>
        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
        <span>Goianinha/RN</span>
        <span>Atendimento também em Natal/RN</span>
      </div>
      <div className="site-footer-column">
        <strong>Horário de atendimento</strong>
        {horario ? <span>{horario}</span> : <span>Atendimento mediante agendamento.</span>}
        <Link className="footer-whatsapp" href="/ir/whatsapp">
          <WhatsAppIcon />
          Fale no WhatsApp
        </Link>
      </div>
      <FraudWarning className="footer-warning" />
    </footer>
  )
}
