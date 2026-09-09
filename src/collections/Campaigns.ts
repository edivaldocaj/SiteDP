import type { CollectionConfig, PayloadRequest } from 'payload'

import { CAMPAIGN_CODE_REGEX } from '../lib/integration/constants'
import { getVideoEmbedUrl } from '../lib/campaignVideo'
import { hasRenderableRichText, richTextToPlainText } from '../lib/richText'

const campaignCodeDescription = 'Código criado primeiro no EspoCRM. Copie de lá.'

export const CAMPAIGN_PRESENTATION_DEFAULTS = {
  blocoDorTitulo: 'Entenda a situação',
  blocoProvaTitulo: 'O que ajuda na análise',
  blocoOrientacaoTitulo: 'Como podemos orientar',
  videoEyebrow: 'Conteúdo da campanha',
  videoTitulo: 'Uma explicação rápida para começar',
  videoDescricao: 'Veja a explicação e anote suas dúvidas para conversar com a equipe.',
  faqEyebrow: 'Dúvidas comuns',
  faqTitulo: 'Perguntas frequentes',
  faqDescricao: 'As respostas são gerais. A análise do seu caso depende das informações e documentos apresentados.',
  notaCuidado: 'Uma conversa para entender sua necessidade. Cada caso passa por análise individual.',
  etapasContato: [
    { titulo: 'Escolha como conversar' },
    { titulo: 'Conte apenas o essencial' },
    { titulo: 'Receba orientação da equipe' },
  ],
  ctaFormulario: 'Solicitar atendimento',
  ctaWhatsapp: 'Abrir WhatsApp',
  formularioTituloWhatsapp: 'Conte o que aconteceu pelo WhatsApp',
  formularioTextoWhatsapp: 'Informe apenas o essencial para a primeira conversa. A equipe orientará os próximos passos.',
  triagemEyebrow: 'Triagem inicial',
  triagemTitulo: 'Perguntas desta campanha',
  triagemVaziaTitulo: 'Comece pelo WhatsApp',
  triagemVaziaTexto: 'O atendimento fará as perguntas necessárias conforme o relato enviado.',
} as const

/** Baseline for an idempotent content migration. Merge only missing fields. */
export const CAMPAIGN_EDITORIAL_BASELINE = {
  'PREV-EXIGENCIA': 'previdenciario',
  'PREV-BPC': 'assistencial',
  'PREV-RURAL': 'previdenciario',
  'PREV-INCAPACIDADE': 'previdenciario',
  'TRAB-RESCISAO': 'trabalhista',
  'PREV-PENSAO': 'previdenciario',
  'PREV-MATERNIDADE': 'previdenciario',
  'TRAB-HORAS': 'trabalhista',
  'TRAB-JUSTACAUSA': 'trabalhista',
  'TRAB-INDIRETA': 'trabalhista',
  'TRAB-INSALUBRE': 'trabalhista',
  'PREV-REVISAO': 'previdenciario',
} as const

export const CAMPAIGN_EDITORIAL_BASELINE_WITH_PRESENTATION = Object.fromEntries(
  Object.entries(CAMPAIGN_EDITORIAL_BASELINE).map(([campaignCode, categoria]) => [campaignCode, {
    categoria,
    apresentacao: CAMPAIGN_PRESENTATION_DEFAULTS,
  }]),
)

type CampaignDraft = {
  blocoDor?: unknown
  blocoOrientacao?: unknown
  blocoProva?: unknown
  campaignCode?: string
  categoria?: string
  id?: string | number
  perguntas?: Array<{ tipo?: string | null }>
  slug?: string
  status?: string
  temLanding?: boolean
  videoUrl?: string
}

function validateVideoUrl(value: unknown) {
  if (value == null || value === '') return true
  return getVideoEmbedUrl(value) ? true : 'Use o link HTTPS de um vídeo do YouTube ou Vimeo.'
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
    req,
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
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      required: true,
      defaultValue: 'previdenciario',
      options: [
        { label: 'Previdenciário', value: 'previdenciario' },
        { label: 'Assistencial', value: 'assistencial' },
        { label: 'Trabalhista', value: 'trabalhista' },
        { label: 'Licitações e Contratos', value: 'licitacoes' },
      ],
      admin: { description: 'Categoria editorial exibida na listagem e na landing.' },
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
      name: 'apresentacao',
      label: 'Apresentação da campanha',
      type: 'group',
      fields: [
        { name: 'blocoDorTitulo', label: 'Título do bloco de situação', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.blocoDorTitulo },
        { name: 'blocoProvaTitulo', label: 'Título do bloco de análise', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.blocoProvaTitulo },
        { name: 'blocoOrientacaoTitulo', label: 'Título do bloco de orientação', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.blocoOrientacaoTitulo },
        { name: 'videoEyebrow', label: 'Etiqueta do vídeo', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.videoEyebrow },
        { name: 'videoTitulo', label: 'Título do vídeo', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.videoTitulo },
        { name: 'videoDescricao', label: 'Descrição do vídeo', type: 'textarea', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.videoDescricao },
        { name: 'faqEyebrow', label: 'Etiqueta do FAQ', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.faqEyebrow },
        { name: 'faqTitulo', label: 'Título do FAQ', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.faqTitulo },
        { name: 'faqDescricao', label: 'Descrição do FAQ', type: 'textarea', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.faqDescricao },
        { name: 'notaCuidado', label: 'Nota de cuidado', type: 'textarea', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.notaCuidado },
        { name: 'etapasContato', label: 'Etapas do primeiro contato', type: 'array', maxRows: 3, defaultValue: [...CAMPAIGN_PRESENTATION_DEFAULTS.etapasContato], fields: [{ name: 'titulo', label: 'Título da etapa', type: 'text', required: true }] },
        { name: 'ctaFormulario', label: 'Botão do formulário', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.ctaFormulario },
        { name: 'ctaWhatsapp', label: 'Botão do WhatsApp', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.ctaWhatsapp },
        { name: 'formularioTituloWhatsapp', label: 'Título do cartão WhatsApp', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.formularioTituloWhatsapp },
        { name: 'formularioTextoWhatsapp', label: 'Texto do cartão WhatsApp', type: 'textarea', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.formularioTextoWhatsapp },
        { name: 'triagemEyebrow', label: 'Etiqueta da triagem', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.triagemEyebrow },
        { name: 'triagemTitulo', label: 'Título da triagem', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.triagemTitulo },
        { name: 'triagemVaziaTitulo', label: 'Título sem perguntas', type: 'text', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.triagemVaziaTitulo },
        { name: 'triagemVaziaTexto', label: 'Texto sem perguntas', type: 'textarea', defaultValue: CAMPAIGN_PRESENTATION_DEFAULTS.triagemVaziaTexto },
        { name: 'midiaFallback', label: 'Imagem fallback', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image/' } } },
        { name: 'seloMarca', label: 'Selo da marca', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image/' } } },
      ],
    },
    {
      name: 'midiaTopo',
      label: 'Imagem principal da campanha',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image/' } },
    },
    {
      name: 'blocoDor',
      label: 'Entenda a situação',
      type: 'richText',
    },
    {
      name: 'blocoProva',
      label: 'O que ajuda na análise',
      type: 'richText',
    },
    {
      name: 'blocoOrientacao',
      label: 'Como podemos orientar',
      type: 'richText',
      admin: {
        description: 'Como a equipe pode orientar a análise inicial, sem prometer resultado.',
      },
    },
    {
      name: 'videoUrl',
      label: 'Link do vídeo (YouTube ou Vimeo)',
      type: 'text',
      admin: {
        description: 'Link opcional de vídeo do YouTube ou Vimeo para a campanha.',
      },
      validate: validateVideoUrl,
    },
    {
      name: 'videoFile',
      label: 'Vídeo por upload',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'video/' } },
      admin: {
        description: 'Vídeo curto em MP4. Se preenchido, aparece no bloco de vídeo da página.',
      },
    },
    {
      name: 'textoUrgencia',
      label: 'Aviso sobre prazo ou documento',
      type: 'text',
      admin: {
        description: 'Aviso objetivo sobre prazo ou documento. Evite pressão artificial.',
      },
    },
    {
      name: 'mostrarFormulario',
      label: 'Exibir formulário',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Exibe o formulário de primeiro contato nesta campanha.',
      },
    },
    {
      name: 'faq',
      label: 'Perguntas frequentes da página',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Dúvidas frequentes específicas desta campanha.',
      },
      fields: [
        {
          name: 'pergunta',
          type: 'text',
          required: true,
        },
        {
          name: 'resposta',
          type: 'textarea',
          required: true,
        },
      ],
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
