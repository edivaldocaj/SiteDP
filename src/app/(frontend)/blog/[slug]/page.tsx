import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import { BrandIcon } from '@/components/BrandIcons'
import { CampaignRichText } from '@/components/CampaignRichText'
import { Container, Eyebrow, WhatsAppButton } from '@/components/Marketing'
import { getPublishedArticleBySlug } from '@/lib/blogContent'

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>
}

function getMediaUrl(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const media = value as { url?: string | null }
  return media.url || null
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    description: article.excerpt,
    openGraph: {
      description: article.excerpt,
      title: article.title,
      ...(getMediaUrl(article.coverImage) ? { images: [getMediaUrl(article.coverImage)!] } : {}),
    },
    title: article.title,
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) notFound()

  return (
    <article className="site-shell article-page">
      <Container className="article-layout">
        <aside className="article-summary">
          <Eyebrow>Sumário</Eyebrow>
          <span>Conteúdo completo</span>
          <div className="mini-cta">
            <BrandIcon name="phone" />
            <h3>Precisa de ajuda?</h3>
            <p>Fale pelo WhatsApp para iniciar uma conversa.</p>
            <WhatsAppButton />
          </div>
        </aside>
        <div className="article-content">
          <Eyebrow>{article.category}</Eyebrow>
          <h1>{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-meta">
            <span>{article.author}</span>
            <span>{article.date}</span>
            <span>{article.readingTime}</span>
          </div>
          <div className="article-cover" aria-hidden="true">
            {getMediaUrl(article.coverImage) ? (
              <Image alt="" fill sizes="(max-width: 900px) 92vw, 760px" src={getMediaUrl(article.coverImage)!} />
            ) : <BrandIcon name="document" />}
          </div>
          <div className="article-body"><CampaignRichText value={article.body} /></div>
        </div>
      </Container>
    </article>
  )
}
