import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

import { CAMPAIGN_CODE_REGEX } from '@/lib/integration/constants'
import { scheduleLeadDelivery } from '@/lib/integration/delivery'
import { normalizePhone } from '@/lib/integration/phone'
import { getPayloadClient } from '@/lib/integration/payload'
import { isRateLimited } from '@/lib/integration/rateLimit'
import { getClientIp } from '@/lib/integration/request'
import { normalizeCampaign } from '@/lib/integration/utm'

const optionalText = z.string().trim().max(300).optional().nullable()

type SubmitPayload = {
  create: (args: {
    collection: string
    data: Record<string, unknown>
    overrideAccess: boolean
  }) => Promise<{ id: string | number; idempotencia?: string | null }>
}

const schema = z.object({
  campanha: z
    .string()
    .trim()
    .transform((value) => normalizeCampaign(value))
    .refine((value) => !value || CAMPAIGN_CODE_REGEX.test(value), 'Campanha invalida.')
    .optional()
    .nullable(),
  consentAceito: z.boolean(),
  consentEm: z.string().datetime().optional(),
  consentVersao: z.string().trim().min(1).max(60),
  email: z.string().trim().email().optional().nullable(),
  empresa: z.string().trim().max(0).optional(),
  formularioIniciadoEm: z.string().datetime().optional(),
  idempotencia: z.string().uuid().optional(),
  nome: z.string().trim().min(2).max(160),
  origem: z.enum(['landing', 'contato', 'calculadora']),
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
      campaign: optionalText.transform((value) => normalizeCampaign(value)),
      content: optionalText,
      term: optionalText,
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, erro: 'Muitas tentativas.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ ok: false, erro: 'Dados invalidos.' }, { status: 422 })
  }

  const data = parsed.data

  if (data.empresa) {
    return NextResponse.json({ ok: true })
  }

  if (!data.consentAceito) {
    return NextResponse.json({ ok: false, erro: 'Consentimento obrigatorio.' }, { status: 422 })
  }

  if (data.formularioIniciadoEm) {
    const elapsed = Date.now() - new Date(data.formularioIniciadoEm).getTime()
    if (elapsed < 3000) {
      return NextResponse.json({ ok: false, erro: 'Envio muito rapido.' }, { status: 422 })
    }
  }

  let telefone: string
  try {
    telefone = normalizePhone(data.telefone)
  } catch {
    return NextResponse.json({ ok: false, erro: 'Telefone invalido.' }, { status: 422 })
  }

  const payload = (await getPayloadClient()) as unknown as SubmitPayload
  const submission = await payload.create({
    collection: 'lead-submissions',
    data: {
      campanha: data.campanha || undefined,
      consentAceito: data.consentAceito,
      consentEm: data.consentEm || new Date().toISOString(),
      consentIp: ip,
      consentVersao: data.consentVersao,
      email: data.email || undefined,
      enviadoEm: new Date().toISOString(),
      escritorio: process.env.ESCRITORIO || 'DP',
      idempotencia: data.idempotencia || crypto.randomUUID(),
      nome: data.nome,
      origem: data.origem,
      referrer: data.referrer || undefined,
      respostas: data.respostas || [],
      status: 'pendente',
      telefone,
      tentativas: 0,
      utm: data.utm || {},
    },
    overrideAccess: true,
  })

  scheduleLeadDelivery(submission, 0)

  return NextResponse.json({ ok: true, idempotencia: submission.idempotencia })
}
