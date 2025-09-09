"use client"

export function MapCard() {
  return (
    <div className="rounded-lg border overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d368.5903830888306!2d75.7639976!3d23.1861112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396374346692a17b%3A0xabbcbafbde84a6d5!2sShri%20Ram%20Ghat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="180"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[180px]"
        title="Shri Ram Ghat Map"
      />
      <div className="p-3 text-sm text-slate-700">
        Live Info: Crowd Level Moderate • Weather: Clear • Next Aarti in 20 min
      </div>
    </div>
  )
}
