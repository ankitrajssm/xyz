import { CATS, EVENTS } from '../data/eventData'

/**
 * Activities Section: 4 Core festival tracks.
 * Priority section: high polish, clear event previews, quiet consistent design.
 */
export default function Activities({ onSelectEvent }) {
  return (
    <section id="activities" className="max-w-6xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="display text-3xl sm:text-5xl text-[var(--gold)]">Festival Tracks</h2>
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Four distinct categories spanning code, competition, music, and performing arts. Cross-track participation is welcome.
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
                <h3 className="display text-2xl text-[var(--gold)]">
                  {category.name}
                </h3>
                <p className="text-sm opacity-75 mt-2 leading-relaxed">
                  {category.desc}
                </p>

                {/* Sub-list of events in this track */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--teal)] font-bold">
                    Featured Events
                  </div>
                  {trackEvents.map(event => (
                    <button
                      key={event.id}
                      onClick={() => onSelectEvent && onSelectEvent(event)}
                      className="block text-left w-full text-xs opacity-75 hover:opacity-100 hover:text-[var(--gold)] transition-colors truncate py-0.5"
                    >
                      • {event.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 flex items-center justify-between text-xs text-[var(--teal)] font-semibold">
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
