"use client"

import { AppShell } from "@/components/app-shell"
import { useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", count: 1200 },
  { day: "Tue", count: 1800 },
  { day: "Wed", count: 1600 },
  { day: "Thu", count: 2000 },
  { day: "Fri", count: 2400 },
  { day: "Sat", count: 2800 },
]

export default function AdminDashboard() {
  useEffect(() => {
    if (!localStorage.getItem("tm_admin")) {
      window.location.href = "/admin/login"
    }
  }, [])

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="border rounded p-3">
          <p className="text-xs text-slate-600">Pilgrims Today</p>
          <p className="text-xl font-bold">2,843</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-xs text-slate-600">Events Active</p>
          <p className="text-xl font-bold">8</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-xs text-slate-600">Eco Points</p>
          <p className="text-xl font-bold">18,420</p>
        </div>
      </div>

      <div className="border rounded p-3 mt-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2E5AAC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest alerts and recent tickets */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <LatestAlerts />
        <RecentTickets />
        <LeaderboardMini />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <a href="/admin/events" className="border rounded p-3 hover:bg-[#F5F9FC]">
          Manage Events
        </a>
        <a href="/admin/lost-found" className="border rounded p-3 hover:bg-[#F5F9FC]">
          Lost &amp; Found Mgmt
        </a>
      </div>
    </AppShell>
  )
}

function LatestAlerts() {
  const { data } = useSWR<any[]>("/api/alerts", fetcher)
  const rows = (data || []).slice(0, 5)
  return (
    <div className="border rounded p-3">
      <p className="text-sm font-semibold mb-2">Latest Alerts</p>
      <ul className="text-sm space-y-1">
        {rows.length === 0 ? <li className="text-slate-500">No alerts</li> : rows.map((a) => <li key={a.id}>• {a.message}</li>)}
      </ul>
    </div>
  )
}

function LeaderboardMini() {
  const { data } = useSWR<any>("/api/gamification", fetcher)
  const top = (data?.scores || []).slice(0, 5).sort((a: any, b: any) => b.points - a.points)
  return (
    <div className="border rounded p-3">
      <p className="text-sm font-semibold mb-2">Top Eco Points</p>
      <ol className="text-sm list-decimal list-inside space-y-1">
        {top.length === 0 ? <li className="text-slate-500 list-none">No data</li> : top.map((s: any) => <li key={s.id}>{s.name} — {s.points}</li>)}
      </ol>
    </div>
  )
}

function RecentTickets() {
  const { data } = useSWR<any[]>("/api/tickets", fetcher)
  const rows = (data || []).slice(0, 5)
  return (
    <div className="border rounded p-3">
      <p className="text-sm font-semibold mb-2">Recent Tickets</p>
      <ul className="text-sm space-y-1">
        {rows.length === 0 ? (
          <li className="text-slate-500">No tickets</li>
        ) : (
          rows.map((t) => (
            <li key={t.id}>
              {t.id}: {t.description} — {t.status}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
