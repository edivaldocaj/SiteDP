import { NextResponse, type NextRequest } from 'next/server'

import { scheduleLeadDelivery } from '@/lib/integration/delivery'
import { handleLeadSubmission, type LeadSubmissionPayload } from '@/lib/integration/leadSubmission'
import { getPayloadClient } from '@/lib/integration/payload'
import { isRateLimited } from '@/lib/integration/rateLimit'
import { getClientIp } from '@/lib/integration/request'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, erro: 'Muitas tentativas.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const payload = (await getPayloadClient()) as unknown as LeadSubmissionPayload
  const result = await handleLeadSubmission({
    body,
    ip,
    payload,
    scheduleDelivery: scheduleLeadDelivery,
  })

  return NextResponse.json(result.body, { status: result.status })
}
