import { z } from 'zod'

import { CAMPAIGN_CODE_REGEX } from './constants'
import { normalizePhone } from './phone'
import { normalizeCampaign } from './utm'

const optionalText = z.string().trim().max(300).optional().nullable()

const optionalCampaign = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((value) => (value ? value.toUpperCase() : null))
  .refine((value) => !value || CAMPAIGN_CODE_REGEX.test(value), 'Campanha invalida.')

export type LeadSubmissionRecord = {
  id: string | number
  idempotencia?: string | null
  tentativas?: number | null
}

export type LeadSubmissionPayload = {
  create: (args: {
    collection: string
    data: Record<string, unknown>
    overrideAccess: boolean
  }) => Promise<LeadSubmissionRecord>
  find: (args: {
    collection: string
    limit: number
    where: Record<string, unknown>
  }) => Promise<{ docs: LeadSubmissionRecord[] }>
  update: (args: {
    collection: string
    data: Record<string, unknown>
    id: string | number
    overrideAccess: boolean
  }) => Promise<LeadSubmissionRecord>
}

export const leadSubmissionSchema = z.object({
  campanha: optionalCampaign,
  consentAceito: z.boolean().optional(),
  consentEm: z.string().datetime().optional(),
  consentVersao: z.string().trim().min(1).max(60).optional(),
  email: z.string().trim().email().optional().nullable(),
  empresa: z.string().trim().max(0).optional(),
  formularioIniciadoEm: z.string().datetime().optional(),
  idempotencia: z.string().uuid().optional(),
  nome: z.string().trim().max(160).optional().nullable(),
  origem: z.enum(['landing', 'contato', 'calculadora']),
  parcial: z.boolean().optional().default(false),
  referrer: optionalText,
  respostas: z
    .array(
      z.object({
        pergunta: z.string().trim().min(1).max(240),
        resposta: z.string().trim().min(1).max(1200),
      }),
    )
    .max(8)
    .optional(),
  telefone: z.string().trim().min(8).max(30),
  utm: z
    .object({
      source: optionalText,
      medium: optionalText,
      campaign: optionalCampaign,
      content: optionalText,
      term: optionalText,
    })
    .optional(),
})

type HandleLeadSubmissionArgs = {
  body: unknown
  ip: string
  now?: () => Date
  payload: LeadSubmissionPayload
  scheduleDelivery: (record: LeadSubmissionRecord, delayOverride?: number) => void
}

type HandleLeadSubmissionResult = {
  body: Record<string, unknown>
  deliveryRecord?: LeadSubmissionRecord
  status: number
}

function assertFinalSubmission(data: z.infer<typeof leadSubmissionSchema>) {
  if (!data.nome || data.nome.trim().length < 2) {
    return 'Nome obrigatorio.'
  }

  if (!data.consentAceito) {
    return 'Consentimento obrigatorio.'
  }

  if (!data.consentVersao) {
    return 'Versao do consentimento obrigatoria.'
  }

  return null
}

async function findByIdempotencia(payload: LeadSubmissionPayload, idempotencia: string) {
  const result = await payload.find({
    collection: 'lead-submissions',
    limit: 1,
    where: {
      idempotencia: {
        equals: idempotencia,
      },
    },
  })

  return result.docs[0] || null
}

export async function handleLeadSubmission({
  body,
  ip,
  now = () => new Date(),
  payload,
  scheduleDelivery,
}: HandleLeadSubmissionArgs): Promise<HandleLeadSubmissionResult> {
  const parsed = leadSubmissionSchema.safeParse(body)

  if (!parsed.success) {
    return { body: { ok: false, erro: 'Dados invalidos.' }, status: 422 }
  }

  const data = parsed.data

  if (data.empresa) {
    return { body: { ok: true }, status: 200 }
  }

  if (!data.parcial && data.formularioIniciadoEm) {
    const elapsed = now().getTime() - new Date(data.formularioIniciadoEm).getTime()
    if (elapsed < 3000) {
      return { body: { ok: false, erro: 'Envio muito rapido.' }, status: 422 }
    }
  }

  let telefone: string
  try {
    telefone = normalizePhone(data.telefone)
  } catch {
    return { body: { ok: false, erro: 'Telefone invalido.' }, status: 422 }
  }

  const finalError = data.parcial ? null : assertFinalSubmission(data)
  if (finalError) {
    return { body: { ok: false, erro: finalError }, status: 422 }
  }

  const idempotencia = data.idempotencia || crypto.randomUUID()
  const existing = await findByIdempotencia(payload, idempotencia)
  const submittedAt = now().toISOString()
  const campanha = data.campanha || normalizeCampaign(data.utm?.campaign)

  const submissionData: Record<string, unknown> = {
    campanha: campanha || undefined,
    capturaParcial: data.parcial,
    enviadoEm: submittedAt,
    escritorio: process.env.ESCRITORIO || 'DP',
    idempotencia,
    origem: data.origem,
    referrer: data.referrer || undefined,
    status: 'pendente',
    telefone,
    tentativas: existing?.tentativas || 0,
    utm: data.utm || {},
  }

  if (data.nome) submissionData.nome = data.nome
  if (data.email) submissionData.email = data.email
  if (data.respostas) submissionData.respostas = data.respostas

  if (!data.parcial) {
    submissionData.capturaParcial = false
    submissionData.consentAceito = true
    submissionData.consentEm = data.consentEm || submittedAt
    submissionData.consentIp = ip
    submissionData.consentVersao = data.consentVersao
  }

  const submission = existing
    ? await payload.update({
        collection: 'lead-submissions',
        data: submissionData,
        id: existing.id,
        overrideAccess: true,
      })
    : await payload.create({
        collection: 'lead-submissions',
        data: submissionData,
        overrideAccess: true,
      })

  if (!data.parcial) {
    scheduleDelivery(submission, 0)
  }

  return {
    body: { ok: true, idempotencia: submission.idempotencia || idempotencia },
    deliveryRecord: data.parcial ? undefined : submission,
    status: 200,
  }
}
