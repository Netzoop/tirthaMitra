"use client"

import { AppShell } from "@/components/app-shell"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { useEffect, useState } from "react"

type Task = { id: string; title: string; points: number }
type Score = { id: string; name: string; points: number }

export default function GamificationAdmin() {
  const { data, mutate } = useSWR<{ tasks: Task[]; scores: Score[] }>("/api/gamification", fetcher)
  const tasks = data?.tasks || []
  const scores = data?.scores || []
  const [title, setTitle] = useState("")
  const [points, setPoints] = useState<number>(10)
  const [name, setName] = useState("")
  const [userPoints, setUserPoints] = useState<number>(10)

  useEffect(() => {
    if (!localStorage.getItem("tm_admin")) {
      window.location.href = "/admin/login"
    }
  }, [])

  function addTask() {
    if (!title) return
    fetch("/api/gamification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "task:add", payload: { title, points } }),
    }).then(() => mutate())
    setTitle("")
  }

  function addScore() {
    if (!name) return
    fetch("/api/gamification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "score:add", payload: { name, points: userPoints } }),
    }).then(() => mutate())
    setName("")
  }

  const top = [...scores].sort((a, b) => b.points - a.points).slice(0, 10)

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Gamification Admin</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="border rounded p-3">
          <p className="text-sm font-semibold mb-2">Eco Tasks</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <input className="border rounded p-2 text-sm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="border rounded p-2 text-sm" type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
            <button onClick={addTask} className="text-sm px-3 py-2 rounded bg-[#2E5AAC] text-white">Add Task</button>
          </div>
          <ul className="text-sm space-y-1">
            {tasks.map((t) => (
              <li key={t.id}>{t.title} — {t.points} pts</li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <p className="text-sm font-semibold mb-2">Leaderboard (Top 10)</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <input className="border rounded p-2 text-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border rounded p-2 text-sm" type="number" value={userPoints} onChange={(e) => setUserPoints(Number(e.target.value))} />
            <button onClick={addScore} className="text-sm px-3 py-2 rounded bg-[#2E5AAC] text-white">Add Points</button>
          </div>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            {top.map((s) => (
              <li key={s.id}>{s.name} — {s.points}</li>
            ))}
          </ol>
        </div>
      </div>
    </AppShell>
  )
}


