import { NextResponse } from "next/server"
import { z } from "zod"
import { TicketSchema, listTickets, saveTickets, generateId } from "@/lib/store"

export async function GET() {
  const items = await listTickets()
  return NextResponse.json(items)
}

const CreateTicketSchema = TicketSchema.omit({ id: true, createdAt: true })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = CreateTicketSchema.parse(body)
    const items = await listTickets()
    const item = { ...parsed, id: generateId("tk"), createdAt: new Date().toISOString() }
    await saveTickets([item, ...items])
    return NextResponse.json(item, { status: 201 })
  } catch (e) {
    const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid payload" }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const parsed = TicketSchema.partial().extend({ id: z.string() }).parse(body)
    const items = await listTickets()
    const next = items.map((t) => (t.id === parsed.id ? { ...t, ...parsed } : t))
    await saveTickets(next)
    const updated = next.find((t) => t.id === parsed.id)
    return NextResponse.json(updated)
  } catch (e) {
    const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid payload" }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

