import { AppShell } from "@/components/app-shell"

export default function AboutPage() {
  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Flows & Mockups</h1>
      <div className="space-y-4">
        <figure className="border rounded p-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q7pzp1KzMqOXN9xfPyWRLwokMXJDj3.png"
            alt="Admin flow diagram"
            className="w-full h-auto rounded"
          />
          <figcaption className="text-xs text-slate-600 mt-2">Admin Flow</figcaption>
        </figure>
        <figure className="border rounded p-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lxn35EMYVQciYrDi5sJclozdq1RW1i.png"
            alt="User/Tirthayatri flow diagram"
            className="w-full h-auto rounded"
          />
          <figcaption className="text-xs text-slate-600 mt-2">User / Tirthayatri Flow</figcaption>
        </figure>
      </div>
    </AppShell>
  )
}
