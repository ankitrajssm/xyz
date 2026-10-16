import { useEffect, useRef } from 'react'

/**
 * SparkBurst Component:
 * Global listener that creates an 8-12 spark burst in theme colors
 * whenever a button, card, or star bookmark is clicked.
 * Also generates a fluid ripple wave on primary buttons.
 * Fully disabled when Effects is off or prefers-reduced-motion is active.
 */
export default function SparkBurst({ effects = true }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!effects || typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const handleClick = (e) => {
      // Check if target or ancestor is button, card, or interactive element
      const interactiveEl = e.target.closest && e.target.closest('button, .card, [role="button"], a')
      if (!interactiveEl) return

      const x = e.clientX
      const y = e.clientY

      // Get current theme accent colors
      const style = getComputedStyle(document.documentElement)
      const colors = [
        style.getPropertyValue('--accent1').trim() || '#ffb627',
        style.getPropertyValue('--accent2').trim() || '#e5446d',
        style.getPropertyValue('--accent3').trim() || '#2ec4b6',
      ]

      // 1. Spark Burst (8 to 12 sparks radiating outwards)
      const count = Math.floor(Math.random() * 5) + 8
      const sparkContainer = document.createElement('div')
      sparkContainer.className = 'fixed pointer-events-none z-50'
      sparkContainer.style.left = `${x}px`
      sparkContainer.style.top = `${y}px`
      sparkContainer.setAttribute('aria-hidden', 'true')

      for (let i = 0; i < count; i++) {
        const spark = document.createElement('span')
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const dist = Math.random() * 32 + 20
        const destX = Math.cos(angle) * dist
        const destY = Math.sin(angle) * dist
        const size = Math.random() * 3.5 + 2
        const color = colors[i % colors.length]

        spark.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          box-shadow: 0 0 6px ${color};
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          transition: transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.48s ease-out;
        `
        sparkContainer.appendChild(spark)

        // Trigger animation on next frame
        requestAnimationFrame(() => {
          spark.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0.2)`
          spark.style.opacity = '0'
        })
      }

      document.body.appendChild(sparkContainer)
      setTimeout(() => {
        if (sparkContainer.parentNode) {
          sparkContainer.parentNode.removeChild(sparkContainer)
        }
      }, 520)

      // 2. Ripple wave on buttons
      if (interactiveEl.tagName === 'BUTTON' || interactiveEl.classList.contains('btn-shimmer')) {
        const rect = interactiveEl.getBoundingClientRect()
        const rippleX = x - rect.left
        const rippleY = y - rect.top
        const diameter = Math.max(rect.width, rect.height)

        const ripple = document.createElement('span')
        ripple.className = 'ripple-wave'
        ripple.style.width = `${diameter}px`
        ripple.style.height = `${diameter}px`
        ripple.style.left = `${rippleX - diameter / 2}px`
        ripple.style.top = `${rippleY - diameter / 2}px`

        interactiveEl.appendChild(ripple)
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple)
          }
        }, 600)
      }
    }

    window.addEventListener('click', handleClick, { passive: true })
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [effects])

  return <div ref={containerRef} className="hidden" aria-hidden="true" />
}
