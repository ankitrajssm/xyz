import { useEffect, useRef } from 'react'
import { EVENTS } from '../data/eventData'

/**
 * Full Event Detail View Component (#/event/<id>).
 * Accessible, keyboard-navigable, with previous/next navigation,
 * comprehensive event specifications, and direct link to registration.
 */
export default function EventDetail({ eventId, onClose, onNavigate, onRegisterEvent, onAskTarang }) {
  const containerRef = useRef(null)

  // Find target event
  const event = EVENTS.find(e => String(e.id) === String(eventId))

  // Scroll to top of detail view when event changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [eventId])

  // Handle Invalid ID (Page Not Found state)
  if (!event) {
    return (
      <div
        ref={containerRef}
        tabIndex="-1"
        className="fixed inset-0 z-50 bg-[var(--ink)] overflow-y-auto p-4 sm:p-8 flex items-center justify-center outline-none"
        role="region"
        aria-label="Event Not Found"
      >
        <div className="card max-w-lg w-full p-8 text-center border-[var(--red)]/40 my-auto">
          <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
          <div className="text-xs uppercase font-bold tracking-widest text-[var(--red)] mb-2">
            Error 404 · Event Not Found
          </div>
          <h2 className="display text-2xl sm:text-3xl text-[var(--gold)] mb-3">
            Event "#{eventId}" Does Not Exist
          </h2>
          <p className="text-sm opacity-75 mb-6 leading-relaxed">
            The event code you followed is not listed in the Tarang '26 festival directory. It may have been moved or removed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-sm"
            >
              ← Return to Schedule
            </button>
            <a
              href="#top"
              onClick={onClose}
              className="px-6 py-3 rounded-full font-semibold border border-white/20 hover:border-white/40 text-[var(--cream)] transition-colors text-sm"
            >
              Festival Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Calculate previous and next event for navigation
  const currentIndex = EVENTS.findIndex(e => e.id === event.id)
  const prevEvent = EVENTS[(currentIndex - 1 + EVENTS.length) % EVENTS.length]
  const nextEvent = EVENTS[(currentIndex + 1) % EVENTS.length]

  // Filter related events in same category or adjacent
  const relatedEvents = EVENTS.filter(
    e => e.id !== event.id && (e.cat === event.cat || e.day === event.day)
  ).slice(0, 3)

  const handleRegisterClick = () => {
    if (onRegisterEvent) {
      onRegisterEvent(event.title)
    }
    onClose()
  }

  return (
    <div
      ref={containerRef}
      tabIndex="-1"
      className="fixed inset-0 z-50 bg-[var(--ink)] overflow-y-auto outline-none"
      role="main"
      aria-labelledby="detail-title"
    >
      {/* Top sticky navigation bar */}
      <div className="sticky top-0 z-20 bg-[var(--ink)]/95 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal)] hover:text-[var(--gold)] transition-colors p-1"
            aria-label="Back to festival timetable"
          >
            <span>←</span>
            <span>Back to Festival</span>
          </button>

          <div className="text-xs opacity-60 hidden sm:block truncate max-w-xs">
            {event.cat} Track · Day {event.day}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/20 hover:border-[var(--gold)] text-sm opacity-80 hover:opacity-100 transition-colors"
            aria-label="Close event detail view"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Main event detail container */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="text-xs text-[var(--teal)] font-medium mb-3 flex items-center gap-2">
          <span>Tarang '26</span>
          <span>/</span>
          <span>{event.cat}</span>
          <span>/</span>
          <span className="opacity-75">{event.title}</span>
        </div>

        {/* Hero Title & Primary Meta Block */}
        <div className="card p-6 sm:p-8 mb-8 border-[var(--gold)]/25 bg-white/[0.04]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--teal)] text-[var(--ink)] font-bold">
              {event.cat} Track
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[var(--cream)] font-medium">
              Day {event.day} · {event.date}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[var(--cream)] font-medium">
              {event.time}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-[var(--red)]/20 border border-[var(--red)]/40 text-[var(--cream)] font-bold">
              Prize: {event.prize}
            </span>
          </div>

          <h1 id="detail-title" className="display text-3xl sm:text-5xl text-[var(--gold)] mb-3">
            {event.title}
          </h1>

          <p className="text-base sm:text-lg opacity-85 leading-relaxed max-w-3xl mb-6">
            {event.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            <button
              onClick={handleRegisterClick}
              className="px-8 py-3 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-sm shadow-md"
            >
              Register for This Event · Free Entry
            </button>
            <div className="text-xs opacity-75 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>Reporting Venue: <strong>{event.venue}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <div className="text-xs uppercase font-bold tracking-wider text-[var(--teal)] mb-1">
              Format & Duration
            </div>
            <div className="font-bold text-sm sm:text-base text-[var(--cream)]">
              {event.duration}
            </div>
            <p className="text-xs opacity-70 mt-1 leading-relaxed">
              {event.format}
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xs uppercase font-bold tracking-wider text-[var(--teal)] mb-1">
              Team Structure
            </div>
            <div className="font-bold text-sm sm:text-base text-[var(--cream)]">
              {event.teamSize}
            </div>
            <p className="text-xs opacity-70 mt-1 leading-relaxed">
              Cross-college collaborations allowed across all teams.
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xs uppercase font-bold tracking-wider text-[var(--teal)] mb-1">
              Eligibility
            </div>
            <div className="font-bold text-sm sm:text-base text-[var(--cream)]">
              College Students
            </div>
            <p className="text-xs opacity-70 mt-1 leading-relaxed">
              {event.eligibility}
            </p>
          </div>
        </div>

        {/* Full Problem Statement */}
        <div className="card p-6 sm:p-8 mb-8 border-l-4 border-l-[var(--teal)]">
          <h2 className="display text-xl sm:text-2xl text-[var(--gold)] mb-3">
            Full Problem Statement & Scope
          </h2>
          <p className="text-sm sm:text-base opacity-85 leading-relaxed">
            {event.problemStatement}
          </p>
        </div>

        {/* Step-by-Step Numbered Rules */}
        <div className="card p-6 sm:p-8 mb-8">
          <h2 className="display text-xl sm:text-2xl text-[var(--gold)] mb-4">
            Competition Rules & Regulations
          </h2>
          <ol className="space-y-3" role="list">
            {event.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-3 text-sm opacity-90 leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-white/10 text-[var(--gold)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Judging Criteria & Prizes Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Judging Criteria */}
          <div className="card p-6 sm:p-7">
            <h2 className="display text-lg sm:text-xl text-[var(--gold)] mb-4">
              Judging Criteria
            </h2>
            <ul className="space-y-2.5">
              {event.judging.map((criteria, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm opacity-85 leading-relaxed">
                  <span className="text-[var(--teal)] font-bold">•</span>
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prizes Breakdown */}
          <div className="card p-6 sm:p-7">
            <h2 className="display text-lg sm:text-xl text-[var(--gold)] mb-4">
              Prizes & Recognition
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  1st Place Winner
                </div>
                <div className="font-bold text-sm text-[var(--cream)] mt-0.5">
                  {event.prizes.first}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  2nd Place Runner-Up
                </div>
                <div className="font-medium text-sm text-[var(--cream)] mt-0.5">
                  {event.prizes.second}
                </div>
              </div>
              {event.prizes.third && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                    3rd Place Honorable Mention
                  </div>
                  <div className="font-medium text-xs sm:text-sm text-[var(--cream)] mt-0.5">
                    {event.prizes.third}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What to Carry & Student Coordinator Contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* What to carry checklist */}
          <div className="card p-6">
            <h2 className="display text-lg sm:text-xl text-[var(--gold)] mb-3">
              What to Carry
            </h2>
            <ul className="space-y-2">
              {event.carry.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm opacity-80">
                  <span className="text-[var(--teal)] font-bold" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Questions about this event? */}
          <div className="card p-6">
            <h2 className="display text-lg sm:text-xl text-[var(--gold)] mb-2">
              Questions about this event?
            </h2>
            <p className="text-xs opacity-75 leading-relaxed mb-4">
              Have queries regarding problem scope, gear requirements, or reporting schedules?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => onAskTarang && onAskTarang(`Tell me about ${event.title}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span aria-hidden="true">💬</span>
                <span>Ask Tarang about this event</span>
              </button>
              <p className="text-xs text-[var(--teal)] font-medium">
                Or visit the Registration & Help Desk on event day
              </p>
            </div>
          </div>
        </div>

        {/* Previous / Next Event Buttons */}
        <div className="border-t border-b border-white/10 py-6 my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate(prevEvent.id)}
            className="w-full sm:w-auto text-left card p-3 sm:px-5 flex items-center gap-3 hover:border-[var(--gold)] transition-colors group"
          >
            <span className="text-lg opacity-60 group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--teal)] font-bold">Previous Event</div>
              <div className="text-xs sm:text-sm font-semibold truncate max-w-[200px]">{prevEvent.title}</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate(nextEvent.id)}
            className="w-full sm:w-auto text-right card p-3 sm:px-5 flex items-center justify-end gap-3 hover:border-[var(--gold)] transition-colors group"
          >
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--teal)] font-bold">Next Event</div>
              <div className="text-xs sm:text-sm font-semibold truncate max-w-[200px]">{nextEvent.title}</div>
            </div>
            <span className="text-lg opacity-60 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Related Events Strip */}
        {relatedEvents.length > 0 && (
          <div className="mt-8">
            <h3 className="display text-xl text-[var(--gold)] mb-4">
              More Events in {event.cat} & Day {event.day}
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {relatedEvents.map(rel => (
                <button
                  key={rel.id}
                  onClick={() => onNavigate(rel.id)}
                  className="card p-4 text-left hover:border-[var(--gold)] transition-colors group"
                >
                  <div className="text-[10px] text-[var(--teal)] font-bold uppercase">{rel.cat} · {rel.time}</div>
                  <div className="font-bold text-sm text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors mt-1">
                    {rel.title}
                  </div>
                  <div className="text-xs opacity-60 mt-1">{rel.prize}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full font-semibold border border-white/20 hover:border-[var(--gold)] text-[var(--cream)] transition-colors text-sm"
          >
            ← Back to Festival Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
