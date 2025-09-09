"use client"

import { AppShell } from "@/components/app-shell"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

type Row = { id: string; description: string; status: "Open" | "In Progress" | "Resolved"; assignee?: string }

export default function AdminLostFound() {
  const { data, mutate } = useSWR<Row[]>("/api/tickets", fetcher)
  const rows = data || []

  useEffect(() => {
    if (!localStorage.getItem("tm_admin")) {
      window.location.href = "/admin/login"
    }
  }, [])

  function advance(id: string) {
    const cur = rows.find((x) => x.id === id)
    if (!cur) return
    const nextStatus = cur.status === "Open" ? "In Progress" : "Resolved"
    fetch("/api/tickets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    }).then(() => mutate())
  }

  function assign(id: string) {
    const name = prompt("Assign to:")
    if (!name) return
    fetch("/api/tickets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, assignee: name }),
    }).then(() => mutate())
  }

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Lost & Found Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-[#F5F9FC]">
            <tr>
              <th className="p-2 text-left">Ticket</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Assignee</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.description}</td>
                <td className="p-2">{r.assignee || "-"}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${r.status === "Resolved" ? "bg-[#42A25E] text-white" : r.status === "In Progress" ? "bg-[#F5F9FC] text-slate-800" : "bg-white border border-slate-200"}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-2 text-right space-x-2">
                  {r.status !== "Resolved" && (
                    <button onClick={() => advance(r.id)} className="px-2 py-1 rounded border">
                      Advance
                    </button>
                  )}
                  <button onClick={() => assign(r.id)} className="px-2 py-1 rounded border">
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}
