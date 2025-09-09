"use client"

import { useEffect, useRef, useState } from "react"

export function VoiceButton({ onText }: { onText: (t: string) => void }) {
  const [active, setActive] = useState(false)
  const recRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (SpeechRecognition) {
      recRef.current = new SpeechRecognition()
      recRef.current.lang = "en-US"
      recRef.current.continuous = false
      recRef.current.onresult = (e: any) => {
        const t = e.results?.[0]?.[0]?.transcript
        if (t) onText(t)
        setActive(false)
      }
      recRef.current.onend = () => setActive(false)
    }
  }, [onText])

  function toggle() {
    if (!recRef.current) {
      alert("Speech API not available in this browser.")
      return
    }
    if (active) {
      recRef.current.stop()
      setActive(false)
    } else {
      recRef.current.start()
      setActive(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`text-sm px-3 py-2 rounded border ${active ? "bg-[#2E5AAC] text-white border-transparent" : "bg-white text-slate-800"}`}
    >
      {active ? "Listening..." : "Voice Search"}
    </button>
  )
}

export function KioskButton() {
  const enter = async () => {
    if (document.fullscreenElement) return
    await document.documentElement.requestFullscreen().catch(() => {})
  }
  const exit = async () => {
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {})
  }
  return (
    <div className="flex gap-2">
      <button onClick={enter} className="text-sm px-3 py-2 rounded border bg-white">
        Enter Kiosk
      </button>
      <button onClick={exit} className="text-sm px-3 py-2 rounded border bg-white">
        Exit
      </button>
    </div>
  )
}
