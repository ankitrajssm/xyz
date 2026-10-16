import { useState } from 'react'
import { EVENT } from './data/eventData'
import { useReveal } from './hooks/useReveal'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Schedule from './components/Schedule'
import Activities from './components/Activities'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import Sponsors from './components/Sponsors'
import Register from './components/Register'
import Faq from './components/Faq'
import EventModal from './components/EventModal'

/**
 * Main Tarang '26 Application Component.
 * Assembles all modular components and coordinates event selection modal state.
 */
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [preSelectedTitle, setPreSelectedTitle] = useState('')

  // Triggers viewport reveal animations smoothly
  useReveal()

  const tickerKeywords = [
    '24H Hackathon',
    'Robo Wars',
    'Live Music',
    'Esports Arena',
    'Bhangra & Giddha',
    'Design Duel',
    'Open-Air DJ Night',
    'Battle of Bands',
  ]

  const handleRegisterFromModal = eventTitle => {
    setPreSelectedTitle(eventTitle)
    // Smooth scroll to register section
    const regSection = document.getElementById('register')
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] selection:bg-[var(--gold)] selection:text-[var(--ink)]">
      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Main Navigation */}
      <Navbar />

      {/* Memorable Festival Hero */}
      <Hero />

      {/* Festival Ribbon Ticker */}
      <div
        className="overflow-hidden bg-[var(--gold)] text-[var(--ink)] py-3 select-none"
        aria-hidden="true"
      >
        <div className="marquee-track display text-base sm:text-lg font-bold tracking-wide">
          {[...tickerKeywords, ...tickerKeywords, ...tickerKeywords].map((word, i) => (
            <span key={i} className="px-6 flex items-center gap-4">
              <span>{word}</span>
              <span className="text-xs text-[var(--red)]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <main>
        {/* Animated Numerical Stats Strip (Derived strictly from eventData.js) */}
        <StatsStrip />

        {/* Priority Section: Timetable & Filterable Schedule */}
        <Schedule onSelectEvent={setSelectedEvent} />

        {/* Priority Section: 4 Tracks & Activity Overviews */}
        <Activities onSelectEvent={setSelectedEvent} />

        {/* Priority Section: Campus Venue, Map & Logistics */}
        <Venue />

        {/* Festival Atmosphere Highlights (100% Inline SVG) */}
        <Gallery />

        {/* Priority Section: Participation Steps & Registration Form */}
        <Register preSelectedEventTitle={preSelectedTitle} />

        {/* Collapsible FAQ Accordion */}
        <Faq />

        {/* Fictional Academic/Community Patrons Strip */}
        <Sponsors />
      </main>

      {/* Accessible Festival Footer */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs sm:text-sm opacity-70 space-y-2">
        <p className="font-semibold text-[var(--cream)]">
          {EVENT.name}{EVENT.year} · {EVENT.dates}
        </p>
        <p className="opacity-60">
          {EVENT.venue} · {EVENT.address}
        </p>
        <p className="text-[11px] opacity-40 pt-2">
          Designed for performance and accessibility with React, Tailwind CSS, and vanilla web APIs.
        </p>
      </footer>

      {/* Event Details Dialog Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegisterEvent={handleRegisterFromModal}
      />
    </div>
  )
}