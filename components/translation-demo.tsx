"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { Loader2 } from "lucide-react"

export function TranslationDemo() {
  const { lang, t, translateText, isTranslating } = useI18n()
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    const targetLang = lang === "en" ? "hi" : "en"
    const result = await translateText(inputText, targetLang)
    setTranslatedText(result)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">{t("translation.demo")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("translation.enter_text")}</label>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t("translation.placeholder")}
            className="mt-1"
          />
        </div>

        <Button onClick={handleTranslate} disabled={!inputText.trim() || isTranslating} className="w-full">
          {isTranslating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("translation.translating")}
            </>
          ) : (
            <>{lang === "en" ? t("translation.translate_to_hindi") : t("translation.translate_to_english")}</>
          )}
        </Button>

        {translatedText && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">{t("translation.result")}</p>
            <p className="text-sm">{translatedText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
