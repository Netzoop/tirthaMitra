"use client"

import { AppShell } from "@/components/app-shell"
import { useEffect, useRef } from "react"

export default function ArVrPage({ params }: { params: { id: string } }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    // Placeholder: load a hosted 360/AR scene (replace with real provider)
  }, [params.id])

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">AR/VR Tour</h1>
      <div className="rounded overflow-hidden border">
        <iframe
          ref={iframeRef}
          src="https://storage.googleapis.com/vrview/2.0/index.html?image=https://storage.googleapis.com/vrview/examples/coral.jpg"
          title="AR/VR"
          width="100%"
          height="360"
          allowFullScreen
          className="w-full h-[360px]"
        />
      </div>
      <p className="text-sm text-slate-600 mt-2">This is a placeholder 360° scene. Replace with WebXR/A‑Frame or provider.</p>
    </AppShell>
  )
}


