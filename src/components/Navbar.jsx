import { useState } from 'react'
import { EVENT } from '../data/eventData'
import ThemeSwitcher from './ThemeSwitcher'

const NAV_ITEMS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'activities', label: 'Activities' },
  { id: 'rules', label: 'Rules' },
  { id: 'venue', label: 'Venue' },
  { id: 'gallery', label: 'Highlights' },
  { id: 'register', label: 'Register' },
  { id: 'faq', label: 'FAQ' },
]

export default function Navbar({
  ambient = true,
  onToggleAmbient,
  effects = true,
  onToggleEffects,
  theme,
  setTheme,
  themes,
  planCount = 0,
  onOpenPlan,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 bg-[var(--bg)]/95 backdrop-blur border-b border-white/10"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Link */}
        <a
          href="#top"
          className="display text-xl sm:text-2xl text-[var(--accent1)] flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label={`${EVENT.name} ${EVENT.year} Home`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent3)] inline-block" aria-hidden="true" />
          <span>{EVENT.name}{EVENT.year}</span>
        </a>

        {/* Mobile Quick Action Buttons + Hamburger */}
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Mobile Theme Switcher */}
          <ThemeSwitcher theme={theme} setTheme={setTheme} themes={themes} />

          {/* Mobile Effects Toggle */}
          <button
            onClick={onToggleEffects}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              effects
                ? 'border-[var(--accent1)] text-[var(--accent1)] bg-[var(--accent1)]/10'
                : 'border-white/20 text-white/50 bg-white/5'
            }`}
            aria-pressed={effects}
            aria-label={`Effects: ${effects ? 'On' : 'Off'}`}
            title={`Effects: ${effects ? 'On' : 'Off'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l2.4 4.8 4.8 2.4-4.8 2.4L12 16.4l-2.4-4.8L4.8 9.2l4.8-2.4z" />
              <path d="M19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
              <path d="M5 17l.8 1.6 1.6.8-1.6.8L5 21.8l-.8-1.6-1.6-.8 1.6-.8z" />
            </svg>
          </button>

          {/* Mobile Ambient Toggle */}
          <button
            onClick={onToggleAmbient}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              ambient
                ? 'border-[var(--accent3)] text-[var(--accent3)] bg-[var(--accent3)]/10'
                : 'border-white/20 text-white/50 bg-white/5'
            }`}
            aria-pressed={ambient}
            aria-label={`Ambient mode: ${ambient ? 'On' : 'Off'}`}
            title={`Ambient mode: ${ambient ? 'On' : 'Off'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          {/* Mobile Plan Button */}
          <button
            onClick={onOpenPlan}
            className="relative p-2 rounded-lg border border-[var(--accent1)]/40 bg-[var(--accent1)]/10 text-[var(--accent1)] hover:bg-[var(--accent1)]/20 transition-colors cursor-pointer flex items-center gap-1"
            aria-label={`My Festival Plan: ${planCount} events`}
          >
            <span className="text-sm">★</span>
            {planCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[var(--accent1)] text-[var(--bg)] font-bold text-[10px]">
                {planCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            className="p-2 rounded-lg text-xl border border-white/20 hover:border-[var(--accent1)] text-[var(--text)] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links & Controls */}
        <div className="hidden sm:flex items-center gap-2.5 md:gap-4 lg:gap-5">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link-slide text-xs md:text-sm font-medium opacity-85 hover:opacity-100 hover:text-[var(--accent1)] transition-colors py-1"
            >
              {item.label}
            </a>
          ))}

          {/* Theme Switcher Dropdown */}
          <ThemeSwitcher theme={theme} setTheme={setTheme} themes={themes} />

          {/* Effects Toggle Button */}
          <button
            onClick={onToggleEffects}
            className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 px-2.5 text-xs ${
              effects
                ? 'border-[var(--accent1)]/60 bg-[var(--accent1)]/15 text-[var(--accent1)]'
                : 'border-white/20 bg-white/5 text-white/50 hover:text-white/80'
            }`}
            aria-pressed={effects}
            aria-label={`Effects: ${effects ? 'On (click to turn off)' : 'Off (click to turn on)'}`}
            title={`Effects: ${effects ? 'On' : 'Off'}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l2.4 4.8 4.8 2.4-4.8 2.4L12 16.4l-2.4-4.8L4.8 9.2l4.8-2.4z" />
              <path d="M19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
              <path d="M5 17l.8 1.6 1.6.8-1.6.8L5 21.8l-.8-1.6-1.6-.8 1.6-.8z" />
            </svg>
            <span className="hidden xl:inline text-[11px] font-medium">
              {effects ? 'FX On' : 'FX Off'}
            </span>
          </button>

          {/* Ambient Mode Toggle */}
          <button
            onClick={onToggleAmbient}
            className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 px-2.5 text-xs ${
              ambient
                ? 'border-[var(--accent3)]/60 bg-[var(--accent3)]/15 text-[var(--accent3)]'
                : 'border-white/20 bg-white/5 text-white/50 hover:text-white/80'
            }`}
            aria-pressed={ambient}
            aria-label={`Ambient Mode: ${ambient ? 'On (click to turn off)' : 'Off (click to turn on)'}`}
            title={`Ambient Mode: ${ambient ? 'On' : 'Off'}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="hidden xl:inline text-[11px] font-medium">
              {ambient ? 'Ambient' : 'Static'}
            </span>
          </button>

          {/* My Plan Button */}
          <button
            onClick={onOpenPlan}
            className="relative flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-[var(--accent1)]/50 hover:border-[var(--accent1)] bg-[var(--accent1)]/10 hover:bg-[var(--accent1)]/20 text-[var(--accent1)] transition-all cursor-pointer shadow-sm"
            aria-label={`Open My Festival Plan (${planCount} saved events)`}
          >
            <span aria-hidden="true">★</span>
            <span>My Plan</span>
            {planCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--accent1)] text-[var(--bg)] font-bold text-[10px] flex items-center justify-center">
                {planCount}
              </span>
            )}
          </button>

          {/* Register CTA with Shimmer */}
          <a
            href="#register"
            className="btn-shimmer text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-full bg-[var(--accent1)] text-[var(--bg)] hover:brightness-105 transition-all shadow-sm"
          >
            Register
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="sm:hidden bg-[var(--surface)] border-b border-white/10 px-4 py-5 flex flex-col gap-3 animate-in"
          role="menu"
        >
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              role="menuitem"
              className="text-base font-medium py-2 px-3 rounded-md hover:bg-white/5 hover:text-[var(--accent1)] transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Menu My Plan Action */}
          <button
            onClick={() => {
              closeMenu()
              if (onOpenPlan) onOpenPlan()
            }}
            className="flex items-center justify-between text-base font-semibold py-2 px-3 rounded-md bg-[var(--accent1)]/10 text-[var(--accent1)] border border-[var(--accent1)]/30 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>★</span>
              <span>My Festival Plan</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[var(--accent1)] text-[var(--bg)] text-xs font-bold">
              {planCount} saved
            </span>
          </button>

          <a
            href="#register"
            onClick={closeMenu}
            className="btn-shimmer mt-2 text-center text-sm font-bold py-2.5 rounded-full bg-[var(--accent1)] text-[var(--bg)] shadow-md"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  )
}
