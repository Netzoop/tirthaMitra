"use client"

import { AppShell } from "@/components/app-shell"
import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n"

type Task = { id: string; key: string; status: "Pending" | "In Progress" | "Completed" }

const initial: Task[] = [
  { id: "t1", key: "gamification.task.use_bins", status: "In Progress" },
  { id: "t2", key: "gamification.task.refill_bottle", status: "Completed" },
  { id: "t3", key: "gamification.task.carpool", status: "Pending" },
  { id: "t4", key: "gamification.task.share_tips", status: "Pending" },
]

export default function GamificationPage() {
  const { t } = useI18n()
  const [tasks, setTasks] = useState<Task[]>([])
  const [points, setPoints] = useState(120)

  useEffect(() => {
    setTasks(initial)
  }, [])

  function toggleComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t)),
    )
    setPoints((p) => p + 10)
  }

  const progress = Math.min(100, Math.round(((points % 200) / 200) * 100))
  const badgeStages = [
    { min: 0, key: "gamification.badge.seedling", color: "#E6F7EE", text: "#256B3E", ring: "#42A25E", emoji: "🌱" },
    { min: 100, key: "gamification.badge.sapling", color: "#E8F5FF", text: "#0B5AAA", ring: "#2E5AAC", emoji: "🌿" },
    { min: 200, key: "gamification.badge.tree", color: "#FFF4E6", text: "#8A4B00", ring: "#F4A261", emoji: "🌳" },
    { min: 300, key: "gamification.badge.river_guardian", color: "#E9F2FF", text: "#1E3A8A", ring: "#60A5FA", emoji: "💧" },
  ] as const
  const currentIdx = badgeStages.findLastIndex((b) => points >= b.min)
  const currentBadge = badgeStages[Math.max(0, currentIdx)]

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-2">{t("gamification.title")}</h1>
      <div className="border rounded p-3 mb-3">
        <p className="text-sm">
          {t("gamification.points")}: <span className="font-semibold">{points}</span>
        </p>
        <div className="h-2 bg-slate-200 rounded mt-2">
          <div className="h-2 bg-[#42A25E] rounded" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-slate-600 mt-1">{t("gamification.progress")}</p>

        {/* Badges row */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {badgeStages.map((b, idx) => {
            const achieved = points >= b.min
            return (
              <div
                key={b.key}
                className={`px-3 py-1 rounded-full border text-xs whitespace-nowrap ${
                  achieved ? "border-transparent" : "border-slate-300 opacity-60"
                }`}
                style={{ backgroundColor: achieved ? b.color : "#FFFFFF", color: achieved ? b.text : "#334155" }}
              >
                <span className="mr-1">{b.emoji}</span>
                {t(b.key)}
                {idx === currentIdx ? <span className="ml-2 inline-block w-2 h-2 rounded-full" style={{ backgroundColor: b.ring }} /> : null}
              </div>
            )
          })}
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {t("gamification.current_badge")}: <span className="font-medium">{t(currentBadge.key)}</span>
        </p>
      </div>

      <div className="space-y-2">
        {tasks.map((tsk) => (
          <div key={tsk.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <p className="text-sm font-medium">{t(tsk.key)}</p>
              <p className="text-xs text-slate-600">{t(
                tsk.status === "Completed"
                  ? "gamification.status.completed"
                  : tsk.status === "In Progress"
                  ? "gamification.status.in_progress"
                  : "gamification.status.pending",
              )}</p>
            </div>
            <button className="text-sm px-3 py-1 rounded border" onClick={() => toggleComplete(tsk.id)}>
              {tsk.status === "Completed" ? t("gamification.mark_pending") : t("gamification.complete")}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
