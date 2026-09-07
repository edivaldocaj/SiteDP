const CAMPAIGN_CODE = /^[A-Z]{2,6}(-[A-Z0-9]{2,12}){1,3}$/
const keys = ['source', 'medium', 'campaign', 'content', 'term'] as const

export function getStoredUtm() {
  try {
    const raw = sessionStorage.getItem('utm_first')
    const parsed = raw ? JSON.parse(raw) : {}
    const utm: Record<string, string | null> = {}
    for (const key of keys) {
      const value = typeof parsed?.[key] === 'string' ? parsed[key].trim().slice(0, 300) : ''
      if (value) utm[key] = key === 'campaign' && !CAMPAIGN_CODE.test(value.toUpperCase()) ? null : value
    }
    return utm
  } catch {
    return {}
  }
}
