'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import type { ContentCard } from '@/lib/siteContent'

import { WhatsAppIcon } from './WhatsAppIcon'

type HeaderProps = { areas?: ContentCard[]; logoAlt?: string; menu?: Array<{ link?: string | null; mostrarAreas?: boolean | null; rotulo?: string | null }>; whatsappLabel?: string }

export function SiteHeader({ areas = [], logoAlt = '', menu = [], whatsappLabel = '' }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Página inicial">
          <Image
            alt={logoAlt}
            height={64}
            priority
            src="/marca/dp-horizontal-claro.png"
            style={{ height: 'auto', width: 'min(216px, 54vw)' }}
            unoptimized
            width={284}
          />
        </Link>
        <button
          aria-controls="site-navigation"
          aria-expanded={open}
          aria-label="Abrir menu"
          className="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          aria-label="Navegação principal"
          className={open ? 'nav-open' : ''}
          id="site-navigation"
        >
          {menu.map((item) =>
            item.mostrarAreas ? (
              <div className="nav-dropdown" key={item.link}>
                <Link href={item.link || '/'} onClick={() => setOpen(false)}>
                  {item.rotulo}
                </Link>
                <div className="nav-dropdown-panel">
                  {areas.map((area) => (
                    <Link href={area.link || '/areas-de-atuacao'} key={area.link || area.titulo} onClick={() => setOpen(false)}>
                      {area.titulo}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link href={item.link || '/'} key={item.link} onClick={() => setOpen(false)}>
                {item.rotulo}
              </Link>
            ),
          )}
          <Link className="nav-action" href="/ir/whatsapp" onClick={() => setOpen(false)}>
            <WhatsAppIcon />
            {whatsappLabel}
          </Link>
        </nav>
      </div>
    </header>
  )
}
