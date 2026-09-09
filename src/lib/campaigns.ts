export type CampaignQuestion = {
  id?: string | null
  opcoes?: Array<{ id?: string | null; opcao?: string | null }> | null
  pergunta?: string | null
  tipo?: 'texto' | 'data' | 'opcoes' | null
}

export type CampaignFaq = {
  id?: string | null
  pergunta?: string | null
  resposta?: string | null
}

export type PublicCampaign = {
  blocoDor?: unknown
  blocoOrientacao?: unknown
  blocoProva?: unknown
  campaignCode: string
  categoria?: 'previdenciario' | 'assistencial' | 'trabalhista' | 'licitacoes' | null
  faq?: CampaignFaq[] | null
  id: string | number
  apresentacao?: {
    blocoDorTitulo?: string | null
    blocoProvaTitulo?: string | null
    blocoOrientacaoTitulo?: string | null
    videoEyebrow?: string | null
    videoTitulo?: string | null
    videoDescricao?: string | null
    faqEyebrow?: string | null
    faqTitulo?: string | null
    faqDescricao?: string | null
    notaCuidado?: string | null
    etapasContato?: Array<{ titulo?: string | null }> | null
    ctaFormulario?: string | null
    ctaWhatsapp?: string | null
    formularioTituloWhatsapp?: string | null
    formularioTextoWhatsapp?: string | null
    triagemEyebrow?: string | null
    triagemTitulo?: string | null
    triagemVaziaTitulo?: string | null
    triagemVaziaTexto?: string | null
    midiaFallback?: unknown
    seloMarca?: unknown
  } | null
  mensagemWhatsapp?: string | null
  midiaTopo?: unknown
  perguntas?: CampaignQuestion[] | null
  mostrarFormulario?: boolean | null
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
  textoUrgencia?: string | null
  videoFile?: unknown
  videoUrl?: string | null
}

export function campaignCategoryLabel(category?: PublicCampaign['categoria'] | null) {
  if (category === 'assistencial') return 'Assistencial'
  if (category === 'trabalhista') return 'Trabalhista'
  if (category === 'licitacoes') return 'Licitações e Contratos'
  return 'Previdenciário'
}

export function getCampaignPresentation(campaign: PublicCampaign) {
  const p = campaign.apresentacao || {}
  return {
    blocoDorTitulo: p.blocoDorTitulo || 'Entenda a situação',
    blocoProvaTitulo: p.blocoProvaTitulo || 'O que ajuda na análise',
    blocoOrientacaoTitulo: p.blocoOrientacaoTitulo || 'Como podemos orientar',
    videoEyebrow: p.videoEyebrow || 'Conteúdo da campanha',
    videoTitulo: p.videoTitulo || 'Uma explicação rápida para começar',
    videoDescricao: p.videoDescricao || 'Veja a explicação e anote suas dúvidas para conversar com a equipe.',
    faqEyebrow: p.faqEyebrow || 'Dúvidas comuns',
    faqTitulo: p.faqTitulo || 'Perguntas frequentes',
    faqDescricao: p.faqDescricao || 'As respostas são gerais. A análise do seu caso depende das informações e documentos apresentados.',
    notaCuidado: p.notaCuidado || 'Uma conversa para entender sua necessidade. Cada caso passa por análise individual.',
    etapasContato: p.etapasContato?.length ? p.etapasContato : [{ titulo: 'Escolha como conversar' }, { titulo: 'Conte apenas o essencial' }, { titulo: 'Receba orientação da equipe' }],
    ctaFormulario: p.ctaFormulario || 'Solicitar atendimento',
    ctaWhatsapp: p.ctaWhatsapp || 'Abrir WhatsApp',
    formularioTituloWhatsapp: p.formularioTituloWhatsapp || 'Conte o que aconteceu pelo WhatsApp',
    formularioTextoWhatsapp: p.formularioTextoWhatsapp || 'Informe apenas o essencial para a primeira conversa. A equipe orientará os próximos passos.',
    triagemEyebrow: p.triagemEyebrow || 'Triagem inicial',
    triagemTitulo: p.triagemTitulo || 'Perguntas desta campanha',
    triagemVaziaTitulo: p.triagemVaziaTitulo || 'Comece pelo WhatsApp',
    triagemVaziaTexto: p.triagemVaziaTexto || 'O atendimento fará as perguntas necessárias conforme o relato enviado.',
    midiaFallback: p.midiaFallback,
    seloMarca: p.seloMarca,
  }
}

type CampaignPayload = {
  find: (args: {
    collection: string
    depth?: number
    limit: number
    overrideAccess?: boolean
    sort?: string
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

export async function getPublishedLandingCampaigns() {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) {
    return []
  }

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'campaigns',
      depth: 0,
      limit: 50,
      overrideAccess: true,
      sort: 'campaignCode',
      where: {
        and: [
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

    return result.docs
  } catch {
    return []
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
