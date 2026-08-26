import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { BrandIcon } from '@/components/BrandIcons'
import { Container, Eyebrow, PageHero, WhatsAppButton } from '@/components/Marketing'
import { blogArticles } from '@/lib/blogContent'
import { blogCategories } from '@/lib/marketingContent'

export const metadata: Metadata = {
  description: 'Conteúdos jurídicos claros e atualizados para informar e orientar.',
  title: 'Blog',
}

export default function BlogPage() {
  const featured = blogArticles[0]
  const recent = blogArticles.slice(1)

  return (
    <div className="site-shell blog-page">
      <PageHero
        eyebrow="Informação que transforma"
        image="hero"
        label="blog-title"
        text="Conteúdos jurídicos claros e atualizados para informar e orientar."
        title="Blog"
      />

      <section className="section-white">
        <Container className="blog-layout">
          <aside className="blog-sidebar">
            <h2>Categorias</h2>
            <div className="blog-categories">
              {blogCategories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <div className="mini-cta">
              <BrandIcon name="phone" />
              <h3>Precisa de orientação?</h3>
              <p>Use o WhatsApp para iniciar uma conversa sobre sua situação.</p>
              <WhatsAppButton />
            </div>
          </aside>

          <div className="blog-main">
            <form className="search-box" action="/blog">
              <label className="sr-only" htmlFor="blog-search">
                Buscar artigos
              </label>
              <input id="blog-search" name="q" placeholder="Buscar artigos, temas ou palavras-chave..." />
              <button aria-label="Buscar" type="submit">
                <BrandIcon name="search" />
              </button>
            </form>

            {featured ? (
              <article className="featured-article">
                <Eyebrow>Artigo em destaque</Eyebrow>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <Link href={`/blog/${featured.slug}`}>Ler artigo completo →</Link>
              </article>
            ) : (
              <div className="empty-state">
                <Eyebrow>Blog</Eyebrow>
                <h2>Conteúdo em preparação.</h2>
                <p>
                  A página já está preparada para receber artigos reais, categorias,
                  busca e artigos relacionados sem publicar conteúdo fictício.
                </p>
              </div>
            )}

            {recent.length ? (
              <div className="article-grid">
                {recent.map((article) => (
                  <article className="article-card" key={article.slug}>
                    <span>{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`}>Ler mais →</Link>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </div>
  )
}
