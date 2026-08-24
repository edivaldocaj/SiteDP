type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function isRateLimited(ip: string) {
  const now = Date.now()
  const resetAt = now + 60_000
  const current = buckets.get(ip)

  if (!current || current.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt })
    return false
  }

  current.count += 1
  return current.count > 8
}
