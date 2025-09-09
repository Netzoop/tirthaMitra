"use client"

import { AppShell } from "@/components/app-shell"
import { EventList } from "@/components/event-list"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Filter } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n"

export default function EventsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<"all" | "nearby" | "bath" | "cultural">("all")
  return (
    <AppShell>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#2E5AAC] text-balance">📅 {t("events.title_full")}</h1>
            <p className="text-sm text-slate-600 mt-1">{t("events.subtitle")}</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" className="flex items-center gap-1 whitespace-nowrap" onClick={() => setFilter("all")}>
            <Calendar className="w-4 h-4" />
            {t("filter.today")}
          </Button>
          <Button variant={filter === "nearby" ? "default" : "outline"} size="sm" className="flex items-center gap-1 whitespace-nowrap" onClick={() => setFilter("nearby")}>
            <MapPin className="w-4 h-4" />
            {t("filter.nearby")}
          </Button>
          <Button variant={filter === "bath" ? "default" : "outline"} size="sm" className="flex items-center gap-1 whitespace-nowrap" onClick={() => setFilter("bath")}>
            <Filter className="w-4 h-4" />
            {t("filter.baths")}
          </Button>
          <Button variant={filter === "cultural" ? "default" : "outline"} size="sm" className="whitespace-nowrap" onClick={() => setFilter("cultural")}>
            {t("filter.cultural")}
          </Button>
        </div>

        {/* Events List */}
        <EventList filter={filter} />
      </div>
    </AppShell>
  )
}
