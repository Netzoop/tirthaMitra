"use client"

import type React from "react"

import Link from "next/link"

export function Tile({
  href,
  title,
  subtitle,
  color = "#2E5AAC",
}: { href: string; title: string; subtitle?: string; color?: string }) {
  return (
    <Link href={href} className="rounded-lg p-4 text-white" style={{ backgroundColor: color }}>
      <div className="text-pretty">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle ? <p className="text-sm opacity-90">{subtitle}</p> : null}
      </div>
    </Link>
  )
}

export function TileGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}
