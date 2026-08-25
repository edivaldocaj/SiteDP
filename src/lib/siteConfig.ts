import { isRenderableText } from './richText'

export type PublicSiteConfig = {
  areasDeAtuacao?: Array<{ id?: string | null; nome?: string | null }> | null
  avisoGolpeTexto?: string | null
  consentimentoVersao?: string | null
  emails?: Array<{ email?: string | null; id?: string | null }> | null
  endereco?: Array<{
    bairro?: string | null
    cep?: string | null
    cidade?: string | null
    id?: string | null
    logradouro?: string | null
    uf?: string | null
  }> | null
  horarioAtendimento?: string | null
  instagram?: string | null
  oab?: string | null
  razaoSocial?: string | null
  telefoneWhatsapp?: string | null
  textoConsentimento?: string | null
  titular?: string | null
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
