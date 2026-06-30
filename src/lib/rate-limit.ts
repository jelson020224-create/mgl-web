const rateMap = new Map<string, { count: number; reset: number }>()
let callCount = 0

function cleanupStaleEntries() {
  const now = Date.now()
  for (const [key, entry] of rateMap.entries()) {
    if (entry.reset < now) {
      rateMap.delete(key)
    }
  }
}

export function rateLimit(key: string, limit = 5, windowMs = 60000) {
  callCount++

  if (callCount % 100 === 0) {
    cleanupStaleEntries()
  }

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
