import { AppShell } from "@/components/app-shell"
import Link from "next/link"

export default function GalleryPage() {
  const images = [
    { src: "/Shashi_Snana.png", alt: "Shahi Snan procession" },
    { src: "/Etiquette.png", alt: "Darshan etiquette at ghats" },
    { src: "/History.png", alt: "History montage of Simhastha" },
  ]
  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Cultural Gallery</h1>
      <div className="grid grid-cols-1 gap-3">
        {images.map((img) => (
          <figure key={img.src} className="border rounded overflow-hidden">
            <img src={img.src} alt={img.alt} className="w-full h-auto" />
            <figcaption className="text-xs text-slate-600 p-2">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
      <Link href="/pilgrim-info/cultural-immersion" className="inline-block mt-3 text-sm text-[#2E5AAC] underline">
        Back
      </Link>
    </AppShell>
  )
}


