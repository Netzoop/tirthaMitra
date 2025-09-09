import { AppShell } from "@/components/app-shell"
import Link from "next/link"

const content = `Ujjain's Simhastha Kumbh Mela: A Confluence of Faith and Liberation\n\nThe Simhastha Kumbh Mela in Ujjain is a revered Hindu pilgrimage, drawing millions of devotees to the sacred banks of the Shipra River. This grand spiritual gathering, held every 12 years when Jupiter enters the zodiac sign of Leo (Simha), is steeped in history, rich with ancient rituals, and imbued with profound spiritual significance.\n\nA Glimpse into its Origins and History\n\nThe Simhastha at Ujjain, in its present form, traces its roots to the 18th century. It was during this period that the Maratha ruler Ranoji Shinde invited ascetics from Nashik to a local festival in Ujjain. This event evolved into the Simhastha, adapting traditions from the Nashik-Trimbak Kumbh Mela.\n\nHistorical accounts from the British era highlight the significance of the Ujjain Simhastha as the only Kumbh Mela organized in a princely state, Gwalior. The Scindia dynasty, who ruled Gwalior, played a crucial role in its organization, including financing a significant portion of the event's expenses. The historical records also document instances of sectarian conflicts between different ascetic groups, which eventually led to the establishment of separate bathing ghats to ensure peace and order during the festival.\n\nRituals: A Spectacle of Devotion\n\nThe rituals of the Simhastha Kumbh Mela are a vibrant display of faith and tradition. The most significant of these is the Shahi Snan (royal bath), where various akharas (sects of sadhus) take a ceremonial dip in the holy Shipra River. These processions of ascetics, often accompanied by chants, hymns, and traditional music, are a major attraction of the Mela.\n\nOther important rituals include:\n• Peshwai Procession: The grand arrival of the members of an akhara at the Kumbh Mela.\n• Darshan: The auspicious sight of revered saints and spiritual leaders.\n• Religious Discourses and Debates: Scholars and saints engage in discussions on Hindu philosophy and scriptures.\n• Kalpvas: A period of penance where devotees live by the river, meditating and performing rituals.\n\nThe Spiritual Significance: A Path to Liberation\n\nThe spiritual importance of the Simhastha Kumbh Mela is deeply embedded in Hindu mythology. The most popular legend revolves around the Samudra Manthan (churning of the ocean), from which a pot (kumbh) of amrit (nectar of immortality) emerged. During a celestial struggle between the gods and demons for the possession of this nectar, a few drops are believed to have fallen at four sacred places: Haridwar, Prayagraj, Nashik, and Ujjain.\n\nA holy dip in the Shipra River during the Simhastha is believed to cleanse devotees of their sins and liberate them from the cycle of rebirth (moksha). The city of Ujjain holds special significance as it is home to the Mahakaleshwar Jyotirlinga, one of the twelve most sacred shrines dedicated to Lord Shiva. The unique celestial alignment of Jupiter in Leo during the Simhastha is considered to be a highly auspicious time, amplifying the spiritual potency of the pilgrimage.\n\nThe next Simhastha Kumbh Mela in Ujjain is scheduled to take place in 2028, and is anticipated to be a grand spectacle of faith, attracting pilgrims from all corners of the globe.`

export default function CulturalHistoryPage() {
  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-2">Simhastha History</h1>
      <div className="border rounded p-3 max-h-[60vh] overflow-y-auto whitespace-pre-line text-sm text-slate-800">
        {content}
      </div>
      <Link href="/pilgrim-info/cultural-immersion" className="inline-block mt-3 text-sm text-[#2E5AAC] underline">
        Back
      </Link>
    </AppShell>
  )
}


