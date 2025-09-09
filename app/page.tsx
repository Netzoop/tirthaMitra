"use client"

import { AppShell } from "@/components/app-shell"
import { MapCard } from "@/components/map-card"
import { AlertBanner } from "@/components/alert-banner"
import { Tile, TileGrid } from "@/components/tiles"
import { EventList } from "@/components/event-list"
import { VoiceButton, KioskButton } from "@/components/voice-and-kiosk"
import { useI18n } from "@/lib/i18n"
import T from "@/components/T"

export default function HomePage() {
  const { t } = useI18n()
  return (
    <AppShell>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-balance text-[#2E5AAC]">🕉️ <T k="app.title">Kumbh Mela Guide</T></h1>
        <KioskButton />
      </div>

      <AlertBanner />
      <MapCard />

      <div className="my-4">
        <h2 className="text-base font-semibold mb-2"><T k="events.upcoming">Upcoming Events</T></h2>
        <TileGrid>
          <Tile href="/events" title={t("events.title")} subtitle={t("events.upcoming")} />
          <Tile href="/pilgrim-info" title={t("pilgrim.title")} subtitle={t("pilgrim.guidelines")} />
          <Tile href="/gamification" title={t("gamification.title")} subtitle={t("gamification.badges")} color="#42A25E" />
          <Tile href="/lost-found" title={t("lostfound.title")} subtitle={t("lostfound.report")} color="#2E5AAC" />
          <Tile href="/settings" title={t("nav.settings")} subtitle={t("settings.offline")} color="#2E5AAC" />
          <Tile href="/about" title={t("nav.about")} subtitle="Flows & mockups" color="#2E5AAC" />
        </TileGrid>
      </div>

      <div className="my-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">{t("events.upcoming")}</h2>
        <VoiceButton onText={(t) => alert(`Voice captured: ${t}`)} />
      </div>
      <EventList compact />
    </AppShell>
  )
}
