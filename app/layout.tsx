import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { I18nProvider } from "@/lib/i18n"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kumbh Mela Digital Guide",
  description: "Your digital companion for the Kumbh Mela pilgrimage - events, navigation, and spiritual guidance",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border px-3 py-1 rounded">Skip to content</a>
        <Suspense fallback={null}>
          <I18nProvider>{children}</I18nProvider>
          <Analytics />
        </Suspense>
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', function() { navigator.serviceWorker.register('/sw.js').catch(()=>{}); }); }`,
          }}
        />
        <main id="main" />
      </body>
    </html>
  )
}
