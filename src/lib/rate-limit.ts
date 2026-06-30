const rateMap = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit = 5, windowMs = 60000) {
  const now = Date.now()
  const entry = rateMap.get(key)

  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  entry.count += 1
  if (entry.count > limit) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: limit - entry.count }
}
