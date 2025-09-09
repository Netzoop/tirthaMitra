"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"

const nav = [
  { href: "/", labelKey: "nav.home", icon: "🏠" },
  { href: "/events", labelKey: "nav.events", icon: "📅" },
  { href: "/pilgrim-info", labelKey: "nav.info", icon: "ℹ️" },
  { href: "/gamification", labelKey: "nav.gamification", icon: "🌱" },
  { href: "/lost-found", labelKey: "nav.lostfound", icon: "🔍" },
  { href: "/settings", labelKey: "nav.settings", icon: "⚙️" },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t, lang, setLang } = useI18n()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-gradient-to-r from-[#F5F9FC] to-[#E8F2FF] shadow-sm">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-[#2E5AAC] text-lg">
            🕉️ TirthaMitra
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            {nav.slice(0, 4).map((n) => {
              const active = pathname === n.href
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center ${
                    active
                      ? "bg-[#2E5AAC] text-white shadow-sm"
                      : "text-slate-700 hover:text-[#2E5AAC] hover:bg-white/50"
                  }`}
                >
                  <span className="mr-1 leading-none">{n.icon}</span>
                  {t(n.labelKey)}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "EN" : "हि"}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-2 grid grid-cols-2 gap-2">
              {nav.map((n) => {
                const active = pathname === n.href
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? "bg-[#2E5AAC] text-white" : "text-slate-700 hover:text-[#2E5AAC] hover:bg-slate-50"
                    }`}
                  >
                    <span className="mr-2">{n.icon}</span>
                    {t(n.labelKey)}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-xl px-4 py-4">{children}</main>
    </div>
  )
}
