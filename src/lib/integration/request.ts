import type { NextRequest } from 'next/server'

export function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  )
}

export function getReferrer(request: NextRequest) {
  return request.headers.get('referer') || request.headers.get('referrer') || null
}
