import { N8N_DELIVERY_TIMEOUT_MS, WHATSAPP_CLICK_TIMEOUT_MS } from './constants'

type LeadRecord = {
  id: string | number
  idempotencia?: string | null
  enviadoEm?: string | null
  escritorio?: 'DP' | null
  telefone?: string | null
  nome?: string | null
  email?: string | null
  campanha?: string | null
  origem?: 'landing' | 'contato' | 'calculadora' | null
  utm?: {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    content?: string | null
    term?: string | null
  } | null
  referrer?: string | null
  respostas?: Array<{ pergunta?: string | null; resposta?: string | null }> | null
  consentAceito?: boolean | null
  consentVersao?: string | null
  consentEm?: string | null
  consentIp?: string | null
  tentativas?: number | null
}

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variavel ${name} nao configurada.`)
  }
  return value
}

async function postWithTimeout(url: string, body: unknown, timeoutMs: number) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Site-Token': getRequiredEnv('SITE_TOKEN'),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

export function toN8nLeadPayload(record: LeadRecord) {
  return {
    escritorio: record.escritorio || getRequiredEnv('ESCRITORIO'),
    idempotencia: record.idempotencia,
    enviadoEm: record.enviadoEm,
    telefone: record.telefone,
    nome: record.nome,
    email: record.email || null,
    campanha: record.campanha || null,
    origem: record.origem,
    utm: {
      source: record.utm?.source || null,
      medium: record.utm?.medium || null,
      campaign: record.utm?.campaign || null,
      content: record.utm?.content || null,
      term: record.utm?.term || null,
    },
    referrer: record.referrer || null,
    respostas: (record.respostas || []).map((resposta) => ({
      pergunta: resposta.pergunta,
      resposta: resposta.resposta,
    })),
    consentimento: {
      aceito: Boolean(record.consentAceito),
      versao: record.consentVersao,
      em: record.consentEm,
      ip: record.consentIp,
    },
  }
}

export async function sendLeadToN8n(record: LeadRecord) {
  const response = await postWithTimeout(
    `${getRequiredEnv('N8N_BASE_URL')}/webhook/lead-in`,
    toN8nLeadPayload(record),
    N8N_DELIVERY_TIMEOUT_MS,
  )

  const json = (await response.json().catch(() => null)) as { ok?: boolean; leadId?: string; erro?: string } | null

  if (response.status === 422) {
    return {
      leadIdCrm: null,
      retryable: false,
      status: 'rejeitada' as const,
      ultimoErro: json?.erro || 'Lead rejeitado pelo n8n.',
    }
  }

  if (!response.ok || !json?.ok) {
    return {
      leadIdCrm: null,
      retryable: true,
      status: 'pendente' as const,
      ultimoErro: json?.erro || `Falha na entrega ao n8n: HTTP ${response.status}.`,
    }
  }

  return {
    leadIdCrm: json.leadId || null,
    retryable: false,
    status: 'entregue' as const,
    ultimoErro: null,
  }
}

export async function notifyWhatsappClick(payload: unknown) {
  try {
    await postWithTimeout(
      `${getRequiredEnv('N8N_BASE_URL')}/webhook/click-whatsapp`,
      payload,
      WHATSAPP_CLICK_TIMEOUT_MS,
    )
  } catch {
    // O redirecionamento para WhatsApp nunca depende do registro de clique.
  }
}
