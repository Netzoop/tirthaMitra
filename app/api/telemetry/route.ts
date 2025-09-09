import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const file = path.join(process.cwd(), "data", "telemetry.json")

async function readAll() {
  try {
    const raw = await fs.readFile(file, "utf8")
    return JSON.parse(raw) as any[]
  } catch {
    return []
  }
}

async function writeAll(items: any[]) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(items, null, 2), "utf8")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const items = await readAll()
    items.push({ ...body, ts: Date.now() })
    await writeAll(items)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
