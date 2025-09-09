"use client"

import { AppShell } from "@/components/app-shell"
import { TranslationDemo } from "@/components/translation-demo"
import { clearAllCache, getCache, setCache } from "@/lib/offline-cache"
import { useI18n } from "@/lib/i18n"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const { lang, setLang } = useI18n()
  const [offlineSeeded, setOfflineSeeded] = useState(false)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const on = () => setOnline(navigator.onLine)
    on()
    window.addEventListener("online", on)
    window.addEventListener("offline", on)
    return () => {
      window.removeEventListener("online", on)
      window.removeEventListener("offline", on)
    }
  }, [])

  function seedOffline() {
    setCache("alerts", [{ id: "a1", type: "info", message: "Offline demo: cached advisory loaded." }])
    setCache("events", [
      { id: "1", title: "Ganga Aarti", time: "6:00 PM", location: "Main Ghat", crowd: "High" },
      { id: "2", title: "Cultural Parade", time: "10:00 AM", location: "City Square", crowd: "Moderate" },
    ])
    setOfflineSeeded(true)
  }

  function clearOffline() {
    clearAllCache()
    setOfflineSeeded(false)
  }

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Settings</h1>

      <div className="border rounded p-3 mb-3">
        <p className="text-sm mb-2">Language</p>
        <div className="flex gap-2">
          <button
            onClick={() => setLang("en")}
            className={`text-sm px-3 py-2 rounded border ${lang === "en" ? "bg-[#2E5AAC] text-white border-transparent" : "bg-white"}`}
          >
            English
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`text-sm px-3 py-2 rounded border ${lang === "hi" ? "bg-[#2E5AAC] text-white border-transparent" : "bg-white"}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      <div className="mb-3">
        <TranslationDemo />
      </div>

      <div className="border rounded p-3 mb-3">
        <p className="text-sm mb-2">Offline Mode (Demo)</p>
        <p className="text-xs text-slate-600 mb-2">Preload data so core pages continue to work when offline.</p>
        <div className="flex gap-2">
          <button onClick={seedOffline} className="text-sm px-3 py-2 rounded border bg-white">
            Preload
          </button>
          <button onClick={clearOffline} className="text-sm px-3 py-2 rounded border bg-white">
            Clear Cache
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Status: {online ? "Online" : "Offline"} • Cache: {offlineSeeded || !!getCache("events") ? "Ready" : "Empty"}
        </p>
      </div>

      <div className="border rounded p-3">
        <p className="text-sm mb-2">Kiosk Mode</p>
        <p className="text-xs text-slate-600 mb-2">Use browser fullscreen to simulate a locked kiosk.</p>
        <p className="text-xs">Use the header buttons on Home to enter/exit kiosk.</p>
      </div>
    </AppShell>
  )
}
