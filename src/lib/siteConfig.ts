import { isRenderableText } from './richText'

export type PublicSiteConfig = {
  avisoGolpeTexto?: string | null
  consentimentoVersao?: string | null
  textoConsentimento?: string | null
  urgenciaTexto?: string | null
}

type SiteConfigPayload = {
  findGlobal: (args: {
    depth?: number
    overrideAccess?: boolean
    slug: string
  }) => Promise<PublicSiteConfig>
}

export async function getPublicSiteConfig(): Promise<PublicSiteConfig | null> {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) {
    return null
  }

  try {
    const { getPayloadClient } = await import('./integration/payload')
    const payload = (await getPayloadClient()) as unknown as SiteConfigPayload
    return await payload.findGlobal({
      depth: 1,
      overrideAccess: true,
      slug: 'site-config',
    })
  } catch {
    return null
  }
}

export function getPublicText(value?: string | null) {
  return isRenderableText(value) ? value?.trim() || null : null
}
