import type { CollectionConfig, PayloadRequest } from 'payload'

import { CAMPAIGN_CODE_REGEX } from '../lib/integration/constants'
import { hasRenderableRichText, richTextToPlainText } from '../lib/richText'

const campaignCodeDescription = 'Código criado primeiro no EspoCRM. Copie de lá.'

type CampaignDraft = {
  blocoDor?: unknown
  blocoProva?: unknown
  campaignCode?: string
  id?: string | number
  perguntas?: Array<{ tipo?: string | null }>
  slug?: string
  status?: string
  temLanding?: boolean
}

function normalizeSlug(value?: string | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeComparableRichText(value: unknown) {
  return richTextToPlainText(value).toLowerCase()
}

async function assertNoDuplicateLandingText({
  candidate,
  req,
}: {
  candidate: CampaignDraft
  req: PayloadRequest
}) {
  const blocoDorText = normalizeComparableRichText(candidate.blocoDor)
  const blocoProvaText = normalizeComparableRichText(candidate.blocoProva)

  if (!blocoDorText && !blocoProvaText) return

  const result = await req.payload.find({
    collection: 'campaigns',
    depth: 0,
    limit: 200,
    where: candidate.id
      ? {
          id: {
            not_equals: candidate.id,
          },
        }
      : undefined,
  })

  for (const campaign of result.docs as CampaignDraft[]) {
    if (blocoDorText && blocoDorText === normalizeComparableRichText(campaign.blocoDor)) {
      throw new Error('blocoDor nao pode ser identico ao de outra campanha.')
    }

    if (blocoProvaText && blocoProvaText === normalizeComparableRichText(campaign.blocoProva)) {
      throw new Error('blocoProva nao pode ser identico ao de outra campanha.')
    }
  }
}

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  labels: {
    singular: 'Campanha',
    plural: 'Campanhas',
  },
  admin: {
    defaultColumns: ['campaignCode', 'slug', 'temLanding', 'status'],
    group: 'Conteudo',
    useAsTitle: 'campaignCode',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true

      return {
        status: {
          equals: 'publicada',
        },
      }
    },
  },
  hooks: {
    beforeValidate: [
      async ({ data, originalDoc, req }) => {
        const next = { ...(data || {}) } as CampaignDraft

        if (next.campaignCode) {
          next.campaignCode = next.campaignCode.trim().toUpperCase()
        }

        if (next.slug) {
          next.slug = normalizeSlug(next.slug)
        } else if (next.campaignCode) {
          next.slug = normalizeSlug(next.campaignCode)
        }

        const candidate = { ...(originalDoc || {}), ...next } as CampaignDraft

        if (candidate.status === 'publicada') {
          if (!candidate.temLanding) {
            throw new Error('Publicar campanha exige temLanding verdadeiro.')
          }

          if (!hasRenderableRichText(candidate.blocoDor)) {
            throw new Error('Publicar campanha exige blocoDor preenchido.')
          }

          if (!hasRenderableRichText(candidate.blocoProva)) {
            throw new Error('Publicar campanha exige blocoProva preenchido.')
          }

          if (!candidate.perguntas || candidate.perguntas.length < 2) {
            throw new Error('Publicar campanha exige ao menos 2 perguntas.')
          }

          if (candidate.perguntas.length > 4) {
            throw new Error('Publicar campanha permite no maximo 4 perguntas.')
          }

          if (candidate.campaignCode === 'TRAB-RESCISAO' && candidate.perguntas[0]?.tipo !== 'data') {
            throw new Error('TRAB-RESCISAO exige que a primeira pergunta seja do tipo data.')
          }

          await assertNoDuplicateLandingText({ candidate, req })
        }

        return next
      },
    ],
  },
  fields: [
    {
      name: 'campaignCode',
      type: 'text',
      admin: {
        description: campaignCodeDescription,
      },
      required: true,
      unique: true,
      validate: (value: unknown) =>
        typeof value === 'string' && CAMPAIGN_CODE_REGEX.test(value.trim().toUpperCase())
          ? true
          : 'Use o codigo criado no EspoCRM, como PREV-BPC.',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'temLanding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'titulo',
      type: 'text',
    },
    {
      name: 'subtitulo',
      type: 'textarea',
    },
    {
      name: 'midiaTopo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'blocoDor',
      type: 'richText',
    },
    {
      name: 'blocoProva',
      type: 'richText',
    },
    {
      name: 'perguntas',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'pergunta',
          type: 'text',
          required: true,
        },
        {
          name: 'tipo',
          type: 'select',
          defaultValue: 'texto',
          options: [
            { label: 'Texto', value: 'texto' },
            { label: 'Data', value: 'data' },
            { label: 'Opcoes', value: 'opcoes' },
          ],
          required: true,
        },
        {
          name: 'opcoes',
          type: 'array',
          fields: [
            {
              name: 'opcao',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'mensagemWhatsapp',
      type: 'textarea',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'titulo',
          type: 'text',
        },
        {
          name: 'descricao',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'rascunho',
      options: [
        { label: 'Rascunho', value: 'rascunho' },
        { label: 'Publicada', value: 'publicada' },
      ],
      required: true,
    },
  ],
}
