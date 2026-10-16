import { useState } from 'react'
import { EVENTS, CATS } from '../data/eventData'

/**
 * Schedule section: Interactive timetable with Day and Track filtering.
 * Features customizable filters, empty state with filter reset,
 * and direct links to full event detail view (#/event/<id>).
 */
export default function Schedule({ onSelectEvent }) {
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
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="display text-3xl sm:text-5xl text-[var(--gold)]">Festival Schedule</h2>
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Filter by day or track to plan your festival timetable. Tap any card for full rules, team sizes, problem statements, and prize breakdowns.
        </p>
      </div>

      {/* Day Selector Tabs */}
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
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-colors ${
                isActive
                  ? 'bg-[var(--gold)] text-[var(--ink)] border-[var(--gold)] shadow-sm'
                  : 'bg-white/5 text-[var(--cream)] border-white/20 hover:border-white/40'
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
              className={`px-3.5 py-1 text-xs font-semibold rounded-full border transition-colors ${
                isActive
                  ? 'bg-[var(--teal)] text-[var(--ink)] border-[var(--teal)]'
                  : 'bg-white/5 text-[var(--cream)] border-white/10 hover:border-white/30'
              }`}
            >
              {catName}
            </button>
          )
        })}
      </div>

      {/* Schedule Event List */}
      <div className="space-y-3" role="list" aria-label={`Events for Day ${selectedDay}`}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <button
              key={event.id}
              role="listitem"
              onClick={() => onSelectEvent(event.id)}
              className="card w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer"
              aria-label={`View full details for ${event.title} on Day ${event.day} at ${event.time}`}
            >
              {/* Time & Title */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 shrink-0">
                  <span className="display text-lg sm:text-xl text-[var(--gold)] font-bold">
                    {event.time}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-65 flex items-center gap-1.5 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[var(--teal)] inline-block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{event.venue}</span>
                  </p>
                </div>
              </div>

              {/* Badges: Category & Prize */}
              <div className="flex items-center gap-2 self-start sm:self-auto ml-20 sm:ml-0">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[var(--cream)] font-medium">
                  {event.cat}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--red)]/20 border border-[var(--red)]/40 text-[var(--cream)] font-bold">
                  {event.prize}
                </span>
                <span className="text-sm opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all hidden sm:inline" aria-hidden="true">
                  →
                </span>
              </div>
            </button>
          ))
        ) : (
          /* Custom Empty State for Zero Filter Matches */
          <div className="card p-8 sm:p-10 text-center border-dashed border-white/20">
            <div className="text-4xl mb-3" aria-hidden="true">🔎</div>
            <p className="text-base font-semibold text-[var(--cream)]">
              No <span className="text-[var(--gold)]">{selectedCat}</span> events on Day {selectedDay}.
            </p>
            <p className="text-xs sm:text-sm opacity-65 mt-1.5 max-w-sm mx-auto">
              There are no competitions matching this exact filter combination. Try selecting another track or day.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all shadow-sm"
            >
              Reset to All Events
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
