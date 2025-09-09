import { AppShell } from "@/components/app-shell"
import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"

type Section = { heading: string; body: string }
type InfoPage = { title: string; intro: string; sections: Section[] }

async function getInfo(slug: string): Promise<InfoPage | null> {
  const file = path.join(process.cwd(), "data", "pilgrim-info.json")
  try {
    const raw = await fs.readFile(file, "utf8")
    const json = JSON.parse(raw) as Record<string, InfoPage>
    return json[slug] || null
  } catch {
    return null
  }
}

export default async function InfoDetail({ params }: { params: { slug: string } }) {
  const page = await getInfo(params.slug)
  return (
    <AppShell>
      {!page ? (
        <div>
          <p className="text-sm">Section not found.</p>
          <Link href="/pilgrim-info" className="text-sm text-[#2E5AAC] underline mt-2 inline-block">Back</Link>
        </div>
      ) : (
        <div className="space-y-3">
          <h1 className="text-lg font-semibold text-[#2E5AAC]">{page.title}</h1>
          <p className="text-sm text-slate-700">{page.intro}</p>
          <div className="space-y-3">
            {page.sections.map((s, i) => (
              <div key={i} className="border rounded p-3">
                <p className="text-sm font-semibold">{s.heading}</p>
                <p className="text-sm text-slate-700">{s.body}</p>
              </div>
            ))}
          </div>
          {params.slug === "cultural-immersion" && (
            <div className="flex gap-2">
              <Link href="/pilgrim-info/cultural-immersion/gallery" className="text-sm px-3 py-2 rounded border">
                Gallery
              </Link>
              <Link href="/pilgrim-info/cultural-immersion/history" className="text-sm px-3 py-2 rounded border">
                History
              </Link>
            </div>
          )}
          <Link href="/pilgrim-info" className="text-sm text-[#2E5AAC] underline inline-block">Back to menu</Link>
        </div>
      )}
    </AppShell>
  )
}


