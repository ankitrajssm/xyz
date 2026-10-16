/**
 * Calendar export (.ics) and festival schedule collision detection utility.
 * Pure Vanilla JavaScript: zero external dependencies or libraries.
 */

/**
 * Returns event duration in minutes parsed from event data.
 */
export function getEventDurationMinutes(event) {
  if (!event || !event.duration) return 120 // Default 2 hours

  const text = String(event.duration).toLowerCase()

  // Match e.g. "24 Hours", "3.5 Hours", "2 Hours"
  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hour|hr)s?/)
  if (hourMatch) {
    return Math.round(parseFloat(hourMatch[1]) * 60)
  }

  // Match e.g. "90 Minutes"
  const minMatch = text.match(/(\d+)\s*(?:minute|min)s?/)
  if (minMatch) {
    return parseInt(minMatch[1], 10)
  }

  // Specific fallback for Robo Wars (Event 2) tournament window
  if (event.id === 2 || text.includes('robo') || text.includes('round')) {
    return 210 // 3.5 Hours (11:30 to 15:00)
  }

  return 120
}

/**
 * Calculates absolute festival timeline minutes for an event.
 * Festival starts Day 1 at 00:00 (minute 0).
 */
export function getEventTimeRange(event) {
  const [hours, mins] = (event.time || '09:00').split(':').map(Number)
  const dayOffsetMinutes = ((event.day || 1) - 1) * 24 * 60
  const startMinutes = dayOffsetMinutes + hours * 60 + mins
  const duration = getEventDurationMinutes(event)
  const endMinutes = startMinutes + duration

  return { startMinutes, endMinutes, duration }
}

/**
 * Checks if two events collide/overlap on the festival timeline.
 */
export function doEventsClash(eventA, eventB) {
  if (!eventA || !eventB || eventA.id === eventB.id) return false
  const rangeA = getEventTimeRange(eventA)
  const rangeB = getEventTimeRange(eventB)

  // Two intervals [A.start, A.end] and [B.start, B.end] overlap iff:
  return rangeA.startMinutes < rangeB.endMinutes && rangeB.startMinutes < rangeA.endMinutes
}

/**
 * Computes all schedule clashes for a given list of planned event IDs.
 * Returns an object mapping eventId -> Array of conflicting event titles.
 */
export function getClashesForPlan(plannedIds, allEvents) {
  const plannedEvents = allEvents.filter(e => plannedIds.includes(e.id))
  const clashMap = {}

  for (let i = 0; i < plannedEvents.length; i++) {
    const a = plannedEvents[i]
    for (let j = i + 1; j < plannedEvents.length; j++) {
      const b = plannedEvents[j]
      if (doEventsClash(a, b)) {
        if (!clashMap[a.id]) clashMap[a.id] = []
        if (!clashMap[b.id]) clashMap[b.id] = []
        clashMap[a.id].push(b.title)
        clashMap[b.id].push(a.title)
      }
    }
  }

  return clashMap
}

/**
 * Formats a JavaScript Date to iCalendar UTC timestamp format: YYYYMMDDTHHmmSSZ
 */
function formatUtcIcs(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

/**
 * Returns Start and End Date objects in UTC for an event.
 * Indian Standard Time (IST) is UTC+05:30.
 * Festival dates:
 * Day 1 = Nov 20, 2026
 * Day 2 = Nov 21, 2026
 * Day 3 = Nov 22, 2026
 */
export function getEventUtcDates(event) {
  const [hours, mins] = (event.time || '09:00').split(':').map(Number)
  const dayNumber = event.day || 1
  const durationMinutes = getEventDurationMinutes(event)

  // Nov 20 is Day 1 -> 19 + dayNumber
  // Subtract 5 hours and 30 minutes to convert from IST to UTC
  const startDate = new Date(Date.UTC(2026, 10, 19 + dayNumber, hours - 5, mins - 30, 0))
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000)

  return { startDate, endDate }
}

/**
 * Cleans string for safe iCalendar property values.
 */
function cleanIcsText(str) {
  if (!str) return ''
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/**
 * Builds standard RFC 5545 iCalendar (.ics) string for single or multiple events.
 */
export function buildIcsContent(events) {
  const now = new Date()
  const stamp = formatUtcIcs(now)

  const vEvents = events.map(event => {
    const { startDate, endDate } = getEventUtcDates(event)
    const dtStart = formatUtcIcs(startDate)
    const dtEnd = formatUtcIcs(endDate)
    const summary = cleanIcsText(`Tarang '26: ${event.title}`)
    const description = cleanIcsText(
      `${event.title} (${event.cat} Track)\\n` +
      `Venue: ${event.venue}\\n` +
      `Duration: ${event.duration}\\n` +
      `Prizes: ${event.prize}\\n\\n` +
      `${event.desc}\\n\\n` +
      `Official Help Desk: Main Gate. Free Registration.`
    )
    const location = cleanIcsText(`${event.venue}, Institute Campus, Punjab, India`)

    return [
      'BEGIN:VEVENT',
      `UID:tarang26-event-${event.id}-${startDate.getTime()}@tarang26.festival`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
    ].join('\r\n')
  }).join('\r\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tarang 26//Festival Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Tarang 26 Festival Plan',
    'X-WR-TIMEZONE:Asia/Kolkata',
    vEvents,
    'END:VCALENDAR',
  ].join('\r\n')
}

/**
 * Triggers client-side download of an .ics file using a Blob.
 */
export function downloadIcsFile(filename, icsContent) {
  if (typeof window === 'undefined') return

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Convenience helper to export a single event to an .ics file.
 */
export function exportSingleEventIcs(event) {
  if (!event) return
  const safeTitle = (event.title || 'event')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const filename = `tarang26-${safeTitle}.ics`
  const content = buildIcsContent([event])
  downloadIcsFile(filename, content)
}

/**
 * Convenience helper to export multiple planned events to an .ics file.
 */
export function exportAllEventsIcs(events) {
  if (!events || events.length === 0) return
  const filename = 'tarang26-my-festival-plan.ics'
  const content = buildIcsContent(events)
  downloadIcsFile(filename, content)
}
