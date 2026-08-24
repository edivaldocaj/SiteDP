import { NextResponse, type NextRequest } from 'next/server'

import { UTM_COOKIE } from '@/lib/integration/constants'
import { getUtmFromSearchParams, hasAnyUtm } from '@/lib/integration/utm'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  if (!request.cookies.has(UTM_COOKIE)) {
    const utm = getUtmFromSearchParams(request.nextUrl.searchParams)

    if (hasAnyUtm(utm)) {
      response.cookies.set(UTM_COOKIE, JSON.stringify(utm), {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
        secure: request.nextUrl.protocol === 'https:',
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|marca|imagens|og.png).*)'],
}
