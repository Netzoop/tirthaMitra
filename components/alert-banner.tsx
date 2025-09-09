"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { setCache, getCache } from "@/lib/offline-cache"
import { useEffect, useState } from "react"

type Alert = { id: string; type: "safety" | "weather" | "info"; message: string }

export function AlertBanner() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const key = mounted ? "/api/alerts" : null
  const { data } = useSWR<Alert[]>(key, fetcher, {
    onSuccess: (d) => setCache("alerts", d),
    fallbackData: mounted ? getCache<Alert[]>("alerts") || [] : undefined,
  })
  if (!mounted || !data || data.length === 0) return null
  return (
    <div className="my-3 space-y-2">
      {data.map((a) => (
        <div
          key={a.id}
          className={`text-sm px-3 py-2 rounded border ${a.type === "safety" ? "bg-[#E07A5F] text-white border-transparent" : a.type === "weather" ? "bg-[#F5F9FC] text-slate-800 border-slate-200" : "bg-white border-slate-200"}`}
        >
          {a.message}
        </div>
      ))}
    </div>
  )
}
