import { useState } from 'react'
import { EVENTS, CATS } from '../data/eventData'
import SparkleStar from './SparkleStar'

/**
 * Schedule section: Interactive timetable with Day and Track filtering.
 * Features customizable filters with sliding transition,
 * staggered card enter animations, bookmarking into My Plan with star pop,
 * and direct links to full event detail view (#/event/<id>).
 */
export default function Schedule({ onSelectEvent, isPlanned, onTogglePlan }) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedCat, setSelectedCat] = useState('All')

  // Filter events matching active day and category selection
  const filteredEvents = EVENTS.filter(
    e => e.day === selectedDay && (selectedCat === 'All' || e.cat === selectedCat)
  )

  const days = [1, 2, 3]
  const categories = ['All', ...CATS.map(c => c.name)]

  const resetFilters = () => {
    setSelectedDay(1)
    setSelectedCat('All')
  }

  return (
    <section id="schedule" className="max-w-4xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header with Shimmer & Twinkle Stars */}
      <div className="text-center mb-8 relative">
        <SparkleStar
          size={16}
          delay={0.5}
          color="var(--accent1)"
          className="absolute -top-3 left-1/4 hidden sm:inline-block"
        />
        <h2 className="display headline-shimmer text-3xl sm:text-5xl text-[var(--accent1)]">
          Festival Schedule
        </h2>
        <SparkleStar
          size={14}
          delay={1.8}
          color="var(--accent3)"
          className="absolute -top-2 right-1/4 hidden sm:inline-block"
        />
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Filter by day or track to plan your festival timetable. Tap any card for full rules, team sizes, problem statements, and prize breakdowns.
        </p>
      </div>

      {/* Day Selector Tabs with Animated Sliding Highlight */}
      <div
        className="flex justify-center gap-2 mb-4"
        role="tablist"
        aria-label="Filter schedule by day"
      >
        {days.map(dayNum => {
          const isActive = selectedDay === dayNum
          return (
            <button
              key={dayNum}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedDay(dayNum)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent1)] text-[var(--bg)] border-[var(--accent1)] shadow-md scale-105'
                  : 'bg-white/5 text-[var(--text)] border-white/20 hover:border-white/40 opacity-80 hover:opacity-100'
              }`}
            >
              Day {dayNum}
            </button>
          )
        })}
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-8"
        role="group"
        aria-label="Filter schedule by category track"
      >
        {categories.map(catName => {
          const isActive = selectedCat === catName
          return (
            <button
              key={catName}
              onClick={() => setSelectedCat(catName)}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent3)] text-[var(--bg)] border-[var(--accent3)] shadow-xs scale-105'
                  : 'bg-white/5 text-[var(--text)] border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
              }`}
            >
              {catName}
            </button>
          )
        })}
      </div>

      {/* Schedule Event List with Staggered Fade-Up Re-entry */}
      <div className="space-y-3" role="list" aria-label={`Events for Day ${selectedDay}`}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => {
            const saved = isPlanned ? isPlanned(event.id) : false

            return (
              <div
                key={`${selectedDay}-${selectedCat}-${event.id}`}
                style={{ '--stagger-index': index }}
                role="listitem"
                className="card card-stagger-in w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors hover:border-[var(--accent1)]"
              >
                {/* Main clickable area to view event details */}
                <button
                  type="button"
                  onClick={() => onSelectEvent(event.id)}
                  className="flex-1 flex items-start sm:items-center gap-4 text-left cursor-pointer outline-none"
                  aria-label={`View full details for ${event.title} on Day ${event.day} at ${event.time}`}
                >
                  <div className="w-16 shrink-0">
                    <span className="display text-lg sm:text-xl text-[var(--accent1)] font-bold">
                      {event.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[var(--text)] group-hover:text-[var(--accent1)] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm opacity-65 flex items-center gap-1.5 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[var(--accent3)] inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{event.venue}</span>
                    </p>
                  </div>
                </button>

                {/* Badges and Actions */}
                <div className="flex items-center gap-2.5 self-start sm:self-auto ml-20 sm:ml-0">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[var(--text)] font-medium">
                    {event.cat}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--accent2)]/20 border border-[var(--accent2)]/40 text-[var(--text)] font-bold">
                    {event.prize}
                  </span>

                  {/* Bookmark Star Button with Celebratory Pop & Rotate */}
                  <button
                    type="button"
                    onClick={() => onTogglePlan && onTogglePlan(event.id)}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      saved
                        ? 'border-[var(--accent1)] bg-[var(--accent1)] text-[var(--bg)] shadow-sm star-pop'
                        : 'border-white/20 bg-white/5 text-white/50 hover:text-[var(--accent1)] hover:border-[var(--accent1)]/50'
                    }`}
                    aria-label={saved ? `Remove ${event.title} from My Plan` : `Add ${event.title} to My Plan`}
                    aria-pressed={saved}
                    title={saved ? 'Remove from My Plan' : 'Save to My Plan'}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectEvent(event.id)}
                    className="text-sm opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all hidden sm:inline cursor-pointer p-1"
                    aria-label={`Open ${event.title}`}
                  >
                    →
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          /* Custom Empty State for Zero Filter Matches */
          <div className="card p-8 sm:p-10 text-center border-dashed border-white/20">
            <div className="text-4xl mb-3" aria-hidden="true">🔎</div>
            <p className="text-base font-semibold text-[var(--text)]">
              No <span className="text-[var(--accent1)]">{selectedCat}</span> events on Day {selectedDay}.
            </p>
            <p className="text-xs sm:text-sm opacity-65 mt-1.5 max-w-sm mx-auto">
              There are no competitions matching this exact filter combination. Try selecting another track or day.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold bg-[var(--accent1)] text-[var(--bg)] hover:brightness-105 transition-all shadow-sm cursor-pointer"
            >
              Reset to All Events
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
