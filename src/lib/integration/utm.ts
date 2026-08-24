import type { NextRequest } from 'next/server'

import { CAMPAIGN_CODE_REGEX, UTM_COOKIE } from './constants'

export type UTM = {
  source?: string | null
  medium?: string | null
  campaign?: string | null
  content?: string | null
  term?: string | null
}

const utmKeys = ['source', 'medium', 'campaign', 'content', 'term'] as const

export function normalizeCampaign(value?: string | null) {
  if (!value) return null

  const normalized = value.trim().toUpperCase()
  return CAMPAIGN_CODE_REGEX.test(normalized) ? normalized : null
}

export function getUtmFromSearchParams(searchParams: URLSearchParams): UTM {
  return {
    source: searchParams.get('utm_source'),
    medium: searchParams.get('utm_medium'),
    campaign: normalizeCampaign(searchParams.get('utm_campaign')),
    content: searchParams.get('utm_content'),
    term: searchParams.get('utm_term'),
  }
}

export function hasAnyUtm(utm: UTM) {
  return utmKeys.some((key) => Boolean(utm[key]))
}

export function parseUtmCookie(value?: string) {
  if (!value) return {}

  try {
    const parsed = JSON.parse(value) as UTM
    return {
      source: parsed.source || null,
      medium: parsed.medium || null,
      campaign: normalizeCampaign(parsed.campaign),
      content: parsed.content || null,
      term: parsed.term || null,
    }
  } catch {
    return {}
  }
}

export function getUtmFromRequest(request: NextRequest) {
  const current = getUtmFromSearchParams(request.nextUrl.searchParams)
  const stored = parseUtmCookie(request.cookies.get(UTM_COOKIE)?.value)

  return {
    source: current.source || stored.source || null,
    medium: current.medium || stored.medium || null,
    campaign: current.campaign || stored.campaign || null,
    content: current.content || stored.content || null,
    term: current.term || stored.term || null,
  }
}

export function resolveCampaign({
  current,
  fallback,
}: {
  current: UTM
  fallback?: string | null
}) {
  return normalizeCampaign(current.campaign) || normalizeCampaign(fallback) || null
}
