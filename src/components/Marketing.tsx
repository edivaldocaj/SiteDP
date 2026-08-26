import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { areaSummaries } from '@/lib/marketingContent'

import { BrandIcon, type BrandIconName } from './BrandIcons'
import { WhatsAppIcon } from './WhatsAppIcon'

type HeroProps = {
  actions?: React.ReactNode
  children?: React.ReactNode
  eyebrow: string
  image?: 'hero' | 'livro' | 'perfil'
  imageAlt?: string
  label?: string
  splitTitle?: { accent: string; after?: string; before: string }
  text: string
  title: string
}

type CardItem = {
  description: string
  href?: string
  icon: BrandIconName
  title: string
}

const imageMap = {
  hero: '/imagens/deila/deila-hero.webp',
  livro: '/imagens/deila/deila-livro.webp',
  perfil: '/imagens/deila/deila-perfil.webp',
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`.trim()}>{children}</div>
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function WhatsAppButton({
  children = 'Fale comigo no WhatsApp',
  className = '',
  href = '/ir/whatsapp',
}: {
  children?: React.ReactNode
  className?: string
  href?: string
}) {
  return (
    <Link className={`button button-primary button-whatsapp ${className}`.trim()} href={href}>
      <WhatsAppIcon />
      {children}
    </Link>
  )
}

export function OutlineButton({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  return (
    <Link className="button button-secondary" href={href}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

export function PageHero({
  actions,
  children,
  eyebrow,
  image = 'hero',
  imageAlt = 'Dra. Deila Pinto',
  label,
  splitTitle,
  text,
  title,
}: HeroProps) {
  return (
    <section className="page-hero" aria-labelledby={label || 'page-title'}>
      <Container className="page-hero-inner">
        <div className="page-hero-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id={label || 'page-title'}>
            {splitTitle ? (
              <>
                {splitTitle.before} <span>{splitTitle.accent}</span>
                {splitTitle.after ? <> {splitTitle.after}</> : null}
              </>
            ) : (
              title
            )}
          </h1>
          <p>{text}</p>
          {actions ? <div className="actions">{actions}</div> : null}
          {children}
        </div>
        <div className="page-hero-media" aria-hidden={imageAlt ? undefined : true}>
          <Image
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            src={imageMap[image]}
            unoptimized
          />
        </div>
      </Container>
    </section>
  )
}

export function SectionHeading({
  align = 'center',
  eyebrow,
  lead,
  title,
}: {
  align?: 'center' | 'left'
  eyebrow: string
  lead?: string
  title: string
}) {
  return (
    <div className={`section-title section-title-${align}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  )
}

export function AreaCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`area-grid ${compact ? 'area-grid-compact' : ''}`.trim()}>
      {areaSummaries.map((area) => (
        <Link className="area-card" href={area.href} key={area.href}>
          <BrandIcon name={area.icon} />
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <span>Saiba mais →</span>
        </Link>
      ))}
    </div>
  )
}

export function ServiceGrid({ items }: { items: CardItem[] }) {
  return (
    <div className="service-grid">
      {items.map((item) => {
        const content = (
          <>
            <BrandIcon name={item.icon} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>Saiba mais →</span>
            </div>
          </>
        )

        return item.href ? (
          <Link className="service-card" href={item.href} key={item.title}>
            {content}
          </Link>
        ) : (
          <article className="service-card" key={item.title}>
            {content}
          </article>
        )
      })}
    </div>
  )
}

export function ProcessSteps({
  items,
  title,
}: {
  items: Array<{ description: string; title: string }>
  title?: string
}) {
  return (
    <div className="process-block">
      {title ? <h2>{title}</h2> : null}
      <div className="process-steps">
        {items.map((item, index) => (
          <article className="process-step" key={item.title}>
            <span>{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function CtaSection({
  eyebrow = 'Contato',
  text = 'Atendimento online para todo o Brasil.',
  title,
}: {
  eyebrow?: string
  text?: string
  title: string
}) {
  return (
    <section className="cta-band">
      <Container className="cta-inner">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <WhatsAppButton />
      </Container>
    </section>
  )
}

export function Breadcrumb({ current, parent = 'Áreas de Atuação' }: { current: string; parent?: string }) {
  return (
    <nav className="breadcrumb" aria-label="Caminho da página">
      <Link href="/">Início</Link>
      <span aria-hidden="true">›</span>
      <Link href="/areas-de-atuacao">{parent}</Link>
      <span aria-hidden="true">›</span>
      <span>{current}</span>
    </nav>
  )
}
