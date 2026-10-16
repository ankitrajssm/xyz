import { useState, useRef, useEffect } from 'react'

/**
 * ThemeSwitcher Component:
 * Accessible dropdown menu allowing visitors to switch between:
 * 1. Marigold Night (Default)
 * 2. Neon Mela
 * 3. Sunset Rangoli
 */
export default function ThemeSwitcher({ theme, setTheme, themes }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleOpen = () => setIsOpen(prev => !prev)

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        if (buttonRef.current) buttonRef.current.focus()
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left">
      {/* Palette Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change festival color theme"
        title="Change theme"
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-white/20 hover:border-[var(--accent1)] bg-white/5 hover:bg-white/10 text-[var(--text)] transition-all cursor-pointer flex items-center gap-1.5 text-xs"
      >
        {/* Palette SVG Icon */}
        <svg
          className="w-3.5 h-3.5 text-[var(--accent1)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>

        <span className="hidden lg:inline font-medium text-[11px] capitalize">
          {theme}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          aria-label="Color Themes"
          className="absolute right-0 mt-2 w-56 rounded-xl bg-[var(--surface)] border border-white/15 shadow-2xl p-1.5 z-50 animate-in focus:outline-none"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent3)] border-b border-white/10 mb-1">
            Festival Color Theme
          </div>

          {themes.map(t => {
            const isSelected = theme === t.id
            return (
              <button
                key={t.id}
                role="menuitem"
                type="button"
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 text-[var(--accent1)] font-bold'
                    : 'text-[var(--text)] opacity-85 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Swatch previews */}
                  <div className="flex items-center -space-x-1" aria-hidden="true">
                    {t.preview.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3 h-3 rounded-full border border-black/40 inline-block shrink-0 shadow-xs"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-xs leading-tight">{t.name}</div>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[var(--accent1)] font-bold ml-2 text-xs" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
