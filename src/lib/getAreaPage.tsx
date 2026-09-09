import React from 'react'
import { BrandIcon } from '@/components/BrandIcons'
import { Container, Eyebrow } from '@/components/Marketing'
import { getSiteContent, iconName, listValues, textValue, type ContentCard, type ContentFaq, type ContentStep } from './siteContent'

const cards = (value: unknown) => listValues<ContentCard>(value).map((item) => ({ description: textValue(item.descricao), icon: iconName(item.icone), title: textValue(item.titulo) }))
const steps = (value: unknown) => listValues<ContentStep>(value).map((item) => ({ description: textValue(item.descricao), title: textValue(item.titulo) }))
const faqs = (value: unknown) => listValues<ContentFaq>(value).map((item) => ({ answer: textValue(item.resposta), question: textValue(item.pergunta) }))

export async function getAreaPageProps(slug: string) {
  const content = await getSiteContent()
  const page = listValues<any>(content?.paginasArea).find((item) => item.slug === slug)
  if (!page) return null
  const afterCards = page.situacoes?.length || page.documentos?.length ? <section className="section-ivory"><Container className="work-support"><div><Eyebrow>{page.extrasChapeu}</Eyebrow><div className="situation-list">{page.situacoes?.map((item: any) => <span key={item.texto}>{item.texto}</span>)}</div></div>{page.documentos?.length ? <div className="document-panel"><BrandIcon name="document" /><h2>{page.documentosTitulo}</h2><ul>{page.documentos.map((item: any) => <li key={item.texto}>{item.texto}</li>)}</ul></div> : null}</Container></section> : undefined
  return { accentTitle: page.tituloDestaque || undefined, afterCards, audience: cards(page.publicos), audienceTitle: page.publicoTitulo, cards: cards(page.servicos), ctaButton: page.cta?.botao, ctaEyebrow: page.cta?.chapeu, ctaText: page.cta?.texto, ctaTitle: page.cta?.titulo, description: page.descricao, eyebrow: page.chapeu, extrasEyebrow: page.extrasChapeu, extrasTitle: page.extrasTitulo, faq: faqs(page.faq), faqEyebrow: page.faqChapeu, faqTitle: page.faqTitulo, heroIcon: iconName(page.icone), heroNote: page.notaHero, processEyebrow: page.processoChapeu, processItems: steps(page.processoEtapas), processTitle: page.processoTitulo, services: cards(page.extras), servicesEyebrow: page.servicosChapeu, servicesTitle: page.servicosTitulo, title: page.titulo }
}
