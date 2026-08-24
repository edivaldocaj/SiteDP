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
            width={284}
          />
        </Link>
        <nav aria-label="Navegacao principal">
          <a href="#orientacao">Orientacao</a>
          <a href="#contato">Contato</a>
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
          <div className="actions">
            <a className="button button-primary" href="/ir/whatsapp">
              Abrir WhatsApp
            </a>
            <a className="button button-secondary" href="#contato">
              Ver contato
            </a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <Image alt="" height={420} priority src="/marca/dp-vertical.png" width={420} />
        </div>
      </section>

      <section className="band dark-band" id="orientacao" aria-labelledby="titulo-orientacao">
        <div className="section-inner">
          <p className="eyebrow">Orientacao</p>
          <h2 id="titulo-orientacao">Informacao clara para uma primeira conversa.</h2>
          <div className="principles">
            <article>
              <span>01</span>
              <h3>Escuta inicial</h3>
              <p>O relato e recebido para entender o contexto antes de qualquer encaminhamento.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Analise tecnica</h3>
              <p>Documentos e datas ajudam a verificar quais caminhos podem ser avaliados.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Comunicação simples</h3>
              <p>As proximas etapas sao explicadas com cuidado, conforme as particularidades do caso.</p>
            </article>
          </div>
          <a className="button button-gold" href="/ir/whatsapp">
            Abrir WhatsApp
          </a>
        </div>
      </section>

      <section className="band light-band" id="contato" aria-labelledby="titulo-contato">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 id="titulo-contato">Entenda se o atendimento se aplica ao seu caso.</h2>
          </div>
          <div className="contact-panel">
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
          width={240}
        />
        <p>Publicidade advocaticia informativa.</p>
      </footer>
    </div>
  )
}
