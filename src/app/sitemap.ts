import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://deilapinto.com.br').replace(/\/$/, '')
const staticRoutes = ['/', '/sobre', '/areas-de-atuacao', '/campanhas', '/blog', '/contato', '/agendar']

function entry(path: string, lastModified?: string | Date): MetadataRoute.Sitemap[number] {
  return { url: `${siteUrl}${path}`, lastModified: lastModified ? new Date(lastModified) : new Date() }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = staticRoutes.map((route) => entry(route))
  try {
    const payload = (await getPayload({ config: configPromise })) as any
    const [posts, campaigns] = await Promise.all([
      payload.find({ collection: 'articles', where: { status: { equals: 'published' } }, limit: 1000, depth: 0 }),
      payload.find({ collection: 'campaigns', where: { status: { equals: 'active' } }, limit: 1000, depth: 0 }),
    ])
    for (const post of posts.docs) if (post.slug) routes.push(entry(`/blog/${post.slug}`, post.updatedAt))
    for (const campaign of campaigns.docs) if (campaign.slug) routes.push(entry(`/campanhas/${campaign.slug}`, campaign.updatedAt))
  } catch (error) {
    console.error('[sitemap] Falha ao buscar dados do Payload:', error)
  }
  return routes
}
