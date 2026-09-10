import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, Eyebrow, WhatsAppButton } from '@/components/Marketing'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  description: 'Envie sua preferência de horário para atendimento com Deila Pinto Advocacia e Consultoria.',
  title: 'Solicitar horário',
}

async function horariosLivres() {
  try {
    const response = await fetch('https://n8n.cavalcantealbuquerque.com.br/webhook/disponibilidade-dp', { next: { revalidate: 300 } })
    const data = await response.json()
    return Array.isArray(data.horarios) ? data.horarios.slice(0, 9) : []
  } catch { return [] }
}

export default async function AgendarPage() {
  const horarios = await horariosLivres()
  return (
    <div className="site-shell listing-page">
      <section className="listing-hero" aria-labelledby="agendar-title">
        <p className="eyebrow">Atendimento</p>
        <h1 id="agendar-title">Solicite um horário</h1>
        <p>Conte brevemente o assunto e a sua preferência de dia ou período. O horário é confirmado somente depois da verificação da agenda pela equipe.</p>
      </section>

      <section className="section-ivory">
        <Container className="faq-inner">
          <div><Eyebrow>Disponibilidade inicial</Eyebrow><h2>Horários livres para solicitação</h2><p>Escolha uma preferência no formulário. A equipe confirma qualquer atendimento antes da reserva.</p></div>
          <ol className="campaign-grid" aria-label="Horários livres">
            {horarios.map((horario: { inicio: string }) => <li className="campaign-card" key={horario.inicio}><h3>{new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date(horario.inicio))}</h3><p>Disponibilidade sujeita à confirmação humana.</p><Link className="button button-secondary" href={`/contato?horario=${encodeURIComponent(horario.inicio)}#formulario-agendamento`}>Escolher este horário</Link></li>)}
          </ol>
        </Container>
      </section>

      <section className="section-white">
        <Container className="faq-inner">
          <div>
            <Eyebrow>Como funciona</Eyebrow>
            <h2>O pedido começa a organização do atendimento.</h2>
            <p>Não é necessário conhecer detalhes jurídicos. Informe o assunto, como prefere conversar e os horários que costumam funcionar para você.</p>
          </div>
          <ol className="campaign-grid" aria-label="Etapas da solicitação de horário">
            <li className="campaign-card">
              <span>01</span>
              <h3>Envie sua preferência</h3>
              <p>Use o formulário de contato ou o WhatsApp e informe dias ou períodos possíveis.</p>
            </li>
            <li className="campaign-card">
              <span>02</span>
              <h3>A equipe verifica a agenda</h3>
              <p>As informações são organizadas para identificar a melhor forma de atendimento.</p>
            </li>
            <li className="campaign-card">
              <span>03</span>
              <h3>Receba a confirmação</h3>
              <p>A reserva só é válida quando o escritório confirmar o horário e o canal de atendimento.</p>
            </li>
          </ol>
        </Container>
      </section>

      <section className="home-contact">
        <div className="home-contact-copy">
          <Eyebrow>Próximo passo</Eyebrow>
          <h2>Envie sua solicitação.</h2>
          <p>O contato inicial será usado apenas para organizar o retorno e a confirmação do atendimento.</p>
        </div>
        <div className="actions">
          <Link className="button button-primary" href="/contato#formulario-agendamento">
            Enviar pedido de horário
          </Link>
          <WhatsAppButton href="/ir/whatsapp?o=agendamento" />
        </div>
      </section>
    </div>
  )
}
