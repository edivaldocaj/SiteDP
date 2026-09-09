import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { siteContentBaseline } from './site-content-baseline'

async function run() {
  const payload = await getPayload({ config: await configPromise })
  const cms = payload as any
  const current = await cms.findGlobal({ slug: 'site-content', overrideAccess: true })
  if ((current as { seedAplicado?: boolean }).seedAplicado) {
    payload.logger.info('Conteúdo do site já possui baseline; nenhuma edição foi sobrescrita')
    return
  }
  await cms.updateGlobal({ slug: 'site-content', data: siteContentBaseline, overrideAccess: true })
  payload.logger.info('Baseline de conteúdo do site criado')
}
void run().catch((error) => { console.error(error); process.exit(1) })
