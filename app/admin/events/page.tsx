"use client"

import { AppShell } from "@/components/app-shell"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

type Row = { id: string; title: string; time: string; location: string }

export default function AdminEvents() {
  const { data, mutate } = useSWR<Row[]>("/api/events", fetcher)
  const rows = data || []
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("tm_admin")) {
      window.location.href = "/admin/login"
    }
  }, [])

  function add() {
    if (!title || !time || !location) return
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, time, location }),
    }).then(() => mutate())
    setTitle("")
    setTime("")
    setLocation("")
  }

  function remove(id: string) {
    fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => mutate())
  }

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Manage Events</h1>

      <div className="border rounded p-3 mb-3 grid grid-cols-3 gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded p-2 text-sm"
        />
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time"
          className="border rounded p-2 text-sm"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border rounded p-2 text-sm"
        />
        <button onClick={add} className="col-span-3 text-sm px-3 py-2 rounded bg-[#2E5AAC] text-white">
          Add New Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-[#F5F9FC]">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.title}</td>
                <td className="p-2">{r.time}</td>
                <td className="p-2">{r.location}</td>
                <td className="p-2 text-right">
                  <button onClick={() => remove(r.id)} className="px-2 py-1 rounded border">
                    Delete
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
