import Image from 'next/image'
import type { Metadata } from 'next'
import React from 'react'

import {
  AreaCards,
  Container,
  CtaSection,
  Eyebrow,
  ProcessSteps,
  WhatsAppButton,
} from '@/components/Marketing'
import { BrandIcon } from '@/components/BrandIcons'
import { getSiteContent, iconName, listValues, mediaURL } from '@/lib/siteContent'

export const metadata: Metadata = {
  description:
    'Áreas de atuação da Deila Pinto Advocacia e Consultoria: Previdenciário, BPC/LOAS, Trabalho, Licitações e Contratos.',
  title: 'Áreas de Atuação',
}

export default async function AreasPage() {
  const content = await getSiteContent(); const page = content?.areas || {}
  const areaCards = listValues<any>(content?.paginasArea).map((area) => ({ description: area.descricao, href: `/areas-de-atuacao/${area.slug}`, icon: iconName(area.icone), shortTitle: area.chapeu, title: area.titulo }))
  const homeSteps = listValues<any>(page.processoEtapas).map((item) => ({ title: item.titulo, description: item.descricao }))
  return (
    <div className="site-shell areas-page">
      <section className="areas-hero" aria-labelledby="areas-title">
        <Container className="areas-hero-inner">
          <div>
            <Eyebrow>{page.heroChapeu}</Eyebrow>
            <h1 id="areas-title">{page.heroTitulo}</h1>
            <p>{page.heroTexto}</p>
          </div>
          <div className="areas-hero-art" aria-hidden="true">
            <Image
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={mediaURL(page.heroImagem) || ''}
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <AreaCards areas={areaCards} />
        </Container>
      </section>

      <section className="section-ivory">
        <Container className="about-editorial">
          <div className="about-photo">
            <Image
              alt="Dra. Deila Pinto"
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              src={mediaURL(page.editorialImagem) || ''}
              unoptimized
            />
          </div>
          <div className="about-copy">
            <Eyebrow>{page.editorialChapeu}</Eyebrow>
            <h2>{page.editorialTitulo}</h2>
            <p>{page.editorialTexto}</p>
            <div className="feature-row">
              {listValues<any>(page.destaques).map((item) => <span key={item.id || item.texto}><BrandIcon name={iconName(item.icone)} />{item.texto}</span>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-white">
        <Container>
          <Eyebrow>{page.processoChapeu}</Eyebrow>
          <ProcessSteps items={homeSteps} title={page.processoTitulo} />
          <div className="center-action">
            <WhatsAppButton>{page.cta?.botao}</WhatsAppButton>
          </div>
        </Container>
      </section>

      <CtaSection buttonLabel={page.cta?.botao} eyebrow={page.cta?.chapeu} text={page.cta?.texto} title={page.cta?.titulo || ''} />
    </div>
  )
}
