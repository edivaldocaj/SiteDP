'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { areaSummaries } from '@/lib/marketingContent'

import { WhatsAppIcon } from './WhatsAppIcon'

const navItems = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/areas-de-atuacao', label: 'Áreas de Atuação', withDropdown: true },
  { href: '/#como-funciona', label: 'Como Funciona' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Página inicial">
          <Image
            alt="Deila Pinto Advocacia e Consultoria"
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
          {navItems.map((item) =>
            item.withDropdown ? (
              <div className="nav-dropdown" key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                <div className="nav-dropdown-panel">
                  {areaSummaries.map((area) => (
                    <Link href={area.href} key={area.href} onClick={() => setOpen(false)}>
                      {area.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ),
          )}
          <Link className="nav-action" href="/ir/whatsapp" onClick={() => setOpen(false)}>
            <WhatsAppIcon />
            Fale no WhatsApp
          </Link>
        </nav>
      </div>
    </header>
  )
}
