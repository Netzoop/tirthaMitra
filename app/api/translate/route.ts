import { type NextRequest, NextResponse } from "next/server"
import { getBhashiniService } from "@/lib/bhashini"

// Mock Bhashini API response for demo
// In production, replace with actual Bhashini API calls
const MOCK_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    // English to Hindi translations
    "Kumbh Mela Guide": "कुंभ मेला गाइड",
    Welcome: "स्वागत",
    Events: "कार्यक्रम",
    Map: "नक्शा",
    "Pilgrim Info": "तीर्थयात्री जानकारी",
    "Lost & Found": "खोया पाया",
    Settings: "सेटिंग्स",
    "Admin Dashboard": "एडमिन डैशबोर्ड",
    "Event Management": "कार्यक्रम प्रबंधन",
    Gamification: "गेमिफिकेशन",
    "Offline Mode": "ऑफलाइन मोड",
    Language: "भाषा",
    "Voice Search": "आवाज खोज",
    "Kiosk Mode": "कियोस्क मोड",
    "Live Alerts": "लाइव अलर्ट",
    "Eco Challenge": "इको चैलेंज",
    "AR/VR Tour": "एआर/वीआर टूर",
  },
  hi: {
    // Hindi to English translations
    "कुंभ मेला गाइड": "Kumbh Mela Guide",
    स्वागत: "Welcome",
    कार्यक्रम: "Events",
    नक्शा: "Map",
    "तीर्थयात्री जानकारी": "Pilgrim Info",
    "खोया पाया": "Lost & Found",
    सेटिंग्स: "Settings",
    "एडमिन डैशबोर्ड": "Admin Dashboard",
    "कार्यक्रम प्रबंधन": "Event Management",
    गेमिफिकेशन: "Gamification",
    "ऑफलाइन मोड": "Offline Mode",
    भाषा: "Language",
    "आवाज खोज": "Voice Search",
    "कियोस्क मोड": "Kiosk Mode",
    "लाइव अलर्ट": "Live Alerts",
    "इको चैलेंज": "Eco Challenge",
    "एआर/वीआर टूर": "AR/VR Tour",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json()

    const bhashiniService = getBhashiniService()

    // For demo, use mock translations
    // In production, uncomment the line below:
    // const result = await bhashiniService.translateWithBhashini({ text, sourceLang, targetLang })

    let translatedText = text

    if (sourceLang === "en" && targetLang === "hi") {
      translatedText = MOCK_TRANSLATIONS.en[text] || text
    } else if (sourceLang === "hi" && targetLang === "en") {
      translatedText = MOCK_TRANSLATIONS.hi[text] || text
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      translatedText,
      sourceLang,
      targetLang,
    })
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}
