import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'

import { FraudWarning } from './FraudWarning'
import { WhatsAppIcon } from './WhatsAppIcon'

const fallbackAreas = ['Previdenciario', 'Assistencial', 'Trabalhista', 'Licitacoes e Contratos']

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
      <div className="site-footer-main">
        <Image
          alt="Marca do escritorio"
          height={54}
          src="/marca/dp-horizontal-claro.png"
          unoptimized
          width={240}
        />
        <p>Advocacia com atendimento claro e responsavel.</p>
      </div>
      <div className="site-footer-column">
        <strong>Areas de atuacao</strong>
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>
      <div className="site-footer-column">
        <strong>Institucional</strong>
        <Link href="/#sobre">Sobre</Link>
        <Link href="/#como-funciona">Como funciona</Link>
        <Link href="/campanhas">Campanhas</Link>
        <Link href="/contato">Contato</Link>
      </div>
      <div className="site-footer-column">
        <strong>Atendimento</strong>
        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
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
