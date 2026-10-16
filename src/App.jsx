import { useState } from 'react'
import { EVENT, HELPDESK } from './data/eventData'
import { useReveal } from './hooks/useReveal'
import { useHashRoute } from './hooks/useHashRoute'
import { useAmbient } from './hooks/useAmbient'
import { usePlan } from './hooks/usePlan'
import { useTheme } from './hooks/useTheme'
import { useEffects } from './hooks/useEffects'
import ScrollProgress from './components/ScrollProgress'
import AmbientBackground from './components/AmbientBackground'
import CursorGlow from './components/CursorGlow'
import SparkBurst from './components/SparkBurst'
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
import PlanDrawer from './components/PlanDrawer'

/**
 * Main Tarang '26 Application Component.
 * Integrates 3 Themes (Marigold Night, Neon Mela, Sunset Rangoli),
 * Cursor trail effect, Click spark bursts, Ambient Mode,
 * My Plan itinerary drawer with clash detection, and Ask Tarang.
 */
export default function App() {
  const [preSelectedTitle, setPreSelectedTitle] = useState('')
  const [assistantTrigger, setAssistantTrigger] = useState(null)
  const [isPlanOpen, setIsPlanOpen] = useState(false)

  // Custom Hooks
  const { activeEventId, openEvent, closeEvent } = useHashRoute()
  const { ambient, toggleAmbient } = useAmbient()
  const { plan, isPlanned, togglePlan, clearPlan } = usePlan()
  const { theme, setTheme, themes } = useTheme()
  const { effects, toggleEffects } = useEffects()

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
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent1)] selection:text-[var(--bg)]">
      {/* Dynamic Cursor Glow & Trail (Desktop pointer: fine only) */}
      <CursorGlow effects={effects} />

      {/* Global Click Spark Burst & Ripple Wave */}
      <SparkBurst effects={effects} />

      {/* 4-Layer Ambient Mode Background (Pointer events none, behind content) */}
      <AmbientBackground ambient={ambient} />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Main Navigation with Theme Switcher, Effects Toggle, Ambient Toggle and My Plan counter */}
      <Navbar
        ambient={ambient}
        onToggleAmbient={toggleAmbient}
        effects={effects}
        onToggleEffects={toggleEffects}
        theme={theme}
        setTheme={setTheme}
        themes={themes}
        planCount={plan.length}
        onOpenPlan={() => setIsPlanOpen(true)}
      />

      {/* Memorable Festival Hero */}
      <Hero />

      {/* Festival Ribbon Ticker */}
      <div
        className="overflow-hidden bg-[var(--accent1)] text-[var(--bg)] py-3 select-none"
        aria-hidden="true"
      >
        <div className="marquee-track display text-base sm:text-lg font-bold tracking-wide">
          {[...tickerKeywords, ...tickerKeywords, ...tickerKeywords].map((word, i) => (
            <span key={i} className="px-6 flex items-center gap-4">
              <span>{word}</span>
              <span className="text-xs text-[var(--accent2)]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Animated Numerical Stats Strip (Strictly derived from eventData.js) */}
        <StatsStrip />

        {/* Priority Section: Timetable & Filterable Schedule (Opens detail view & bookmarking) */}
        <Schedule
          onSelectEvent={openEvent}
          isPlanned={isPlanned}
          onTogglePlan={togglePlan}
        />

        {/* Priority Section: 4 Tracks & Activity Overviews (Opens detail view & bookmarking) */}
        <Activities
          onSelectEvent={openEvent}
          isPlanned={isPlanned}
          onTogglePlan={togglePlan}
        />

        {/* Rules & Eligibility Guidelines */}
        <RulesSection />

        {/* Priority Section: Campus Venue, Map & Logistics */}
        <Venue />

        {/* Festival Atmosphere Highlights (Clickable cards opening detail view & bookmarking) */}
        <Gallery
          onSelectEvent={openEvent}
          isPlanned={isPlanned}
          onTogglePlan={togglePlan}
        />

        {/* Priority Section: Participation Steps & Registration Form */}
        <Register preSelectedEventTitle={preSelectedTitle} />

        {/* Collapsible FAQ Accordion */}
        <Faq />

        {/* Neutral Partners Placeholder Badges */}
        <Sponsors />
      </main>

      {/* Functional Festival Footer with Real Section Links */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 bg-[var(--surface)] text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
          {/* Quick Real Section Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-white/75"
          >
            <a href="#top" className="hover:text-[var(--accent1)] transition-colors">Home</a>
            <a href="#schedule" className="hover:text-[var(--accent1)] transition-colors">Schedule</a>
            <a href="#activities" className="hover:text-[var(--accent1)] transition-colors">Tracks</a>
            <a href="#rules" className="hover:text-[var(--accent1)] transition-colors">Rules & Eligibility</a>
            <a href="#venue" className="hover:text-[var(--accent1)] transition-colors">Campus Venue</a>
            <a href="#gallery" className="hover:text-[var(--accent1)] transition-colors">Atmosphere</a>
            <a href="#register" className="hover:text-[var(--accent1)] transition-colors">Free Registration</a>
            <a href="#faq" className="hover:text-[var(--accent1)] transition-colors">FAQ</a>
          </nav>

          {/* Festival Info & Helpdesk Contact */}
          <div className="space-y-1 opacity-70">
            <p className="font-semibold text-[var(--text)]">
              {EVENT.name}{EVENT.year} · {EVENT.dates}
            </p>
            <p className="text-xs">
              {EVENT.venue} · {EVENT.address}
            </p>
            <p className="text-xs text-[var(--accent3)] pt-1">
              {HELPDESK.venue}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-white/10 text-[11px] opacity-50 gap-2">
            <span>© 2026 {EVENT.name}{EVENT.year} Organizing Committee. All rights reserved.</span>
            <a
              href="#top"
              className="text-[var(--accent1)] hover:underline inline-flex items-center gap-1"
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
          isPlanned={isPlanned}
          onTogglePlan={togglePlan}
        />
      )}

      {/* My Plan Slide-over Drawer with Schedule Clash Detection */}
      <PlanDrawer
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
        plan={plan}
        togglePlan={togglePlan}
        clearPlan={clearPlan}
        onSelectEvent={openEvent}
      />

      {/* "Ask Tarang" Doubt Assistant (Rule-based, no external AI API) */}
      <AskTarang
        onNavigateToEvent={openEvent}
        triggerQuery={assistantTrigger}
      />
    </div>
  )
}