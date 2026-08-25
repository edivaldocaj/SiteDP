import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { siteTexts } from './campaign-content.mjs'

async function run() {
  const config = await configPromise
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-config',
    data: siteTexts as never,
    overrideAccess: true,
  })

  payload.logger.info('Textos globais do SiteConfig sincronizados')
}

void run().catch((error) => {
  console.error(error)
  process.exit(1)
})
