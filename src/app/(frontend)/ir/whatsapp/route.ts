import { NextResponse, type NextRequest } from 'next/server'

import { notifyWhatsappClick } from '@/lib/integration/n8n'
import { getReferrer } from '@/lib/integration/request'
import { getUtmFromRequest, normalizeCampaign, resolveCampaign } from '@/lib/integration/utm'

export const dynamic = 'force-dynamic'

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variavel ${name} nao configurada.`)
  }
  return value
}

function generateClickToken() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  const bytes = crypto.getRandomValues(new Uint8Array(6))

  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')
}

export function GET(request: NextRequest) {
  const token = generateClickToken()
  const urlCampaign = normalizeCampaign(request.nextUrl.searchParams.get('c'))
  const origem = request.nextUrl.searchParams.get('o') || 'site'
  const utm = getUtmFromRequest(request)
  const campanha = resolveCampaign({ current: utm, fallback: urlCampaign })
  const em = new Date().toISOString()

  void notifyWhatsappClick({
    campanha,
    em,
    escritorio: getRequiredEnv('ESCRITORIO'),
    origem,
    referrer: getReferrer(request),
    token,
    utm,
  })

  const mensagem = encodeURIComponent(`Vamos conversar sobre o seu direito? [${token}]`)
  const numero = getRequiredEnv('WHATSAPP_NUMERO')

  return NextResponse.redirect(`https://wa.me/${numero}?text=${mensagem}`, 302)
}
