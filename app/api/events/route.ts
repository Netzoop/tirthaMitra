import { NextResponse } from "next/server"
import { z } from "zod"
import { EventSchema, listEvents, saveEvents, generateId } from "@/lib/store"

export async function GET() {
  const items = await listEvents()
  return NextResponse.json(items)
}

const CreateEventSchema = EventSchema.omit({ id: true })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = CreateEventSchema.parse(body)
    const items = await listEvents()
    const item = { ...parsed, id: generateId("ev") }
    await saveEvents([...items, item])
    return NextResponse.json(item, { status: 201 })
  } catch (e) {
    const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid payload" }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const items = await listEvents()
    const next = items.filter((e) => e.id !== id)
    await saveEvents(next)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
