import Image from 'next/image'
import { notFound } from 'next/navigation'

const colors = [
  ['--preto', '#0a0a0a', 'Texto principal'],
  ['--preto-suave', '#161616', 'Faixas escuras'],
  ['--papel', '#faf8f3', 'Fundo padrao'],
  ['--creme', '#f5f1e8', 'Texto sobre escuro'],
  ['--ouro', '#c9a961', 'Acento sobre escuro'],
  ['--ouro-escuro', '#8a7339', 'Titulo grande sobre claro'],
  ['--ouro-claro', '#e8c976', 'Realce sobre escuro'],
]

const logos = [
  ['dp-horizontal.png', 'Horizontal sobre fundo claro'],
  ['dp-vertical.png', 'Vertical sobre fundo claro'],
  ['dp-horizontal-claro.png', 'Horizontal sobre fundo escuro'],
  ['dp-vertical-claro.png', 'Vertical sobre fundo escuro'],
  ['dp-simbolo.png', 'Simbolo sobre fundo escuro'],
]

export default function StyleGuidePage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <div className="style-page">
      <header className="style-hero">
        <p className="eyebrow">Identidade visual</p>
        <h1>Escala, contraste e marca</h1>
        <p>
          Rota local para revisar tokens, tipografia e arquivos oficiais da marca antes
          de publicar novas paginas.
        </p>
      </header>

      <section className="style-section" aria-labelledby="cores">
        <h2 id="cores">Cores</h2>
        <div className="swatch-grid">
          {colors.map(([token, value, usage]) => (
            <article className="swatch" key={token}>
              <span style={{ backgroundColor: value }} />
              <strong>{token}</strong>
              <code>{value}</code>
              <p>{usage}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="style-section" aria-labelledby="tipografia">
        <h2 id="tipografia">Tipografia</h2>
        <div className="type-scale">
          <div>
            <span>H1</span>
            <p className="sample-h1">Titulo principal</p>
          </div>
          <div>
            <span>H2</span>
            <p className="sample-h2">Secao de conteudo</p>
          </div>
          <div>
            <span>Corpo</span>
            <p>
              Texto com 18px, altura de linha ampla e contraste alto para leitura em
              telefone antigo.
            </p>
          </div>
        </div>
      </section>

      <section className="style-section" aria-labelledby="logos">
        <h2 id="logos">Logos</h2>
        <div className="logo-grid">
          {logos.map(([file, label]) => (
            <article
              className={file.includes('claro') || file.includes('simbolo') ? 'logo-card dark' : 'logo-card'}
              key={file}
            >
              <Image alt={label} height={130} src={`/marca/${file}`} unoptimized width={280} />
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
