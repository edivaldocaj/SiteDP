import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import './styles.css'

export default async function HomePage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Pagina inicial">
          <Image
            alt="Marca do escritorio"
            height={64}
            priority
            src="/marca/dp-horizontal.png"
            unoptimized
            width={284}
          />
        </Link>
        <nav aria-label="Navegacao principal">
          <a href="#orientacao">Orientacao</a>
          <a href="#contato">Contato</a>
          <a className="nav-action" href="/ir/whatsapp">
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="titulo-home">
        <div className="hero-copy">
          <p className="eyebrow">Advocacia e consultoria</p>
          <h1 id="titulo-home">Vamos conversar sobre o seu direito?</h1>
          <p>
            Cada caso e unico. O primeiro contato pode ser feito de forma simples e
            com linguagem clara.
          </p>
          <div className="hero-tags" aria-label="Pontos do atendimento">
            <span>Escuta inicial</span>
            <span>Analise tecnica</span>
            <span>Comunicação simples</span>
          </div>
          <div className="actions">
            <a className="button button-primary" href="/ir/whatsapp">
              Abrir WhatsApp
            </a>
            <a className="button button-secondary" href="#contato">
              Ver contato
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <Image
            alt=""
            className="hero-photo"
            height={900}
            priority
            src="/imagens/hero-consultoria-dp.webp"
            unoptimized
            width={1350}
          />
          <div className="hero-visual-badge">
            <Image alt="" height={92} src="/marca/dp-simbolo.png" unoptimized width={92} />
          </div>
        </div>
      </section>

      <section className="feature-rail" aria-label="Resumo do atendimento">
        <article>
          <span>01</span>
          <strong>Primeiro contato acessivel</strong>
        </article>
        <article>
          <span>02</span>
          <strong>Leitura cuidadosa do caso</strong>
        </article>
        <article>
          <span>03</span>
          <strong>Proximas etapas explicadas com clareza</strong>
        </article>
      </section>

      <section className="band dark-band" id="orientacao" aria-labelledby="titulo-orientacao">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Orientacao</p>
            <h2 id="titulo-orientacao">Informacao clara para uma primeira conversa.</h2>
          </div>
          <div className="principles">
            <article className="principle-large">
              <span>Escuta</span>
              <h3>O relato vem primeiro.</h3>
              <p>O contexto do caso orienta quais documentos e caminhos podem ser avaliados.</p>
            </article>
            <article>
              <span>Documentos</span>
              <h3>Organizacao desde o inicio.</h3>
              <p>Datas, comprovantes e historico ajudam a tornar a conversa mais objetiva.</p>
            </article>
            <article>
              <span>Clareza</span>
              <h3>Sem excesso de formalidade.</h3>
              <p>As proximas etapas sao explicadas conforme as particularidades da situacao.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band light-band" id="contato" aria-labelledby="titulo-contato">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 id="titulo-contato">Entenda se o atendimento se aplica ao seu caso.</h2>
            <p className="section-copy">
              O WhatsApp e o caminho mais simples para iniciar a conversa.
            </p>
          </div>
          <div className="contact-panel">
            <Image
              alt=""
              height={76}
              src="/marca/dp-simbolo.png"
              unoptimized
              width={76}
            />
            <p>Use o WhatsApp para iniciar uma conversa sobre a sua situacao.</p>
            <a className="button button-primary" href="/ir/whatsapp">
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <Image
          alt="Marca do escritorio"
          height={54}
          src="/marca/dp-horizontal-claro.png"
          unoptimized
          width={240}
        />
        <p>Publicidade advocaticia informativa.</p>
      </footer>
    </div>
  )
}
