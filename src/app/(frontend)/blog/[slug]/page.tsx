import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { FaqAccordion } from '@/components/FaqAccordion'
import { BrandIcon } from '@/components/BrandIcons'
import { Container, Eyebrow, WhatsAppButton } from '@/components/Marketing'
import { blogArticles } from '@/lib/blogContent'

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = blogArticles.find((item) => item.slug === slug)

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    description: article.excerpt,
    title: article.title,
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const article = blogArticles.find((item) => item.slug === slug)

  if (!article) notFound()

  return (
    <article className="site-shell article-page">
      <Container className="article-layout">
        <aside className="article-summary">
          <Eyebrow>Sumário</Eyebrow>
          {article.summary.map((item, index) => (
            <a href={`#secao-${index + 1}`} key={item}>
              {String(index + 1).padStart(2, '0')}. {item}
            </a>
          ))}
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
            <BrandIcon name="document" />
          </div>
          <p>
            Este espaço está pronto para conteúdo editorial revisado e aprovado antes
            da publicação.
          </p>
          <section id="secao-1">
            <h2>Conteúdo em preparação</h2>
            <p>O artigo será exibido aqui quando houver conteúdo real cadastrado.</p>
          </section>
          <FaqAccordion items={[{ question: 'Como esse artigo será publicado?', answer: 'A publicação deve partir de conteúdo real revisado pelo escritório.' }]} />
        </div>
      </Container>
    </article>
  )
}
