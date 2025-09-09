// LocalStorage-backed cache helpers for an offline demo experience

const LS_PREFIX = "tm_cache_v1:"

export function setCache(key: string, data: unknown) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify({ ts: Date.now(), data }))
  } catch {}
}

export function getCache<T = any>(key: string): T | null {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed.data as T
  } catch {
    return null
  }
}

export function clearAllCache() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(LS_PREFIX))
    .forEach((k) => localStorage.removeItem(k))
}
