import { useState, useEffect } from 'react'

/**
 * Top-of-page scroll progress indicator.
 * Computes percentage using requestAnimationFrame on passive scroll listener.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const doc = document.documentElement
          const scrollTop = window.scrollY || doc.scrollTop
          const scrollHeight = doc.scrollHeight - doc.clientHeight
          const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
          setProgress(Math.min(100, Math.max(0, pct)))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--teal)] via-[var(--gold)] to-[var(--red)] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
