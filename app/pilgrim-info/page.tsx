"use client"

import { AppShell } from "@/components/app-shell"
import { Tile, TileGrid } from "@/components/tiles"
import { useI18n } from "@/lib/i18n"

const items = [
  { href: "/pilgrim-info/cultural-immersion", titleKey: "pilgrim.cultural.title", subKey: "pilgrim.cultural.subtitle" },
  { href: "/pilgrim-info/health-hygiene", titleKey: "pilgrim.health.title", subKey: "pilgrim.health.subtitle" },
  { href: "/pilgrim-info/eco-awareness", titleKey: "pilgrim.eco.title", subKey: "pilgrim.eco.subtitle" },
  { href: "/pilgrim-info/food-water", titleKey: "pilgrim.food.title", subKey: "pilgrim.food.subtitle" },
  { href: "/pilgrim-info/transport-routes", titleKey: "pilgrim.transport.title", subKey: "pilgrim.transport.subtitle" },
  { href: "/pilgrim-info/ar-vr-tours", titleKey: "pilgrim.arvr.title", subKey: "pilgrim.arvr.subtitle" },
]

export default function InfoPage() {
  const { t } = useI18n()
  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">{t("pilgrim.heading")}</h1>
      <TileGrid>
        {items.map((i) => (
          <Tile key={i.href} href={i.href} title={t(i.titleKey)} subtitle={t(i.subKey)} />
        ))}
      </TileGrid>
    </AppShell>
  )
}
