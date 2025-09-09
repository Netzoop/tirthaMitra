import { NextResponse } from "next/server"
import { z } from "zod"
import { AlertSchema, listAlerts, saveAlerts, generateId } from "@/lib/store"

export async function GET() {
  const items = await listAlerts()
  return NextResponse.json(items)
}

const CreateAlertSchema = AlertSchema.omit({ id: true })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = CreateAlertSchema.parse(body)
    const items = await listAlerts()
    const item = { ...parsed, id: generateId("al") }
    await saveAlerts([item, ...items])
    return NextResponse.json(item, { status: 201 })
  } catch (e) {
    const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid payload" }
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
