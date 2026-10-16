import { SPONSORS } from '../data/eventData'

/**
 * Returns a simple fictional geometric vector mark for partners.
 */
function FictionalBadge({ id }) {
  switch (id) {
    case 's1': // Aether Dynamics (Prism / Diamond)
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="20,4 36,20 20,36 4,20" />
          <polygon points="20,12 28,20 20,28 12,20" stroke="var(--teal)" strokeWidth="1.5" />
        </svg>
      )
    case 's2': // CodePulse Labs (Pulse Hex)
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--teal)]" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" />
          <path d="M12 20 L17 20 L20 14 L23 26 L26 20 L30 20" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 's3': // Vortex Gaming (Trident / Shield)
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--red)]" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="20" r="14" />
          <path d="M14 16 L20 10 L26 16 M20 10 L20 30" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 's4': // Indus Soundworks (Sound rings)
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="20" r="6" fill="var(--teal)" />
          <circle cx="20" cy="20" r="12" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx="20" cy="20" r="17" stroke="var(--red)" strokeWidth="1" opacity="0.6" />
        </svg>
      )
    case 's5': // ByteForge Studio (Geometric Cube)
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--teal)]" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="20,6 34,14 20,22 6,14" />
          <polygon points="6,14 20,22 20,34 6,26" fill="rgba(46,196,182,0.2)" />
          <polygon points="34,14 20,22 20,34 34,26" fill="rgba(255,182,39,0.2)" />
        </svg>
      )
    case 's6': // Kavach Systems (Geometric Shield)
    default:
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 L32 12 V22 C32 29 20 35 20 35 C20 35 8 29 8 22 V12 Z" />
          <path d="M15 20 L19 24 L25 16" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}

/**
 * Sponsors / Partners Section.
 * Strictly fictional student competition partners with simple inline SVG badges.
 * Quiet and consistent design.
 */
export default function Sponsors() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 reveal" aria-label="Festival Partners">
      <div className="text-center mb-10">
        <h2 className="display text-2xl sm:text-4xl text-[var(--gold)]">Event Partners & Patrons</h2>
        <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-lg mx-auto">
          Fictional academic and industry collaborations supporting student project prizes, lab kits, and tech logistics.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPONSORS.map(sponsor => (
          <div
            key={sponsor.id}
            className="card p-4 flex flex-col items-center text-center justify-center min-h-[140px]"
          >
            <div className="mb-2">
              <FictionalBadge id={sponsor.id} />
            </div>
            <div className="font-bold text-xs sm:text-sm text-[var(--cream)]">
              {sponsor.name}
            </div>
            <div className="text-[10px] text-[var(--teal)] font-medium mt-0.5">
              {sponsor.role}
            </div>
            <div className="text-[10px] opacity-50 mt-0.5 truncate max-w-full">
              {sponsor.category}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
