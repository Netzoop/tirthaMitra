import Link from "next/link"
import { AppShell } from "@/components/app-shell"
import { fetcher } from "@/lib/fetcher"
import { headers } from "next/headers"

async function getEvent(id: string) {
  const h = headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https")
  const base = host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const all = await fetcher<any[]>(`${base}/api/events`)
  return all.find((e) => e.id === id)
}

export default async function EventDetail({ params }: { params: { id: string } }) {
  const ev = await getEvent(params.id)

  if (!ev) {
    return (
      <AppShell>
        <p>Event not found.</p>
      </AppShell>
    )
  }

  return (
    <AppShell>
      {ev.mapUrl ? (
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(ev.location)}&output=embed`}
          title="Event location map"
          width="100%"
          height="200"
          className="w-full h-[200px] rounded mb-3"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <img
          src={"/placeholder.svg?height=160&width=800&query=Event%20map%20preview"}
          alt="Event map"
          className="rounded w-full h-[160px] object-cover mb-3"
        />
      )}
      <h1 className="text-lg font-semibold text-[#2E5AAC]">{ev.title}</h1>
      <p className="text-sm text-slate-700">
        {ev.time} • {ev.location} • Crowd: {ev.crowd}
      </p>
      <p className="text-sm text-slate-700 mt-2">{ev.description || "Event details will appear here."}</p>

      {ev.mapUrl && (
        <div className="mt-2">
          <a href={ev.mapUrl} target="_blank" rel="noreferrer" className="text-sm text-[#2E5AAC] underline">
            View larger map
          </a>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 rounded bg-[#2E5AAC] text-white text-sm">Join Event</button>
        <a href={`/events/${params.id}/ar`} className="px-3 py-2 rounded border text-sm">Start AR/VR Tour</a>
      </div>

      <Link href="/events" className="inline-block mt-4 text-sm text-[#2E5AAC] underline">
        Back to events
      </Link>
    </AppShell>
  )
}
