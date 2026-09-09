import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ContentCard } from '@/lib/siteContent'
import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'

import { FraudWarning } from './FraudWarning'
import { WhatsAppIcon } from './WhatsAppIcon'

export async function SiteFooter({ content, areas = [] }: { content?: any; areas?: ContentCard[] }) {
  const config = await getPublicSiteConfig()
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
        alt={content?.logoAlt || ''}
          height={54}
          src="/marca/dp-horizontal-claro.png"
          style={{ height: 'auto', width: 'min(240px, 70vw)' }}
          unoptimized
          width={240}
        />
        <p>{content?.rodapeResumo}</p>
      </div>
      <div className="site-footer-column">
        <strong>{content?.rodapeAreasTitulo}</strong>
        {areas.map((area) => (
          <Link href={area.link || '/areas-de-atuacao'} key={area.link || area.titulo}>
            {area.titulo}
          </Link>
        ))}
      </div>
      <div className="site-footer-column">
        <strong>{content?.rodapeInstitucionalTitulo}</strong>
        {(content?.menu || []).filter((item: any) => !item.mostrarAreas).map((item: any) => <Link href={item.link || '/'} key={item.link}>{item.rotulo}</Link>)}
      </div>
      <div className="site-footer-column">
        <strong>{content?.rodapeAtendimentoTitulo}</strong>
        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
        {(content?.rodapeLocais || []).map((local: any) => <span key={local.texto}>{local.texto}</span>)}
      </div>
      <div className="site-footer-column">
        <strong>{content?.rodapeHorarioTitulo}</strong>
        {horario ? <span>{horario}</span> : null}
        <Link className="footer-whatsapp" href="/ir/whatsapp">
          <WhatsAppIcon />
          {content?.whatsappBotao}
        </Link>
      </div>
      <FraudWarning className="footer-warning" />
    </footer>
  )
}
