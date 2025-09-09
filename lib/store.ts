import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

const dataDir = path.join(process.cwd(), "data")

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true })
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir()
  const full = path.join(dataDir, file)
  try {
    const raw = await fs.readFile(full, "utf8")
    return JSON.parse(raw) as T
  } catch {
    await fs.writeFile(full, JSON.stringify(fallback, null, 2), "utf8")
    return fallback
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDir()
  const full = path.join(dataDir, file)
  await fs.writeFile(full, JSON.stringify(data, null, 2), "utf8")
}

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  time: z.string(),
  location: z.string(),
  crowd: z.enum(["Low", "Moderate", "High"]).optional().default("Moderate"),
  description: z.string().optional(),
})
export type EventItem = z.infer<typeof EventSchema>

export const AlertSchema = z.object({
  id: z.string(),
  type: z.enum(["safety", "weather", "info"]).default("info"),
  message: z.string(),
})
export type AlertItem = z.infer<typeof AlertSchema>

export const TicketSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.enum(["Open", "In Progress", "Resolved"]).default("Open"),
  assignee: z.string().optional(),
  createdAt: z.string(),
})
export type TicketItem = z.infer<typeof TicketSchema>

const files = {
  events: "events.json",
  alerts: "alerts.json",
  tickets: "tickets.json",
  tasks: "tasks.json",
  scores: "scores.json",
  devices: "devices.json",
}

export async function listEvents(): Promise<EventItem[]> {
  return readJson<EventItem[]>(files.events, [])
}

export async function saveEvents(items: EventItem[]): Promise<void> {
  await writeJson(files.events, items)
}

export async function listAlerts(): Promise<AlertItem[]> {
  return readJson<AlertItem[]>(files.alerts, [])
}

export async function saveAlerts(items: AlertItem[]): Promise<void> {
  await writeJson(files.alerts, items)
}

export async function listTickets(): Promise<TicketItem[]> {
  return readJson<TicketItem[]>(files.tickets, [])
}

export async function saveTickets(items: TicketItem[]): Promise<void> {
  await writeJson(files.tickets, items)
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

// Gamification
export const EcoTaskSchema = z.object({ id: z.string(), title: z.string(), points: z.number().int().positive() })
export type EcoTask = z.infer<typeof EcoTaskSchema>
export const UserScoreSchema = z.object({ id: z.string(), name: z.string(), points: z.number().int().nonnegative() })
export type UserScore = z.infer<typeof UserScoreSchema>

export async function listTasks(): Promise<EcoTask[]> {
  return readJson<EcoTask[]>(files.tasks, [])
}
export async function saveTasks(items: EcoTask[]): Promise<void> {
  await writeJson(files.tasks, items)
}
export async function listScores(): Promise<UserScore[]> {
  return readJson<UserScore[]>(files.scores, [])
}
export async function saveScores(items: UserScore[]): Promise<void> {
  await writeJson(files.scores, items)
}

// Devices
export const DeviceSchema = z.object({ id: z.string(), label: z.string().optional(), lastSeenAt: z.string() })
export type DeviceItem = z.infer<typeof DeviceSchema>
export async function listDevices(): Promise<DeviceItem[]> {
  return readJson<DeviceItem[]>(files.devices, [])
}
export async function saveDevices(items: DeviceItem[]): Promise<void> {
  await writeJson(files.devices, items)
}


