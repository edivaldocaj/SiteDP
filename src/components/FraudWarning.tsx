import React from 'react'

import { getPublicSiteConfig, getPublicText } from '@/lib/siteConfig'

export async function FraudWarning({ className = '' }: { className?: string }) {
  const config = await getPublicSiteConfig()
  const text = getPublicText(config?.avisoGolpeTexto)

  if (!text) return null

  return (
    <aside className={`fraud-warning ${className}`.trim()} aria-label="Aviso de seguranca">
      <strong>Aviso de seguranca</strong>
      <p>{text}</p>
    </aside>
  )
}
