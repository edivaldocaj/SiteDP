import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { campaigns, richTextFromText } from './campaign-content.mjs'

type CampaignContent = (typeof campaigns)[number]

function campaignData(campaign: CampaignContent) {
  return {
    campaignCode: campaign.campaignCode,
    mensagemWhatsapp: campaign.mensagemWhatsapp,
    slug: campaign.slug,
    status: campaign.status,
    temLanding: campaign.temLanding,
    ...(campaign.temLanding
      ? {
          blocoDor: richTextFromText(campaign.blocoDor),
          blocoProva: richTextFromText(campaign.blocoProva),
          perguntas: campaign.perguntas,
          seo: campaign.seo,
          subtitulo: campaign.subtitulo,
          titulo: campaign.titulo,
        }
      : {}),
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

    const data = campaignData(campaign)

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
