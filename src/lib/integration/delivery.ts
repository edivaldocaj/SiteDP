import { RETRY_DELAYS_MS } from './constants'
import { sendLeadToN8n } from './n8n'
import { getPayloadClient } from './payload'

type UntypedPayload = {
  findByID: (args: { collection: string; id: string | number }) => Promise<LeadRecord & { status?: string | null }>
  update: (args: {
    collection: string
    data: Record<string, unknown>
    id: string | number
    overrideAccess: boolean
  }) => Promise<unknown>
}

type LeadRecord = {
  id: string | number
  capturaParcial?: boolean | null
  consentAceito?: boolean | null
  nome?: string | null
  tentativas?: number | null
}
const activeDeliveries = new Set<string>()

export function getNextStatus(tentativas: number, retryable: boolean) {
  if (!retryable) return 'entregue'
  return tentativas >= RETRY_DELAYS_MS.length ? 'falha' : 'pendente'
}

export async function deliverLead(id: string | number) {
  const lockKey = String(id)
  if (activeDeliveries.has(lockKey)) return
  activeDeliveries.add(lockKey)
  try {
    const payload = (await getPayloadClient()) as unknown as UntypedPayload
    const record = await payload.findByID({ collection: 'lead-submissions', id })

  if (
    !record ||
    record.status === 'entregue' ||
    record.status === 'rejeitada' ||
    record.capturaParcial ||
    !record.consentAceito ||
    !record.nome
  ) {
      return
    }

  const tentativas = (record.tentativas || 0) + 1
  const result = await sendLeadToN8n(record).catch((error: unknown) => ({
    leadIdCrm: null,
    retryable: true,
    status: 'pendente' as const,
    ultimoErro: error instanceof Error ? error.message : 'Falha ao entregar ao n8n.',
  }))
  const status = result.status === 'pendente' ? getNextStatus(tentativas, result.retryable) : result.status

  await payload.update({
    collection: 'lead-submissions',
    id,
    data: {
      leadIdCrm: result.leadIdCrm || undefined,
      status,
      tentativas,
      ultimoErro: result.ultimoErro || undefined,
    },
    overrideAccess: true,
  })

    // Redrive autenticado retoma pendências após falha ou reinício do processo.
  } finally {
    activeDeliveries.delete(lockKey)
  }
}
