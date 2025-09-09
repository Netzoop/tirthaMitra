"use client"

import useSWR from "swr"
import Link from "next/link"
import { fetcher } from "@/lib/fetcher"
import { getCache, setCache } from "@/lib/offline-cache"
import { useEffect, useState } from "react"

export type EventItem = {
  id: string
  title: string
  time: string
  location: string
  crowd: "Low" | "Moderate" | "High"
  description?: string
  mapUrl?: string
}

type Filter = "all" | "nearby" | "bath" | "cultural"

export function EventList({ compact = false, filter = "all" }: { compact?: boolean; filter?: Filter }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const key = mounted ? "/api/events" : null
  const { data } = useSWR<EventItem[]>(key, fetcher, {
    onSuccess: (d) => setCache("events", d),
    fallbackData: mounted ? getCache<EventItem[]>("events") || [] : undefined,
  })

  if (!mounted || !data) return null

  const lowerIncludes = (s: string, q: string) => s.toLowerCase().includes(q)

  const filtered = data.filter((e) => {
    if (filter === "all") return true
    if (filter === "nearby") return lowerIncludes(e.location, "ram ghat") || !!e.mapUrl
    if (filter === "bath") return /bath|snan/i.test(e.title)
    if (filter === "cultural") return /bhajan|kirtan|yagna|cultural/i.test(e.title)
    return true
  })

  return (
    <div className="space-y-2">
      {filtered.map((e) => (
        <Link key={e.id} href={`/events/${e.id}`} className="block border rounded p-3 hover:bg-[#F5F9FC]">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>{e.title}</h3>
            <span className="text-xs text-slate-600">{e.time}</span>
          </div>
          <p className="text-xs text-slate-600">
            {e.location} • Crowd: {e.crowd}
          </p>
        </Link>
      ))}
    </div>
  )
}
