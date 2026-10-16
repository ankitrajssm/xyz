import { CATS, EVENTS } from '../data/eventData'
import SparkleStar from './SparkleStar'

/**
 * Activities Section: 4 Core festival tracks.
 * High polish, clear track descriptions, shimmering header, and direct links to each featured event detail view.
 * Features quick-add bookmarking into My Plan with star pop.
 */
export default function Activities({ onSelectEvent, isPlanned, onTogglePlan }) {
  return (
    <section id="activities" className="max-w-6xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header with Shimmer & Twinkle Star */}
      <div className="text-center mb-12 relative">
        <SparkleStar
          size={18}
          delay={0.8}
          color="var(--accent1)"
          className="absolute -top-3 left-1/3 hidden sm:inline-block"
        />
        <h2 className="display headline-shimmer text-3xl sm:text-5xl text-[var(--accent1)]">
          Festival Tracks
        </h2>
        <SparkleStar
          size={14}
          delay={2.2}
          color="var(--accent2)"
          className="absolute -top-1 right-1/3 hidden sm:inline-block"
        />
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Four distinct categories spanning code, combat robotics, esports, live music, and performing arts. Cross-track participation is welcome.
        </p>
      </div>

      {/* Grid of 4 Tracks */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATS.map(category => {
          const trackEvents = EVENTS.filter(e => e.cat === category.name)

          return (
            <div
              key={category.name}
              className="card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  {category.icon}
                </div>
                <h3 className="display text-2xl text-[var(--accent1)]">
                  {category.name}
                </h3>
                <p className="text-sm opacity-75 mt-2 leading-relaxed">
                  {category.desc}
                </p>

                {/* Sub-list of events in this track */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--accent3)] font-bold mb-2">
                    Featured Events
                  </div>
                  {trackEvents.map(event => {
                    const saved = isPlanned ? isPlanned(event.id) : false

                    return (
                      <div
                        key={event.id}
                        className="flex items-center justify-between gap-1 py-1 px-1.5 rounded hover:bg-white/5 transition-colors group/item"
                      >
                        <button
                          onClick={() => onSelectEvent && onSelectEvent(event.id)}
                          className="text-left flex-1 text-xs opacity-80 hover:opacity-100 hover:text-[var(--accent1)] transition-colors truncate cursor-pointer"
                          aria-label={`View rules and details for ${event.title}`}
                        >
                          • {event.title}
                          <span className="text-[10px] opacity-60 ml-1">({event.prize})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onTogglePlan && onTogglePlan(event.id)}
                          className={`p-1 rounded text-xs transition-colors cursor-pointer shrink-0 ${
                            saved
                              ? 'text-[var(--accent1)] font-bold star-pop'
                              : 'text-white/30 hover:text-[var(--accent1)]'
                          }`}
                          aria-label={saved ? `Remove ${event.title} from My Plan` : `Add ${event.title} to My Plan`}
                          title={saved ? 'Remove from My Plan' : 'Save to My Plan'}
                        >
                          ★
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[var(--accent3)] font-semibold">
                <span>{trackEvents.length} Events Total</span>
                <span className="opacity-60">Day {trackEvents.map(e => e.day).sort().filter((v, i, a) => a.indexOf(v) === i).join(', ')}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
