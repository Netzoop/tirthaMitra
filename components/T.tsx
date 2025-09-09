"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n"

type Props = {
  k?: string
  children: string
  as?: keyof JSX.IntrinsicElements
  className?: string
}

export default function T({ k, children, as = "span", className }: Props) {
  const { t, lang, translateText } = useI18n()
  const [text, setText] = useState<string>(children)

  useEffect(() => {
    const staticVal = k ? t(k) : undefined
    if (staticVal && staticVal !== k) {
      setText(staticVal)
      return
    }
    if (lang === "hi") {
      translateText(children, "hi").then(setText).catch(() => setText(children))
    } else {
      setText(children)
    }
  }, [k, children, lang, t, translateText])

  const Comp: any = as
  return <Comp className={className}>{text}</Comp>
}


