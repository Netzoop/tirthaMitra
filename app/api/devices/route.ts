import { NextResponse } from "next/server"
import { z } from "zod"
import { DeviceSchema, listDevices, saveDevices, generateId } from "@/lib/store"

export async function GET() {
  const items = await listDevices()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = DeviceSchema.partial().parse(body)
    const items = await listDevices()
    const id = parsed.id ?? generateId("dev")
    const now = new Date().toISOString()
    const existing = items.find((d) => d.id === id)
    const next = existing
      ? items.map((d) => (d.id === id ? { ...d, label: parsed.label ?? d.label, lastSeenAt: now } : d))
      : [{ id, label: parsed.label, lastSeenAt: now }, ...items]
    await saveDevices(next)
    return NextResponse.json({ id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}

