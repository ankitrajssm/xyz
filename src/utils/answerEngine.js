import {
  EVENT,
  EVENTS,
  GENERAL_RULES,
  HELPDESK,
  HOW_TO_PARTICIPATE,
  getDerivedStats,
} from '../data/eventData'

/**
 * Intelligent Rule-Based Doubt Answering Engine for Tarang '26.
 * Answers queries strictly using eventData.js without external APIs or LLMs.
 * Supports keyword scoring, English, and common Hinglish festival terms.
 * Cleaned of all personal names, emails, and Gate 2 references.
 */

// Common stop words to strip before keyword evaluation
const STOP_WORDS = new Set([
  'is', 'the', 'a', 'an', 'are', 'was', 'were', 'in', 'at', 'on', 'of', 'for',
  'to', 'with', 'about', 'tell', 'me', 'can', 'you', 'please', 'i', 'my', 'what',
  'where', 'when', 'how', 'who', 'why', 'hai', 'ki', 'ka', 'ke', 'ko', 'se', 'me',
  'mein', 'aur', 'kya', 'bhi', 'karo', 'karna', 'kuch', 'hoga', 'hogi', 'batao'
])

// Event keywords mapping
const EVENT_KEYWORDS = [
  { id: 1, keywords: ['hackathon', 'pixel', 'rush', 'coding marathon', 'web app', 'software'] },
  { id: 2, keywords: ['robo', 'robot', 'wars', 'robotics', 'combat', 'bot', 'cage', 'fight'] },
  { id: 3, keywords: ['dj', 'dj night', 'inauguration', 'opening', 'starry', 'concert', 'lamp'] },
  { id: 4, keywords: ['code sprint', 'sprint', 'competitive programming', 'dsa', 'algorithm', 'problem solving'] },
  { id: 5, keywords: ['valorant', 'gaming', 'esports', 'fps', 'bracket', 'riot', 'tournament'] },
  { id: 6, keywords: ['band', 'bands', 'battle of bands', 'rock', 'music competition', 'acoustic', 'guitar'] },
  { id: 7, keywords: ['design', 'duel', 'ui', 'ux', 'figma', 'prototype', 'wireframe', 'redesign'] },
  { id: 8, keywords: ['bhangra', 'street play', 'nukkad', 'natak', 'giddha', 'dance', 'drama', 'theatre'] },
  { id: 9, keywords: ['finale', 'grand finale', 'awards', 'closing', 'trophy', 'ceremony', 'felicitation'] },
]

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token))
}

export function answerVisitorQuery(query) {
  if (!query || typeof query !== 'string') {
    return {
      text: 'Please type a question about Tarang \'26 (e.g., Hackathon rules, venue, free registration, or schedule).',
      link: null,
    }
  }

  const rawLower = query.toLowerCase()
  const tokens = tokenize(query)

  // 1. Check if user is asking about a specific event
  let matchedEventId = null
  let maxEventScore = 0

  for (const item of EVENT_KEYWORDS) {
    let score = 0
    for (const kw of item.keywords) {
      if (rawLower.includes(kw)) {
        score += 3
      }
      for (const t of tokens) {
        if (kw.includes(t)) {
          score += 1
        }
      }
    }
    if (score > maxEventScore) {
      maxEventScore = score
      matchedEventId = item.id
    }
  }

  if (matchedEventId && maxEventScore >= 2) {
    const event = EVENTS.find(e => e.id === matchedEventId)
    if (event) {
      // Check sub-intent for this specific event
      const isTiming = tokens.some(t => ['time', 'timing', 'kab', 'schedule', 'when', 'date', 'baje'].includes(t))
      const isVenue = tokens.some(t => ['venue', 'where', 'kahan', 'place', 'room', 'complex', 'hall'].includes(t))
      const isPrize = tokens.some(t => ['prize', 'prizes', 'inaam', 'cash', 'money', 'pool', 'award'].includes(t))
      const isTeam = tokens.some(t => ['team', 'members', 'size', 'kitne', 'log', 'solo', 'group'].includes(t))
      const isRules = tokens.some(t => ['rule', 'rules', 'niyam', 'format', 'duration', 'allowed'].includes(t))
      const isCarry = tokens.some(t => ['carry', 'bring', 'lana', 'requirements', 'kit'].includes(t))
      const isContact = tokens.some(t => ['contact', 'lead', 'coordinator', 'email', 'phone'].includes(t))

      if (isTiming) {
        return {
          text: `📅 ${event.title} is scheduled for Day ${event.day} (${event.date}) at ${event.time} in ${event.venue}. Total duration: ${event.duration}.`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      if (isVenue) {
        return {
          text: `📍 ${event.title} will take place at ${event.venue} on Day ${event.day} starting at ${event.time}. Please report 30 minutes early.`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      if (isPrize) {
        return {
          text: `🏆 Prize pool for ${event.title} is ${event.prize}. 1st Place: ${event.prizes.first}. 2nd Place: ${event.prizes.second}.${event.prizes.third ? ` 3rd Place: ${event.prizes.third}.` : ''}`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      if (isTeam) {
        return {
          text: `👥 Team format for ${event.title}: ${event.teamSize}. Eligibility: ${event.eligibility}`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      if (isRules) {
        const topRules = event.rules.slice(0, 3).map((r, i) => `${i + 1}. ${r}`).join('\n')
        return {
          text: `📋 Key rules for ${event.title} (${event.format}):\n${topRules}`,
          link: { text: `Read all rules for ${event.title}`, hash: `#/event/${event.id}` },
        }
      }

      if (isCarry) {
        return {
          text: `🎒 What to carry for ${event.title}: ${event.carry.join(', ')}.`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      if (isContact) {
        return {
          text: `Questions about ${event.title}? Ask here or visit the Registration & Help Desk on event day.`,
          link: { text: `View ${event.title} details`, hash: `#/event/${event.id}` },
        }
      }

      // Default event summary
      return {
        text: `✨ ${event.title} (${event.cat} Track) takes place on Day ${event.day} (${event.date}) at ${event.time} in ${event.venue}. Prize pool: ${event.prize}. Team size: ${event.teamSize}.`,
        link: { text: `Explore complete rules & register`, hash: `#/event/${event.id}` },
      }
    }
  }

  // 2. Thematic General Inquiries

  // Registration & Participation Steps
  if (
    rawLower.includes('how to register') ||
    rawLower.includes('register') ||
    rawLower.includes('registration') ||
    rawLower.includes('participate') ||
    rawLower.includes('kaise register') ||
    rawLower.includes('apply') ||
    rawLower.includes('form')
  ) {
    const steps = HOW_TO_PARTICIPATE.map(s => `${s.step}. ${s.title}: ${s.desc}`).join('\n')
    return {
      text: `📝 How to register for Tarang '26 (100% Free Entry):\n${steps}`,
      link: { text: 'Go to Registration Form', hash: '#register' },
    }
  }

  // Schedule & Festival Timetable
  if (
    rawLower.includes('schedule') ||
    rawLower.includes('timetable') ||
    rawLower.includes('timing') ||
    rawLower.includes('kab hai') ||
    rawLower.includes('dates') ||
    rawLower.includes('when') ||
    rawLower.includes('today')
  ) {
    return {
      text: `🗓️ Tarang '26 runs from ${EVENT.dates} across 3 days:\n• Day 1 (Nov 20): Pixel Rush Hackathon (09:00), Robo Wars (11:30), DJ Night (18:00)\n• Day 2 (Nov 21): Code Sprint (10:00), Valorant Arena (14:00), Battle of Bands (19:00)\n• Day 3 (Nov 22): Design Duel (10:30), Street Play & Bhangra (15:00), Grand Finale (19:30).`,
      link: { text: 'View Interactive Timetable', hash: '#schedule' },
    }
  }

  // Registration Fee / Cost / Free
  if (
    rawLower.includes('fee') ||
    rawLower.includes('cost') ||
    rawLower.includes('kitne') ||
    rawLower.includes('price') ||
    rawLower.includes('charges') ||
    rawLower.includes('paisa') ||
    rawLower.includes('paise') ||
    rawLower.includes('free')
  ) {
    return {
      text: '🎉 Event registration is free. Accommodation and refund details will be announced by the organisers. Free entry for all college students holding a valid college ID.',
      link: { text: 'Register for free now', hash: '#register' },
    }
  }

  // Eligibility & Who can participate
  if (
    rawLower.includes('eligibility') ||
    rawLower.includes('who can') ||
    rawLower.includes('kaun') ||
    rawLower.includes('allowed') ||
    rawLower.includes('diploma') ||
    rawLower.includes('degree') ||
    rawLower.includes('cross college')
  ) {
    return {
      text: '🎓 Who can participate?\nAll diploma and undergraduate students from any recognized college or university with valid college ID are eligible. Cross-college teams are permitted for all team events! You can register for multiple events provided their timings don\'t clash.',
      link: { text: 'Read General Rules & Guidelines', hash: '#rules' },
    }
  }

  // Prizes & Awards
  if (
    rawLower.includes('prize') ||
    rawLower.includes('prizes') ||
    rawLower.includes('inaam') ||
    rawLower.includes('cash') ||
    rawLower.includes('award') ||
    rawLower.includes('pool')
  ) {
    const stats = getDerivedStats()
    return {
      text: `💰 Total Prize Pool is ${stats.prizeFormatted} distributed across 7 competitive events:\n• Pixel Rush Hackathon: ₹30,000\n• Robo Wars: ₹20,000\n• Valorant Arena: ₹25,000\n• Battle of Bands: ₹25,000\n• Street Play & Bhangra: ₹20,000\n• Code Sprint: ₹15,000\n• Design Duel: ₹10,000\nPlus rolling trophies and medals!`,
      link: { text: 'Explore Schedule & Prizes', hash: '#schedule' },
    }
  }

  // Venue, Travel, Campus, Main Gate
  if (
    rawLower.includes('venue') ||
    rawLower.includes('kahan') ||
    rawLower.includes('where') ||
    rawLower.includes('location') ||
    rawLower.includes('address') ||
    rawLower.includes('main gate') ||
    rawLower.includes('gate') ||
    rawLower.includes('reach') ||
    rawLower.includes('station') ||
    rawLower.includes('travel')
  ) {
    return {
      text: `📍 Venue: ${EVENT.venue}, ${EVENT.address}.\n• Reporting spot: Registration & Help Desk (exact spot announced on event day) at the Main Gate.\n• Short auto or bus ride from nearest railway station.\n• Campus map highlights Tech Block, Open Air Theatre, and Main Stage.`,
      link: { text: 'View Campus Map & Logistics', hash: '#venue' },
    }
  }

  // Accommodation & Food / Hostel / Stay
  if (
    rawLower.includes('hostel') ||
    rawLower.includes('stay') ||
    rawLower.includes('accommodation') ||
    rawLower.includes('rehna') ||
    rawLower.includes('khana') ||
    rawLower.includes('food') ||
    rawLower.includes('meals')
  ) {
    return {
      text: '🏠 Accommodation & Logistics:\nAccommodation and refund details will be announced by the organisers. For queries on event day, visit the Registration & Help Desk at the Main Gate.',
      link: { text: 'View Venue Logistics', hash: '#venue' },
    }
  }

  // General Rules & Code of Conduct
  if (
    rawLower.includes('rule') ||
    rawLower.includes('rules') ||
    rawLower.includes('niyam') ||
    rawLower.includes('conduct') ||
    rawLower.includes('prohibited')
  ) {
    return {
      text: `📜 General Festival Guidelines:\n1. Physical college ID card is mandatory at all times on campus.\n2. Report 30 minutes prior to event schedule.\n3. Laptops and chargers are your own responsibility.\n4. Alcohol, smoking, and prohibited substances are strictly banned.\n5. Follow the organisers' official channels for updates.`,
      link: { text: 'View Complete Festival Rules', hash: '#rules' },
    }
  }

  // Helpdesk & Contacts
  if (
    rawLower.includes('help') ||
    rawLower.includes('contact') ||
    rawLower.includes('helpdesk') ||
    rawLower.includes('support') ||
    rawLower.includes('madad') ||
    rawLower.includes('emergency')
  ) {
    return {
      text: `ℹ️ Festival Helpdesk:\n• Location: ${HELPDESK.venue}\n• Inquiries: Ask at the Registration & Help Desk on event day\n• Working Hours: ${HELPDESK.hours}\n• Emergency: ${HELPDESK.emergency}`,
      link: null,
    }
  }

  // Capability 1: How do I save events / make my schedule / My Plan?
  if (
    rawLower.includes('save') ||
    rawLower.includes('plan') ||
    rawLower.includes('bookmark') ||
    rawLower.includes('itinerary') ||
    rawLower.includes('my plan') ||
    rawLower.includes('custom schedule') ||
    rawLower.includes('personal schedule') ||
    rawLower.includes('star') ||
    rawLower.includes('clash')
  ) {
    return {
      text: `⭐ How to save events & create your festival itinerary:\n1. Tap the star (★) button on any event card in the Schedule, Tracks, Highlights, or Event Detail page.\n2. Open "My Plan" from the top navigation bar to see your bookmarked itinerary grouped by day.\n3. The system automatically alerts you if any events have overlapping time clashes!\n4. You can also print your timetable or export all events to your calendar.`,
      link: { text: 'Browse Festival Schedule', hash: '#schedule' },
    }
  }

  // Capability 2: How do I add events to my calendar?
  if (
    rawLower.includes('calendar') ||
    rawLower.includes('ics') ||
    rawLower.includes('google calendar') ||
    rawLower.includes('apple calendar') ||
    rawLower.includes('outlook') ||
    rawLower.includes('cal') ||
    rawLower.includes('export calendar') ||
    rawLower.includes('download schedule')
  ) {
    return {
      text: `📅 How to add events to your calendar:\n• Single Event: Open any event detail view (#/event/<id>) and tap "Add to Calendar" to download its .ics file.\n• All Saved Events: Open "My Plan" in the top navigation and click "Export Calendar" to download your full itinerary in one .ics file.\n• Compatible with Google Calendar, Apple Calendar, Outlook, and mobile devices with zero internet permissions required.`,
      link: { text: 'Explore Festival Schedule', hash: '#schedule' },
    }
  }

  // 3. Fallback Response using generic contact note
  return {
    text: `I couldn't find a direct answer to that query. For assistance, ask at the Registration & Help Desk on event day at the Main Gate.\n\nTry asking about event schedules, hackathon rules, My Plan, calendar export, venue, free registration, or prizes!`,
    fallback: true,
    link: null,
  }
}
