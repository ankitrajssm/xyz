import { useState } from 'react'
import { EVENT } from '../data/eventData'

const NAV_ITEMS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'activities', label: 'Activities' },
  { id: 'rules', label: 'Rules' },
  { id: 'venue', label: 'Venue' },
  { id: 'gallery', label: 'Highlights' },
  { id: 'register', label: 'Register' },
  { id: 'faq', label: 'FAQ' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 bg-[var(--ink)]/95 backdrop-blur border-b border-white/10"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Link */}
        <a
          href="#top"
          className="display text-xl sm:text-2xl text-[var(--gold)] flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label={`${EVENT.name} ${EVENT.year} Home`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] inline-block" aria-hidden="true" />
          <span>{EVENT.name}{EVENT.year}</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden p-2 rounded-lg text-xl border border-white/20 hover:border-[var(--gold)] text-[var(--cream)] cursor-pointer"
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

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-5 md:gap-6">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs md:text-sm font-medium opacity-85 hover:opacity-100 hover:text-[var(--gold)] transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#register"
            className="text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-full bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all"
          >
            Register
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="sm:hidden bg-[var(--ink)] border-b border-white/10 px-4 py-5 flex flex-col gap-3"
          role="menu"
        >
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              role="menuitem"
              className="text-base font-medium py-2 px-3 rounded-md hover:bg-white/5 hover:text-[var(--gold)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={closeMenu}
            className="mt-2 text-center text-sm font-bold py-2.5 rounded-full bg-[var(--gold)] text-[var(--ink)]"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  )
}
