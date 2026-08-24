import configPromise from '@payload-config'
import { getPayload } from 'payload'

type CampaignSeed = {
  campaignCode: string
  slug: string
  temLanding: boolean
}

const placeholder = '[A FORNECER]'

const campaigns: CampaignSeed[] = [
  { campaignCode: 'PREV-EXIGENCIA', slug: 'prev-exigencia', temLanding: false },
  { campaignCode: 'PREV-BPC', slug: 'prev-bpc', temLanding: true },
  { campaignCode: 'PREV-RURAL', slug: 'prev-rural', temLanding: true },
  { campaignCode: 'PREV-INCAPACIDADE', slug: 'prev-incapacidade', temLanding: false },
  { campaignCode: 'TRAB-RESCISAO', slug: 'trab-rescisao', temLanding: true },
  { campaignCode: 'PREV-PENSAO', slug: 'prev-pensao', temLanding: false },
  { campaignCode: 'PREV-MATERNIDADE', slug: 'prev-maternidade', temLanding: false },
  { campaignCode: 'TRAB-HORAS', slug: 'trab-horas', temLanding: false },
  { campaignCode: 'TRAB-JUSTACAUSA', slug: 'trab-justacausa', temLanding: false },
  { campaignCode: 'TRAB-INDIRETA', slug: 'trab-indireta', temLanding: false },
  { campaignCode: 'TRAB-INSALUBRE', slug: 'trab-insalubre', temLanding: false },
  { campaignCode: 'PREV-REVISAO', slug: 'prev-revisao', temLanding: false },
]

function richTextPlaceholder() {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: placeholder,
              type: 'text',
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function landingPlaceholders(campaignCode: string) {
  const firstQuestionType = campaignCode === 'TRAB-RESCISAO' ? 'data' : 'texto'

  return {
    blocoDor: richTextPlaceholder(),
    blocoProva: richTextPlaceholder(),
    mensagemWhatsapp: placeholder,
    perguntas: [
      {
        pergunta: placeholder,
        tipo: firstQuestionType,
      },
      {
        pergunta: placeholder,
        tipo: 'texto',
      },
    ],
    seo: {
      descricao: placeholder,
      titulo: placeholder,
    },
    subtitulo: placeholder,
    titulo: placeholder,
  }
}

async function run() {
  const config = await configPromise
  const payload = await getPayload({ config })

  for (const campaign of campaigns) {
    const existing = await payload.find({
      collection: 'campaigns',
      limit: 1,
      overrideAccess: true,
      where: {
        campaignCode: {
          equals: campaign.campaignCode,
        },
      },
    })

    const data = {
      campaignCode: campaign.campaignCode,
      slug: campaign.slug,
      status: 'rascunho' as const,
      temLanding: campaign.temLanding,
      ...(campaign.temLanding ? landingPlaceholders(campaign.campaignCode) : {}),
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'campaigns',
        data: data as never,
        id: existing.docs[0].id,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'campaigns',
        data: data as never,
        overrideAccess: true,
      })
    }
  }

  payload.logger.info(`Campanhas sincronizadas: ${campaigns.length}`)
}

void run().catch((error) => {
  console.error(error)
  process.exit(1)
})
