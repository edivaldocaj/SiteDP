export type BlogArticle = {
  author: string
  category: string
  coverImage?: string
  date: string
  excerpt: string
  readingTime: string
  slug: string
  summary: string[]
  title: string
}

export const blogArticles: BlogArticle[] = []
