import { GALLERY_HIGHLIGHTS } from '../data/eventData'

/**
 * Returns clean inline SVG thematic graphics for festival moments without internet images.
 */
function ThematicIllustration({ theme }) {
  switch (theme) {
    case 'code':
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <rect x="10" y="8" width="100" height="54" rx="4" stroke="var(--teal)" strokeWidth="1.5" />
          <line x1="10" y1="20" x2="110" y2="20" stroke="var(--teal)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="14" r="2" fill="var(--red)" />
          <circle cx="28" cy="14" r="2" fill="var(--gold)" />
          <circle cx="36" cy="14" r="2" fill="var(--teal)" />
          <path d="M26 32 L36 40 L26 48" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="44" y1="48" x2="60" y2="48" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="36" x2="85" y2="36" stroke="var(--cream)" strokeWidth="1" opacity="0.6" />
        </svg>
      )
    case 'bot':
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <circle cx="60" cy="35" r="22" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="60" cy="35" r="10" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="4 2" />
          <rect x="25" y="30" width="12" height="10" rx="2" fill="var(--teal)" opacity="0.7" />
          <rect x="83" y="30" width="12" height="10" rx="2" fill="var(--teal)" opacity="0.7" />
          <line x1="40" y1="35" x2="20" y2="22" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="35" x2="100" y2="22" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'gaming':
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <path d="M25 45 C25 25, 45 22, 60 22 C75 22, 95 25, 95 45 C95 55, 82 58, 76 48 L70 40 L50 40 L44 48 C38 58, 25 55, 25 45 Z" stroke="var(--teal)" strokeWidth="1.5" fill="#150f38" />
          <path d="M36 32 L44 32 M40 28 L40 36" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="76" cy="31" r="2.5" fill="var(--red)" />
          <circle cx="84" cy="34" r="2.5" fill="var(--gold)" />
        </svg>
      )
    case 'music':
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <circle cx="45" cy="40" r="14" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="45" cy="40" r="4" fill="var(--teal)" />
          <line x1="45" y1="26" x2="45" y2="12" stroke="var(--gold)" strokeWidth="2" />
          <line x1="45" y1="12" x2="80" y2="16" stroke="var(--gold)" strokeWidth="2" />
          <line x1="80" y1="16" x2="80" y2="34" stroke="var(--gold)" strokeWidth="2" />
          <circle cx="80" cy="38" r="12" stroke="var(--red)" strokeWidth="1.5" />
          <path d="M15 56 Q30 50 45 56 T75 56 T105 56" stroke="var(--teal)" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      )
    case 'theatre':
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <path d="M35 15 C48 15, 54 26, 54 38 C54 50, 44 58, 35 58 C26 58, 16 50, 16 38 C16 26, 22 15, 35 15 Z" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="28" cy="32" r="2" fill="var(--cream)" />
          <circle cx="42" cy="32" r="2" fill="var(--cream)" />
          <path d="M27 44 Q35 50 43 44" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M70 18 Q85 10 100 24 T85 54" stroke="var(--red)" strokeWidth="1.5" fill="none" />
          <circle cx="85" cy="20" r="4" fill="var(--teal)" />
        </svg>
      )
    case 'design':
    default:
      return (
        <svg viewBox="0 0 120 70" className="w-full h-24" fill="none" stroke="currentColor">
          <rect x="35" y="10" width="50" height="52" rx="4" stroke="var(--gold)" strokeWidth="1.5" />
          <line x1="42" y1="20" x2="78" y2="20" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
          <rect x="42" y="27" width="16" height="12" rx="2" stroke="var(--red)" strokeWidth="1" />
          <rect x="62" y="27" width="16" height="12" rx="2" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="42" y1="46" x2="72" y2="46" stroke="var(--cream)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
  }
}

/**
 * Gallery / Festival Atmosphere Showcase.
 * All atmosphere cards are clickable and open the corresponding event detail view (#/event/<id>).
 */
export default function Gallery({ onSelectEvent }) {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 py-16 sm:py-24 reveal">
      <div className="text-center mb-12">
        <h2 className="display text-3xl sm:text-5xl text-[var(--gold)]">Festival Atmosphere</h2>
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Explore iconic festival highlights. Tap any card below to view full problem statements, rules, and schedules.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {GALLERY_HIGHLIGHTS.map(item => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectEvent && onSelectEvent(item.eventId)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelectEvent && onSelectEvent(item.eventId)}
            className="card p-5 flex flex-col justify-between group cursor-pointer hover:border-[var(--gold)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
            aria-label={`View event details for ${item.title}`}
          >
            <div>
              <div className="p-3 rounded-lg bg-black/30 border border-white/5 mb-4 group-hover:border-[var(--gold)]/30 transition-colors">
                <ThematicIllustration theme={item.theme} />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-[var(--teal)] uppercase tracking-wider">{item.track} Track</span>
                <span className="opacity-40">Tap to inspect</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-70 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[var(--gold)] font-bold">
              <span>View Problem Statement & Rules</span>
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
