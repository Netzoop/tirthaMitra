import { NextResponse } from "next/server"
import { z } from "zod"
import { EcoTaskSchema, listTasks, saveTasks, listScores, saveScores, generateId, UserScoreSchema } from "@/lib/store"

export async function GET() {
  const [tasks, scores] = await Promise.all([listTasks(), listScores()])
  return NextResponse.json({ tasks, scores })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (body.type === "task:add") {
    try {
      const parsed = EcoTaskSchema.omit({ id: true }).parse(body.payload)
      const tasks = await listTasks()
      const item = { ...parsed, id: generateId("task") }
      await saveTasks([...tasks, item])
      return NextResponse.json(item, { status: 201 })
    } catch (e) {
      const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid task" }
      return NextResponse.json({ error: message }, { status: 400 })
    }
  }
  if (body.type === "score:add") {
    try {
      const parsed = UserScoreSchema.omit({ id: true }).parse(body.payload)
      const scores = await listScores()
      const item = { ...parsed, id: generateId("user") }
      await saveScores([...scores, item])
      return NextResponse.json(item, { status: 201 })
    } catch (e) {
      const message = e instanceof z.ZodError ? e.flatten() : { message: "Invalid score" }
      return NextResponse.json({ error: message }, { status: 400 })
    }
  }
  return NextResponse.json({ error: "Unsupported operation" }, { status: 400 })
}

