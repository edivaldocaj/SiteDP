import assert from 'node:assert/strict'

import { NextRequest } from 'next/server'

import { isPublicLandingCampaign } from '@/lib/campaigns'
import { CAMPAIGN_CODE_REGEX } from '@/lib/integration/constants'
import {
  handleLeadSubmission,
  type LeadSubmissionPayload,
  type LeadSubmissionRecord,
} from '@/lib/integration/leadSubmission'
import { normalizeCampaign } from '@/lib/integration/utm'
import { GET as whatsappRedirect } from '@/app/(frontend)/ir/whatsapp/route'

process.env.ESCRITORIO = 'DP'
process.env.WHATSAPP_NUMERO = '5584996026567'
process.env.N8N_BASE_URL = 'http://127.0.0.1:9'
process.env.SITE_TOKEN = 'local-test-token'

const campaignCodes = [
  'PREV-EXIGENCIA',
  'PREV-BPC',
  'PREV-RURAL',
  'PREV-INCAPACIDADE',
  'TRAB-RESCISAO',
  'PREV-PENSAO',
  'PREV-MATERNIDADE',
  'TRAB-HORAS',
  'TRAB-JUSTACAUSA',
  'TRAB-INDIRETA',
  'TRAB-INSALUBRE',
  'PREV-REVISAO',
]

const requestedExamples = ['PREV-BPC', 'TRAB-JUSTACAUSA', 'PREV-INCAPACIDADE', 'PREV-RURAL-01']

type StoredLead = LeadSubmissionRecord & Record<string, unknown>

class FakeLeadPayload implements LeadSubmissionPayload {
  docs: StoredLead[] = []

  async create(args: { data: Record<string, unknown> }) {
    const doc = {
      id: String(this.docs.length + 1),
      ...args.data,
    } as StoredLead
    this.docs.push(doc)
    return doc
  }

  async find(args: { where: Record<string, unknown> }) {
    const expected = (
      args.where.idempotencia as
        | {
            equals?: string
          }
        | undefined
    )?.equals

    return {
      docs: expected ? this.docs.filter((doc) => doc.idempotencia === expected) : this.docs,
    }
  }

  async update(args: { data: Record<string, unknown>; id: string | number }) {
    const index = this.docs.findIndex((doc) => doc.id === args.id)
    assert.notEqual(index, -1)
    this.docs[index] = {
      ...this.docs[index],
      ...args.data,
    }
    return this.docs[index]
  }
}

function assertCampaignValidation() {
  for (const code of [...campaignCodes, ...requestedExamples]) {
    assert.equal(CAMPAIGN_CODE_REGEX.test(code), true, `${code} deveria ser valido`)
    assert.equal(normalizeCampaign(code.toLowerCase()), code)
  }

  console.log(`campaignCode: ${campaignCodes.length} codigos seed + exemplos solicitados passaram`)
}

async function assertPartialThenFinalSubmission() {
  const payload = new FakeLeadPayload()
  const scheduled: LeadSubmissionRecord[] = []
  const idempotencia = crypto.randomUUID()
  const now = new Date('2026-08-24T12:00:05.000Z')
  const startedAt = new Date(now.getTime() - 5000).toISOString()

  const partial = await handleLeadSubmission({
    body: {
      campanha: 'PREV-BPC',
      formularioIniciadoEm: now.toISOString(),
      idempotencia,
      origem: 'landing',
      parcial: true,
      telefone: '(84) 99602-6567',
    },
    ip: '127.0.0.1',
    now: () => now,
    payload,
    scheduleDelivery: (record) => scheduled.push(record),
  })

  assert.equal(partial.status, 200)
  assert.equal(payload.docs.length, 1)
  assert.equal(payload.docs[0].telefone, '5584996026567')
  assert.equal(payload.docs[0].nome, undefined)
  assert.equal(payload.docs[0].consentAceito, undefined)
  assert.equal(payload.docs[0].capturaParcial, true)
  assert.equal(scheduled.length, 0)

  const final = await handleLeadSubmission({
    body: {
      campanha: 'PREV-BPC',
      consentAceito: true,
      consentVersao: 'v1',
      email: 'maria@example.com',
      formularioIniciadoEm: startedAt,
      idempotencia,
      nome: 'Maria da Silva',
      origem: 'landing',
      parcial: false,
      respostas: [
        { pergunta: 'Pergunta 1', resposta: 'Resposta 1' },
        { pergunta: 'Pergunta 2', resposta: 'Resposta 2' },
      ],
      telefone: '(84) 99602-6567',
    },
    ip: '127.0.0.1',
    now: () => now,
    payload,
    scheduleDelivery: (record) => scheduled.push(record),
  })

  assert.equal(final.status, 200)
  assert.equal(payload.docs.length, 1)
  assert.equal(payload.docs[0].idempotencia, idempotencia)
  assert.equal(payload.docs[0].nome, 'Maria da Silva')
  assert.equal(payload.docs[0].capturaParcial, false)
  assert.equal(payload.docs[0].consentAceito, true)
  assert.equal(scheduled.length, 1)

  console.log('formulario: abandono grava telefone; conclusao atualiza mesma idempotencia')
}

function assertLandingVisibility() {
  assert.equal(isPublicLandingCampaign({ status: 'publicada', temLanding: false }), false)
  assert.equal(isPublicLandingCampaign({ status: 'rascunho', temLanding: true }), false)
  assert.equal(isPublicLandingCampaign({ status: 'publicada', temLanding: true }), true)
  console.log('campanhas: sem landing ou rascunho resultam em 404')
}

async function assertWhatsappRedirect() {
  const request = new NextRequest('http://localhost:3000/ir/whatsapp?c=PREV-EXIGENCIA')
  const response = await whatsappRedirect(request)
  const location = response.headers.get('location') || ''
  const decoded = decodeURIComponent(location)

  assert.equal(response.status, 302)
  assert.match(decoded, /^https:\/\/wa\.me\/5584996026567\?text=/)
  assert.match(decoded, /\[[A-Z2-7]{6}\]$/)

  console.log('/ir/whatsapp?c=PREV-EXIGENCIA: redireciona com token')
}

async function run() {
  assertCampaignValidation()
  await assertPartialThenFinalSubmission()
  assertLandingVisibility()
  await assertWhatsappRedirect()
}

void run().catch((error) => {
  console.error(error)
  process.exit(1)
})
