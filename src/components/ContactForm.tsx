'use client'

import React, { useState } from 'react'

type ContactFormProps = {
  consentimentoTexto?: string | null
  consentimentoVersao?: string | null
}

type FormState = {
  assunto: string
  email: string
  mensagem: string
  nome: string
  telefone: string
}

const initialForm: FormState = {
  assunto: '',
  email: '',
  mensagem: '',
  nome: '',
  telefone: '',
}

function getUtm() {
  try {
    const value = sessionStorage.getItem('utm_first')
    return value ? JSON.parse(value) : {}
  } catch {
    return {}
  }
}

export function ContactForm({ consentimentoTexto, consentimentoVersao }: ContactFormProps) {
  const [form, setForm] = useState(initialForm)
  const [empresa, setEmpresa] = useState('')
  const [formularioIniciadoEm] = useState(() => new Date().toISOString())
  const [idempotencia] = useState(() => crypto.randomUUID())
  const [consentAceito, setConsentAceito] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!consentAceito) {
      setError('Confirme o consentimento para enviar.')
      return
    }

    const response = await fetch('/api/submit-lead', {
      body: JSON.stringify({
        consentAceito,
        consentEm: new Date().toISOString(),
        consentVersao: consentimentoVersao || 'contato-v1',
        email: form.email || undefined,
        empresa,
        formularioIniciadoEm,
        idempotencia,
        nome: form.nome,
        origem: 'contato',
        parcial: false,
        respostas: [
          { pergunta: 'Assunto', resposta: form.assunto },
          { pergunta: 'Mensagem', resposta: form.mensagem },
        ],
        telefone: form.telefone,
        utm: getUtm(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = (await response.json().catch(() => null)) as { erro?: string; ok?: boolean } | null
    if (!response.ok || !result?.ok) {
      setError(result?.erro || 'Não foi possível enviar a mensagem.')
      return
    }

    setSent(true)
    setForm(initialForm)
  }

  if (sent) {
    return (
      <section className="contact-form-card" aria-live="polite">
        <h2>Mensagem recebida.</h2>
        <p>O contato segue conforme os dados enviados.</p>
      </section>
    )
  }

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <div>
        <h2>Envie sua mensagem</h2>
        <p>Preencha os dados abaixo para entrarmos em contato.</p>
      </div>
      <input
        autoComplete="off"
        className="honeypot"
        name="empresa"
        onChange={(event) => setEmpresa(event.target.value)}
        tabIndex={-1}
        value={empresa}
      />
      <div className="contact-form-grid">
        <label>
          Nome completo
          <input
            autoComplete="name"
            minLength={2}
            onChange={(event) => updateField('nome', event.target.value)}
            required
            value={form.nome}
          />
        </label>
        <label>
          E-mail
          <input
            autoComplete="email"
            onChange={(event) => updateField('email', event.target.value)}
            type="email"
            value={form.email}
          />
        </label>
        <label>
          Telefone / WhatsApp
          <input
            autoComplete="tel"
            inputMode="numeric"
            onChange={(event) => updateField('telefone', event.target.value)}
            required
            type="tel"
            value={form.telefone}
          />
        </label>
        <label>
          Assunto
          <select
            onChange={(event) => updateField('assunto', event.target.value)}
            required
            value={form.assunto}
          >
            <option value="">Selecione o assunto</option>
            <option>Direito Previdenciário</option>
            <option>BPC/LOAS</option>
            <option>Direito do Trabalho</option>
            <option>Licitações e Contratos</option>
            <option>Outro assunto</option>
          </select>
        </label>
      </div>
      <label>
        Mensagem
        <textarea
          onChange={(event) => updateField('mensagem', event.target.value)}
          required
          rows={5}
          value={form.mensagem}
        />
      </label>
      <label className="privacy-check">
        <input
          checked={consentAceito}
          onChange={(event) => setConsentAceito(event.target.checked)}
          type="checkbox"
        />
        <span>
          {consentimentoTexto ||
            'Autorizo o uso dos dados enviados para retorno deste atendimento.'}
        </span>
      </label>
      <button className="button button-primary" type="submit">
        Enviar mensagem
      </button>
      <p className="privacy-note">Seus dados serão usados apenas para retorno do atendimento.</p>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  )
}
