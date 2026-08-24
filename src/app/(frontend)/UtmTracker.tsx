'use client'

import { useEffect } from 'react'

const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export function UtmTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (sessionStorage.getItem('utm_first')) {
      return
    }

    const utm = Object.fromEntries(
      utmParams
        .map((key) => [key.replace('utm_', ''), params.get(key)])
        .filter(([, value]) => Boolean(value)),
    )

    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem('utm_first', JSON.stringify(utm))
    }
  }, [])

  return null
}
