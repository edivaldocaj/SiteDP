export type CampaignQuestion = {
  id?: string | null
  opcoes?: Array<{ id?: string | null; opcao?: string | null }> | null
  pergunta?: string | null
  tipo?: 'texto' | 'data' | 'opcoes' | null
}

export type PublicCampaign = {
  blocoDor?: unknown
  blocoProva?: unknown
  campaignCode: string
  id: string | number
  mensagemWhatsapp?: string | null
  midiaTopo?: unknown
  perguntas?: CampaignQuestion[] | null
  seo?: {
    descricao?: string | null
    ogImage?: unknown
    titulo?: string | null
  } | null
  slug: string
  status?: 'rascunho' | 'publicada' | null
  subtitulo?: string | null
  temLanding?: boolean | null
  titulo?: string | null
}

type CampaignPayload = {
  find: (args: {
    collection: string
    depth?: number
    limit: number
    overrideAccess?: boolean
    where: Record<string, unknown>
  }) => Promise<{ docs: PublicCampaign[] }>
}

async function getPayload() {
  const { getPayloadClient } = await import('./integration/payload')
  return (await getPayloadClient()) as unknown as CampaignPayload
}

export async function getPublishedCampaignBySlug(slug: string) {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) {
    return null
  }

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'campaigns',
      depth: 2,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'publicada',
            },
          },
          {
            temLanding: {
              equals: true,
            },
          },
        ],
      },
    })

    return result.docs[0] || null
  } catch {
    return null
  }
}

export function isPublicLandingCampaign(campaign?: Pick<PublicCampaign, 'status' | 'temLanding'> | null) {
  return Boolean(campaign && campaign.status === 'publicada' && campaign.temLanding)
}

export async function getCampaignByCode(campaignCode: string) {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) {
    return null
  }

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'campaigns',
      depth: 1,
      limit: 1,
      overrideAccess: true,
      where: {
        campaignCode: {
          equals: campaignCode,
        },
      },
    })

    return result.docs[0] || null
  } catch {
    return null
  }
}
