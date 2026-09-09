export type BlogArticle = {
  author: string
  category: string
  body: unknown
  coverImage?: unknown
  date: string
  excerpt: string
  readingTime: string
  slug: string
  title: string
}

type ArticlePayload = { find: (args: { collection: 'articles'; depth?: number; limit: number; overrideAccess?: boolean; sort?: string; where: Record<string, unknown> }) => Promise<{ docs: BlogArticle[] }> }

async function getPayload() {
  const { getPayloadClient } = await import('./integration/payload')
  return (await getPayloadClient()) as unknown as ArticlePayload
}

function publishedWhere(q?: string) {
  const status = { status: { equals: 'published' } }
  const query = q?.trim()
  if (!query) return status
  return { and: [status, { or: [{ title: { like: query } }, { excerpt: { like: query } }, { category: { like: query } }] }] }
}

export async function getPublishedArticles(q?: string) {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) return []
  try {
    const result = await (await getPayload()).find({ collection: 'articles', depth: 1, limit: 100, overrideAccess: true, sort: '-publishedAt', where: publishedWhere(q) })
    return result.docs
  } catch { return [] }
}

export async function getPublishedArticleBySlug(slug: string) {
  if (!process.env.DATABASE_URI || !process.env.EXPECTED_DB_NAME) return null
  try {
    const result = await (await getPayload()).find({ collection: 'articles', depth: 1, limit: 1, overrideAccess: true, where: { and: [publishedWhere(), { slug: { equals: slug } }] } })
    return result.docs[0] || null
  } catch { return null }
}

export async function getPublishedArticleCategories() {
  return [...new Set((await getPublishedArticles()).map((article) => article.category).filter(Boolean))]
}
