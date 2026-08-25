'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { CampaignQuestion } from '@/lib/campaigns'

type CampaignLeadFormProps = {
  campaignCode: string
  consentimentoTexto?: string | null
  consentimentoVersao?: string | null
  perguntas: CampaignQuestion[]
}

type StoredForm = {
  email?: string
  idempotencia: string
  nome?: string
  respostas: Record<string, string>
  telefone?: string
}

const storageKeyPrefix = 'campaign_form:'

function createIdempotencia() {
  return crypto.randomUUID()
}

function getUtm() {
  try {
    const value = sessionStorage.getItem('utm_first')
    return value ? JSON.parse(value) : {}
  } catch {
    return {}
  }
}

export function CampaignLeadForm({
  campaignCode,
  consentimentoTexto,
  consentimentoVersao,
  perguntas,
}: CampaignLeadFormProps) {
  const storageKey = `${storageKeyPrefix}${campaignCode}`
  const [step, setStep] = useState(1)
  const [formularioIniciadoEm] = useState(() => new Date().toISOString())
  const [consentAceito, setConsentAceito] = useState(false)
  const [empresa, setEmpresa] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<StoredForm>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(storageKey)
      if (stored) {
        try {
          return JSON.parse(stored) as StoredForm
        } catch {
          sessionStorage.removeItem(storageKey)
        }
      }
    }

    return {
      idempotencia: createIdempotencia(),
      respostas: {},
    }
  })

  const visibleQuestions = useMemo(() => perguntas.slice(0, 4), [perguntas])
  const totalSteps = visibleQuestions.length ? 4 : 3

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(form))
  }, [form, storageKey])

  async function submit(parcial: boolean) {
    const respostas = visibleQuestions
      .map((question, index) => ({
        pergunta: question.pergunta || `Pergunta ${index + 1}`,
        resposta: form.respostas[String(index)] || '',
      }))
      .filter((resposta) => resposta.resposta)

    const response = await fetch('/api/submit-lead', {
      body: JSON.stringify({
        campanha: campaignCode,
        consentAceito: parcial ? undefined : consentAceito,
        consentEm: parcial ? undefined : new Date().toISOString(),
        consentVersao: consentimentoVersao || undefined,
        email: form.email || undefined,
        empresa: empresa || undefined,
        formularioIniciadoEm,
        idempotencia: form.idempotencia,
        nome: form.nome || undefined,
        origem: 'landing',
        parcial,
        respostas,
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
      throw new Error(result?.erro || 'Nao foi possivel enviar.')
    }
  }

  async function advanceFromPhone() {
    setError(null)
    try {
      await submit(true)
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Telefone invalido.')
    }
  }

  function advanceFromName() {
    setError(null)
    if (!form.nome || form.nome.trim().length < 2) {
      setError('Informe seu nome.')
      return
    }

    setStep(visibleQuestions.length ? 3 : 4)
  }

  function advanceFromQuestions() {
    setError(null)
    const missingQuestion = visibleQuestions.some((_, index) => !form.respostas[String(index)])
    if (missingQuestion) {
      setError('Responda as perguntas para continuar.')
      return
    }

    setStep(4)
  }

  async function finish() {
    setError(null)
    try {
      await submit(false)
      setSent(true)
      sessionStorage.removeItem(storageKey)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel enviar.')
    }
  }

  if (sent) {
    return (
      <section className="lead-form" aria-live="polite">
        <h2>Recebemos suas informacoes.</h2>
        <p>O contato segue conforme os dados enviados.</p>
      </section>
    )
  }

  return (
    <section className="lead-form" aria-labelledby="form-title">
      <h2 id="form-title">Vamos conversar sobre o seu direito?</h2>
      <p className="form-progress">Etapa {Math.min(step, totalSteps)} de {totalSteps}</p>
      <input
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        onChange={(event) => setEmpresa(event.target.value)}
        value={empresa}
      />

      {step === 1 && (
        <div className="form-step">
          <p className="form-step-lead">
            Comece pelo telefone. Depois aparecem as perguntas da campanha.
          </p>
          <label htmlFor="telefone">Telefone</label>
          <input
            autoComplete="tel"
            id="telefone"
            inputMode="numeric"
            name="telefone"
            onChange={(event) => setForm((current) => ({ ...current, telefone: event.target.value }))}
            required
            type="tel"
            value={form.telefone || ''}
          />
          <button className="button button-primary" onClick={advanceFromPhone} type="button">
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <p className="form-step-lead">Agora, informe seu nome para continuar.</p>
          <label htmlFor="nome">Nome</label>
          <input
            autoComplete="name"
            id="nome"
            name="nome"
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
            required
            value={form.nome || ''}
          />
          <label htmlFor="email">E-mail</label>
          <input
            autoComplete="email"
            id="email"
            name="email"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            type="email"
            value={form.email || ''}
          />
          <button className="button button-primary" onClick={advanceFromName} type="button">
            Continuar
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <p className="form-step-lead">Responda as perguntas abaixo com calma.</p>
          {visibleQuestions.map((question, index) => (
            <label className="question-field" key={question.id || `${question.pergunta}-${index}`}>
              <span>{question.pergunta}</span>
              {question.tipo === 'data' ? (
                <input
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      respostas: { ...current.respostas, [index]: event.target.value },
                    }))
                  }
                  required
                  type="date"
                  value={form.respostas[String(index)] || ''}
                />
              ) : question.tipo === 'opcoes' && question.opcoes?.length ? (
                <select
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      respostas: { ...current.respostas, [index]: event.target.value },
                    }))
                  }
                  required
                  value={form.respostas[String(index)] || ''}
                >
                  <option value="">Selecione</option>
                  {question.opcoes.map((option) => (
                    <option key={option.id || option.opcao || ''} value={option.opcao || ''}>
                      {option.opcao}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      respostas: { ...current.respostas, [index]: event.target.value },
                    }))
                  }
                  required
                  value={form.respostas[String(index)] || ''}
                />
              )}
            </label>
          ))}
          <button className="button button-primary" onClick={advanceFromQuestions} type="button">
            Continuar
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          {consentimentoTexto ? <p>{consentimentoTexto}</p> : null}
          <label className="checkbox-field">
            <input
              checked={consentAceito}
              onChange={(event) => setConsentAceito(event.target.checked)}
              type="checkbox"
            />
            <span>Li e concordo com o uso dos dados para este atendimento.</span>
          </label>
          <button className="button button-primary" onClick={finish} type="button">
            Enviar
          </button>
        </div>
      )}

      {error ? <p className="form-error">{error}</p> : null}
    </section>
  )
}
