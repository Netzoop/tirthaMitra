"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Dict = Record<string, string>
type Lang = "en" | "hi"

type I18nCtx = {
  lang: Lang
  t: (key: string) => string
  setLang: (l: Lang) => void
  translateText: (text: string, targetLang?: Lang) => Promise<string>
  isTranslating: boolean
}

const Ctx = createContext<I18nCtx | null>(null)

const LS_KEY = "tm_lang"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")
  const [dict, setDict] = useState<Dict>({})
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    const stored = (localStorage.getItem(LS_KEY) as Lang) || "en"
    setLangState(stored)
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/i18n/${lang}.json`)
        const json = (await res.json()) as Dict
        setDict(json)
      } catch (error) {
        console.log("[v0] Static translations not found, using dynamic translation")
        setDict({})
      }
    }
    load()
  }, [lang])

  function setLang(l: Lang) {
    localStorage.setItem(LS_KEY, l)
    setLangState(l)
  }

  async function translateText(text: string, targetLang: Lang = lang): Promise<string> {
    if (!text) return text

    setIsTranslating(true)
    try {
      const sourceLang = targetLang === "hi" ? "en" : "hi"

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
        }),
      })

      if (!response.ok) {
        throw new Error("Translation request failed")
      }

      const result = await response.json()
      return result.translatedText
    } catch (error) {
      console.error("Translation failed:", error)
      return text
    } finally {
      setIsTranslating(false)
    }
  }

  const value = useMemo<I18nCtx>(() => {
    return {
      lang,
      setLang,
      t: (key: string) => dict[key] || key,
      translateText,
      isTranslating,
    }
  }, [lang, dict, isTranslating])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
