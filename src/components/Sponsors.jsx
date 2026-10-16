import { SPONSORS } from '../data/eventData'

/**
 * Returns clean, neutral generic placeholder geometric vector marks.
 */
function GenericBadge({ index }) {
  const shapes = [
    // Hexagon
    <polygon key="hex" points="20,4 34,12 34,28 20,36 6,28 6,12" stroke="var(--gold)" strokeWidth="1.5" />,
    // Diamond
    <polygon key="dia" points="20,4 36,20 20,36 4,20" stroke="var(--teal)" strokeWidth="1.5" />,
    // Circle
    <circle key="cir" cx="20" cy="20" r="14" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 3" />,
    // Shield
    <path key="shd" d="M20 6 L32 12 V22 C32 29 20 35 20 35 C20 35 8 29 8 22 V12 Z" stroke="var(--teal)" strokeWidth="1.5" />,
    // Concentric Square
    <rect key="sqr" x="8" y="8" width="24" height="24" rx="3" stroke="var(--gold)" strokeWidth="1.5" />,
    // Star polygon
    <polygon key="str" points="20,5 24,14 34,14 26,20 29,30 20,24 11,30 14,20 6,14 16,14" stroke="var(--teal)" strokeWidth="1.5" />,
  ]

  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-60" fill="none">
      {shapes[index % shapes.length]}
    </svg>
  )
}

/**
 * Partners & Patrons Section.
 * Neutral placeholder badges indicating available partnership opportunities.
 */
export default function Sponsors() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 reveal" aria-label="Partners and Patrons">
      <div className="text-center mb-10">
        <h2 className="display text-2xl sm:text-4xl text-[var(--gold)]">Partners & Patrons</h2>
        <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-lg mx-auto">
          To be announced
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPONSORS.map((slot, index) => (
          <div
            key={slot.id}
            className="card p-4 flex flex-col items-center text-center justify-center min-h-[130px] border-dashed border-white/15"
          >
            <div className="mb-2">
              <GenericBadge index={index} />
            </div>
            <div className="text-xs font-semibold text-[var(--cream)] opacity-80">
              {slot.label}
            </div>
            <div className="text-[10px] opacity-40 mt-0.5">
              Partner slot
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
