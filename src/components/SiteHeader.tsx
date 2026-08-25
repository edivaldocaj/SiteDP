import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { WhatsAppIcon } from './WhatsAppIcon'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Pagina inicial">
        <Image
          alt="Marca do escritorio"
          height={64}
          priority
          src="/marca/dp-horizontal.png"
          unoptimized
          width={284}
        />
      </Link>
      <nav aria-label="Navegacao principal">
        <Link href="/">Inicio</Link>
        <Link href="/#orientacao">Orientacao</Link>
        <Link href="/campanhas">Campanhas</Link>
        <Link href="/contato">Contato</Link>
        <Link className="nav-action" href="/ir/whatsapp">
          <WhatsAppIcon />
          WhatsApp
        </Link>
      </nav>
    </header>
  )
}
