import type { BrandIconName } from '@/components/BrandIcons'

export type ContentCard = { descricao?: string | null; icone?: string | null; id?: string | null; link?: string | null; titulo?: string | null }
export type ContentStep = { descricao?: string | null; id?: string | null; titulo?: string | null }
export type ContentFaq = { id?: string | null; pergunta?: string | null; resposta?: string | null }
export type SiteContentData = Record<string, any>

type PayloadLike = { findGlobal: (args: { depth?: number; overrideAccess?: boolean; slug: string }) => Promise<SiteContentData> }

export async function getSiteContent(): Promise<SiteContentData | null> {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) return null
  try {
    const { getPayloadClient } = await import('./integration/payload')
    return await (await getPayloadClient() as unknown as PayloadLike).findGlobal({ depth: 1, overrideAccess: true, slug: 'site-content' })
  } catch { return null }
}

export function mediaURL(value: unknown): string | null {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') return value.url
  return null
}

export function iconName(value: unknown, fallback: BrandIconName = 'document'): BrandIconName {
  return (typeof value === 'string' && value ? value : fallback) as BrandIconName
}

export function textValue(value: unknown): string { return typeof value === 'string' ? value.trim() : '' }
export function listValues<T>(value: unknown): T[] { return Array.isArray(value) ? value as T[] : [] }
