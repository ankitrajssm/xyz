import { useEffect, useRef } from 'react'
import { EVENTS, EVENT, HELPDESK } from '../data/eventData'
import { getClashesForPlan, exportAllEventsIcs } from '../utils/ics'

/**
 * PlanDrawer Component:
 * Slide-over drawer presenting the visitor's customized festival timetable.
 * Supports:
 * - Grouping by day and chronological time sorting
 * - Accurate schedule clash detection with prominent warnings
 * - Single-click removal and "Clear all"
 * - Multi-event calendar (.ics) download
 * - Clean printer-ready view for physical printing on A4
 * - Full accessible keyboard focus management & Esc closing
 */
export default function PlanDrawer({
  isOpen,
  onClose,
  plan = [],
  togglePlan,
  clearPlan,
  onSelectEvent,
}) {
  const drawerRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Retrieve full event objects for saved IDs
  const plannedEvents = EVENTS.filter(e => plan.includes(e.id))

  // Compute clashes among all planned events
  const clashMap = getClashesForPlan(plan, EVENTS)
  const totalClashes = Object.keys(clashMap).length

  // Accessible focus trap & Escape key handler
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      // Allow slight tick for transition before focusing drawer
      const timer = setTimeout(() => {
        if (drawerRef.current) {
          drawerRef.current.focus()
        }
      }, 50)

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      // Lock body scroll while drawer is open
      document.body.style.overflow = 'hidden'

      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        if (previousActiveElement.current && previousActiveElement.current.focus) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Group events by day (Day 1, Day 2, Day 3)
  const days = [1, 2, 3]
  const eventsByDay = days.map(dayNum => ({
    day: dayNum,
    date: dayNum === 1 ? '20 Nov 2026' : dayNum === 2 ? '21 Nov 2026' : '22 Nov 2026',
    events: plannedEvents
      .filter(e => e.day === dayNum)
      .sort((a, b) => a.time.localeCompare(b.time)),
  }))

  const handleEventClick = (eventId) => {
    onClose()
    if (onSelectEvent) {
      onSelectEvent(eventId)
    }
  }

  const handleBrowseSchedule = () => {
    onClose()
    const scheduleEl = document.getElementById('schedule')
    if (scheduleEl) {
      setTimeout(() => {
        scheduleEl.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExportAll = () => {
    exportAllEventsIcs(plannedEvents)
  }

  return (
    <>
      {/* Interactive Drawer Overlay & Panel */}
      <div
        className="fixed inset-0 z-50 flex justify-end overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-drawer-title"
      >
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Sliding Panel */}
        <div
          ref={drawerRef}
          tabIndex="-1"
          className="relative w-full max-w-md bg-[var(--ink)] border-l border-white/10 shadow-2xl flex flex-col h-full z-10 outline-none animate-in"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2.5">
              <span className="text-xl text-[var(--gold)]" aria-hidden="true">★</span>
              <div>
                <h2 id="plan-drawer-title" className="display text-lg sm:text-xl text-[var(--gold)]">
                  My Festival Plan
                </h2>
                <p className="text-xs opacity-70">
                  {plannedEvents.length} {plannedEvents.length === 1 ? 'event' : 'events'} bookmarked
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-white/15 hover:border-[var(--gold)] text-xs font-semibold text-[var(--cream)] opacity-80 hover:opacity-100 transition-colors cursor-pointer"
              aria-label="Close My Plan drawer"
            >
              ✕ Close
            </button>
          </div>

          {/* Clash Notice Banner */}
          {totalClashes > 0 && (
            <div className="bg-[var(--red)]/20 border-b border-[var(--red)]/40 px-4 py-2.5 flex items-center gap-2 text-xs text-[var(--cream)]">
              <span className="text-base shrink-0" aria-hidden="true">⚠️</span>
              <span>
                <strong>Schedule Clash Detected:</strong> {totalClashes} events have overlapping timings. Review the warnings below.
              </span>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {plannedEvents.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12 px-4 card border-dashed border-white/20">
                <div className="text-5xl mb-3 text-[var(--gold)]/60" aria-hidden="true">★</div>
                <h3 className="display text-xl text-[var(--gold)] mb-2">Your Plan is Empty</h3>
                <p className="text-xs sm:text-sm opacity-70 mb-6 leading-relaxed">
                  Build your personalized festival schedule! Tap the star icon on any competition or activity card to add it here.
                </p>
                <button
                  onClick={handleBrowseSchedule}
                  className="px-6 py-2.5 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  Browse Festival Schedule
                </button>
              </div>
            ) : (
              /* Day-by-Day Grouped List */
              eventsByDay.map(dayGroup => {
                if (dayGroup.events.length === 0) return null

                return (
                  <div key={dayGroup.day} className="space-y-3">
                    {/* Day Group Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="display text-sm font-bold text-[var(--gold)]">
                        Day {dayGroup.day}
                      </span>
                      <span className="text-[11px] opacity-60">
                        {dayGroup.date}
                      </span>
                    </div>

                    {/* Events in this day */}
                    <div className="space-y-2.5">
                      {dayGroup.events.map(event => {
                        const clashes = clashMap[event.id] || []
                        const hasClash = clashes.length > 0

                        return (
                          <div
                            key={event.id}
                            className={`card p-3.5 transition-all ${
                              hasClash
                                ? 'border-[var(--red)]/60 bg-[var(--red)]/10'
                                : 'hover:border-[var(--gold)]/50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
                                  <span className="px-2 py-0.5 rounded bg-[var(--gold)] text-[var(--ink)] font-bold">
                                    {event.time}
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-white/10 opacity-80">
                                    {event.cat}
                                  </span>
                                  <span className="opacity-60 truncate">
                                    {event.venue}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleEventClick(event.id)}
                                  className="text-left font-bold text-sm text-[var(--cream)] hover:text-[var(--gold)] transition-colors truncate block w-full cursor-pointer"
                                  title={`View ${event.title} details`}
                                >
                                  {event.title}
                                </button>
                                <div className="text-[11px] opacity-60 mt-0.5">
                                  {event.duration}
                                </div>
                              </div>

                              {/* Remove Bookmark Button */}
                              <button
                                onClick={() => togglePlan(event.id)}
                                className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-[var(--red)] transition-colors shrink-0 cursor-pointer"
                                aria-label={`Remove ${event.title} from plan`}
                                title="Remove from plan"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>

                            {/* Clash Warning Callout */}
                            {hasClash && (
                              <div className="mt-2.5 pt-2 border-t border-[var(--red)]/30 text-[11px] text-[var(--red)] font-semibold flex items-start gap-1.5">
                                <span className="shrink-0" aria-hidden="true">⚠️</span>
                                <span>
                                  Schedule Clash: Overlaps with {clashes.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Drawer Actions Footer */}
          {plannedEvents.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-black/30 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                {/* Export All to Calendar */}
                <button
                  onClick={handleExportAll}
                  className="px-3 py-2 rounded-lg font-bold bg-[var(--teal)] text-[var(--ink)] hover:brightness-105 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  aria-label="Add all bookmarked events to calendar file"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Export Calendar</span>
                </button>

                {/* Print Plan */}
                <button
                  onClick={handlePrint}
                  className="px-3 py-2 rounded-lg font-semibold bg-white/10 border border-white/20 hover:border-[var(--gold)] text-[var(--cream)] transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  aria-label="Print festival plan"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Plan</span>
                </button>
              </div>

              {/* Clear All */}
              <button
                onClick={clearPlan}
                className="w-full text-center text-xs opacity-60 hover:opacity-100 hover:text-[var(--red)] transition-colors py-1 cursor-pointer"
              >
                Clear all saved events
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Print Area: renders clean printable layout when user prints page */}
      <div id="plan-print-area" className="hidden">
        <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', color: '#111827' }}>
          <div style={{ borderBottom: '2px solid #111827', paddingBottom: '12px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', margin: '0 0 4px 0' }}>
              {EVENT.name}{EVENT.year} — Official Festival Itinerary
            </h1>
            <p style={{ margin: '0', fontSize: '13px', color: '#4b5563' }}>
              {EVENT.dates} · {EVENT.venue}, {EVENT.address}
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
              Help Desk: {HELPDESK.venue} · Emergency: {HELPDESK.emergency}
            </p>
          </div>

          {plannedEvents.length === 0 ? (
            <p>No events bookmarked in your itinerary.</p>
          ) : (
            days.map(dayNum => {
              const dayEvents = plannedEvents
                .filter(e => e.day === dayNum)
                .sort((a, b) => a.time.localeCompare(b.time))

              if (dayEvents.length === 0) return null

              return (
                <div key={dayNum} style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '16px', borderBottom: '1px solid #d1d5db', paddingBottom: '4px', margin: '0 0 10px 0' }}>
                    Day {dayNum} ({dayNum === 1 ? '20 Nov 2026' : dayNum === 2 ? '21 Nov 2026' : '22 Nov 2026'})
                  </h2>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                        <th style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>Time</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>Event</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>Track</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>Reporting Venue</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayEvents.map(ev => {
                        const clashes = clashMap[ev.id] || []
                        return (
                          <tr key={ev.id}>
                            <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                              {ev.time}
                            </td>
                            <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>
                              <strong>{ev.title}</strong>
                              {clashes.length > 0 && (
                                <div style={{ color: '#b91c1c', fontSize: '11px', marginTop: '2px' }}>
                                  ⚠️ Clashes with {clashes.join(', ')}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>{ev.cat}</td>
                            <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>{ev.venue}</td>
                            <td style={{ padding: '6px 8px', border: '1px solid #e5e7eb' }}>{ev.duration}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            })
          )}

          <div style={{ marginTop: '30px', paddingTop: '12px', borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#6b7280' }}>
            <p style={{ margin: 0 }}>
              Note: Carry physical college photo ID card at all times. Report 30 minutes early at your event venue.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
