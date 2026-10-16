import { useState } from 'react'
import { EVENT, HELPDESK } from './data/eventData'
import { useReveal } from './hooks/useReveal'
import { useHashRoute } from './hooks/useHashRoute'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Schedule from './components/Schedule'
import Activities from './components/Activities'
import RulesSection from './components/RulesSection'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import Sponsors from './components/Sponsors'
import Register from './components/Register'
import Faq from './components/Faq'
import EventDetail from './components/EventDetail'
import AskTarang from './components/AskTarang'

/**
 * Main Tarang '26 Application Component.
 * Integrates hash routing (#/event/<id>), interactive festival sections,
 * doubt assistant, and accessible keyboard navigation.
 */
export default function App() {
  const [preSelectedTitle, setPreSelectedTitle] = useState('')
  const [assistantTrigger, setAssistantTrigger] = useState(null)
  const { activeEventId, openEvent, closeEvent } = useHashRoute()

  // Viewport scroll reveal observer
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

  const handleRegisterFromEvent = (eventTitle) => {
    setPreSelectedTitle(eventTitle)
    closeEvent()
    const regSection = document.getElementById('register')
    if (regSection) {
      setTimeout(() => {
        regSection.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  const handleAskAboutEvent = (queryText) => {
    setAssistantTrigger({ query: queryText, ts: Date.now() })
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
        {/* Animated Numerical Stats Strip (Strictly derived from eventData.js) */}
        <StatsStrip />

        {/* Priority Section: Timetable & Filterable Schedule (Opens detail view) */}
        <Schedule onSelectEvent={openEvent} />

        {/* Priority Section: 4 Tracks & Activity Overviews (Opens detail view) */}
        <Activities onSelectEvent={openEvent} />

        {/* Rules & Eligibility Guidelines */}
        <RulesSection />

        {/* Priority Section: Campus Venue, Map & Logistics */}
        <Venue />

        {/* Festival Atmosphere Highlights (Clickable cards opening detail view) */}
        <Gallery onSelectEvent={openEvent} />

        {/* Priority Section: Participation Steps & Registration Form */}
        <Register preSelectedEventTitle={preSelectedTitle} />

        {/* Collapsible FAQ Accordion */}
        <Faq />

       
        <Sponsors />
      </main>

      {/* Functional Festival Footer with Real Section Links */}
      <footer className="border-t border-white/10 py-12 px-4 bg-[#0d0722] text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
          {/* Quick Real Section Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-white/75"
          >
            <a href="#top" className="hover:text-[var(--gold)] transition-colors">Home</a>
            <a href="#schedule" className="hover:text-[var(--gold)] transition-colors">Schedule</a>
            <a href="#activities" className="hover:text-[var(--gold)] transition-colors">Tracks</a>
            <a href="#rules" className="hover:text-[var(--gold)] transition-colors">Rules & Eligibility</a>
            <a href="#venue" className="hover:text-[var(--gold)] transition-colors">Campus Venue</a>
            <a href="#gallery" className="hover:text-[var(--gold)] transition-colors">Atmosphere</a>
            <a href="#register" className="hover:text-[var(--gold)] transition-colors">Free Registration</a>
            <a href="#faq" className="hover:text-[var(--gold)] transition-colors">FAQ</a>
          </nav>

          {/* Festival Info & Helpdesk Contact */}
          <div className="space-y-1 opacity-70">
            <p className="font-semibold text-[var(--cream)]">
              {EVENT.name}{EVENT.year} · {EVENT.dates}
            </p>
            <p className="text-xs">
              {EVENT.venue} · {EVENT.address}
            </p>
            <p className="text-xs text-[var(--teal)] pt-1">
              {HELPDESK.venue}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-white/10 text-[11px] opacity-50 gap-2">
            <span>© 2026 {EVENT.name}{EVENT.year} Organizing Committee. All rights reserved.</span>
            <a
              href="#top"
              className="text-[var(--gold)] hover:underline inline-flex items-center gap-1"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Full Event Detail View with Hash Routing (#/event/<id>) */}
      {activeEventId !== null && (
        <EventDetail
          eventId={activeEventId}
          onClose={closeEvent}
          onNavigate={openEvent}
          onRegisterEvent={handleRegisterFromEvent}
          onAskTarang={handleAskAboutEvent}
        />
      )}

      {/* "Ask Tarang" Doubt Assistant (Rule-based, no external AI API) */}
      <AskTarang
        onNavigateToEvent={openEvent}
        triggerQuery={assistantTrigger}
      />
    </div>
  )
}