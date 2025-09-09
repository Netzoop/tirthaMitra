"use client"

import { AppShell } from "@/components/app-shell"
import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

type Ticket = { id: string; description: string; status: "Open" | "In Progress" | "Resolved" }

export default function LostFoundPage() {
  const { data, mutate } = useSWR<Ticket[]>("/api/tickets", fetcher)
  const list = data || []
  const [desc, setDesc] = useState("")

  function submit() {
    if (!desc.trim()) return
    fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc, status: "Open" }),
    }).then(() => mutate())
    setDesc("")
  }

  function advance(id: string) {
    const cur = list.find((t) => t.id === id)
    if (!cur) return
    const next = cur.status === "Open" ? "In Progress" : "Resolved"
    fetch("/api/tickets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    }).then(() => mutate())
  }

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Lost & Found / Helpdesk</h1>

      <div className="border rounded p-3 mb-4">
        <label className="block text-sm mb-1">Describe the item or issue</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          rows={3}
        />
        <button onClick={submit} className="mt-2 px-3 py-2 rounded bg-[#2E5AAC] text-white text-sm">
          Submit Report
        </button>
      </div>

      <div className="space-y-2">
        {list.map((t) => (
          <div key={t.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <p className="text-sm font-medium">{t.id}</p>
              <p className="text-xs text-slate-600">{t.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded ${t.status === "Resolved" ? "bg-[#42A25E] text-white" : t.status === "In Progress" ? "bg-[#F5F9FC] text-slate-800" : "bg-white border border-slate-200"}`}
              >
                {t.status}
              </span>
              {t.status !== "Resolved" && (
                <button onClick={() => advance(t.id)} className="text-sm px-2 py-1 rounded border">
                  Advance
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
