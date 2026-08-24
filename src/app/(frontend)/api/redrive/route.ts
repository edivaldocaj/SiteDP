import { NextResponse, type NextRequest } from 'next/server'

import { deliverLead } from '@/lib/integration/delivery'
import { getPayloadClient } from '@/lib/integration/payload'

type RedrivePayload = {
  count: (args: { collection: string; where: Record<string, unknown> }) => Promise<{ totalDocs: number }>
  find: (args: {
    collection: string
    limit: number
    where: Record<string, unknown>
  }) => Promise<{ docs: Array<{ id: string | number }> }>
}

function isAuthorized(request: NextRequest) {
  const token = request.headers.get('x-site-token') || request.nextUrl.searchParams.get('token')
  return Boolean(process.env.SITE_TOKEN && token === process.env.SITE_TOKEN)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const payload = (await getPayloadClient()) as unknown as RedrivePayload
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const records = await payload.find({
    collection: 'lead-submissions',
    limit: 25,
    where: {
      and: [
        {
          status: {
            in: ['pendente', 'falha'],
          },
        },
        {
          enviadoEm: {
            less_than_equal: fiveMinutesAgo,
          },
        },
        {
          tentativas: {
            less_than: 6,
          },
        },
        {
          capturaParcial: {
            not_equals: true,
          },
        },
      ],
    },
  })

  await Promise.all(records.docs.map((record: { id: string | number }) => deliverLead(record.id)))

  const failures = await payload.count({
    collection: 'lead-submissions',
    where: {
      status: {
        equals: 'falha',
      },
    },
  })

  return NextResponse.json({
    alerta: failures.totalDocs > 3,
    falhas: failures.totalDocs,
    ok: true,
    reenviadas: records.docs.length,
  })
}
