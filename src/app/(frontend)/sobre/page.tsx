import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import {
  AreaCards,
  Container,
  CtaSection,
  Eyebrow,
  OutlineButton,
  PageHero,
  ProcessSteps,
  ServiceGrid,
  WhatsAppButton,
} from '@/components/Marketing'
import { getSiteContent, iconName, listValues, mediaURL } from '@/lib/siteContent'

export const metadata: Metadata = {
  description: 'Conheça a atuação da Deila Pinto Advocacia e Consultoria.',
  title: 'Sobre',
}

export default async function SobrePage() {
  const content = await getSiteContent(); const page = content?.sobre || {}
  const areas = listValues<any>(content?.paginasArea).map((area) => ({ description: area.descricao, href: `/areas-de-atuacao/${area.slug}`, icon: iconName(area.icone), shortTitle: area.chapeu, title: area.titulo }))
  const values = listValues<any>(page.valores).map((item) => ({ title: item.titulo, description: item.descricao, icon: iconName(item.icone) }))
  const institutionalSteps = listValues<any>(page.processoEtapas).map((item) => ({ title: item.titulo, description: item.descricao }))
  return (
    <div className="site-shell about-page">
      <PageHero
        eyebrow={page.heroChapeu}
        label="sobre-title"
        imageSrc={mediaURL(page.heroImagem)}
        text={page.heroTexto}
        title={page.heroTitulo}
      />

      <section className="section-white">
        <Container className="about-editorial">
          <div className="about-photo">
            <Image
              alt="Dra. Deila Pinto"
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              src={mediaURL(page.bioImagem) || ''}
              unoptimized
            />
          </div>
          <div className="about-copy">
            <Eyebrow>{page.bioChapeu}</Eyebrow>
            <h2>{page.bioTitulo}</h2>
            {listValues<any>(page.bioParagrafos).map((item) => <p key={item.id || item.texto}>{item.texto}</p>)}
            <div className="actions">
              <WhatsAppButton>{page.cta?.botao}</WhatsAppButton>
              <OutlineButton href="/contato">{page.bioBotaoSecundario}</OutlineButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ivory">
        <Container>
          <div className="section-title">
            <Eyebrow>{page.valoresChapeu}</Eyebrow>
            <h2>{page.valoresTitulo}</h2>
          </div>
          <ServiceGrid items={values} />
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <Eyebrow>{page.processoChapeu}</Eyebrow>
          <ProcessSteps items={institutionalSteps} title={page.processoTitulo} />
        </Container>
      </section>

      <section className="section-ivory">
        <Container>
          <div className="section-heading">
            <div>
              <Eyebrow>{page.areasChapeu}</Eyebrow>
              <h2>{page.areasTitulo}</h2>
            </div>
            <OutlineButton href="/areas-de-atuacao">{page.areasBotao}</OutlineButton>
          </div>
          <AreaCards areas={areas} compact />
        </Container>
      </section>

      <CtaSection buttonLabel={page.cta?.botao} eyebrow={page.cta?.chapeu} text={page.cta?.texto} title={page.cta?.titulo || ''} />
    </div>
  )
}
