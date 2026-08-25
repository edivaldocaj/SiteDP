import React from 'react'

import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'
import { WhatsAppIcon } from './WhatsAppIcon'

export async function UrgencyShortcut() {
  const config = await getPublicSiteConfig()
  const text = getPublicText(config?.urgenciaTexto)

  if (!text) return null

  return (
    <a className="urgency-shortcut" href="/ir/whatsapp?c=PREV-EXIGENCIA">
      <WhatsAppIcon />
      {text}
    </a>
  )
}
