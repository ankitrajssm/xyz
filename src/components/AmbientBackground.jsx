import { useEffect, useRef } from 'react'

/**
 * Section to ambient color mapping.
 * Dynamically binds each section to the active theme's accent variables.
 */
const SECTION_ACCENT_MAP = {
  schedule: '3',    // Accent 3 (Teal/Lime/Turquoise)
  activities: '1',  // Accent 1 (Gold/Cyan/Saffron)
  rules: '3',       // Accent 3
  venue: '2',       // Accent 2 (Coral/Magenta/Rose)
  gallery: '3',     // Accent 3
  register: '1',    // Accent 1
  faq: '2',         // Accent 2
}

/**
 * AmbientBackground Component:
 * 4-Layer fixed, non-intrusive backdrop with zero layout shift:
 * 1. 3 Drifting color blobs (transform only, 30-45s loops, radial gradient, no filter blur).
 * 2. Canvas ember particles (sparks rising from diya, paused on hidden or ambient=false).
 * 3. Cursor spotlight (pointer: fine only, throttled via rAF).
 * 4. Section-aware color responding to scroll intersection and theme variables.
 * Plus a vignette overlay ensuring WCAG AA text contrast.
 */
export default function AmbientBackground({ ambient = true }) {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)

  // 1. Cursor Spotlight (pointer: fine only, throttled with rAF)
  useEffect(() => {
    if (!ambient || typeof window === 'undefined') return
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    let mouseX = -1000
    let mouseY = -1000
    let rafId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.setProperty('--mouse-x', `${mouseX}px`)
            spotlightRef.current.style.setProperty('--mouse-y', `${mouseY}px`)
          }
          rafId = null
        })
      }
    }

    window.addEventListener('pointermove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ambient])

  // 2. Section-Aware Color via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionIds = Object.keys(SECTION_ACCENT_MAP)
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry = null
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry
            }
          }
        }

        if (bestEntry && bestEntry.target && bestEntry.target.id) {
          const accentIndex = SECTION_ACCENT_MAP[bestEntry.target.id] || '3'
          const style = getComputedStyle(document.documentElement)
          const hex = style.getPropertyValue(`--accent${accentIndex}`).trim()
          const rgb = style.getPropertyValue(`--accent${accentIndex}-rgb`).trim()

          if (hex && rgb) {
            document.documentElement.style.setProperty('--ambient', hex)
            document.documentElement.style.setProperty('--ambient-rgb', rgb)
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // 3. Canvas Ember Particles (Diya Sparks)
  useEffect(() => {
    if (!ambient || typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isRunning = true

    // Responsive particle count and DPR cap
    const isDesktop = window.innerWidth >= 768
    const particleCount = isDesktop ? 40 : 18
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let width = (canvas.width = window.innerWidth * dpr)
    let height = (canvas.height = window.innerHeight * dpr)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth * dpr
      height = canvas.height = window.innerHeight * dpr
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Pull current theme RGB values
    const getThemeRgbColors = () => {
      const style = getComputedStyle(document.documentElement)
      return [
        style.getPropertyValue('--accent1-rgb').trim() || '255, 182, 39',
        style.getPropertyValue('--accent2-rgb').trim() || '229, 68, 109',
        style.getPropertyValue('--accent3-rgb').trim() || '46, 196, 182',
      ]
    }

    let colors = getThemeRgbColors()

    // Initialize particles
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        vy: -(Math.random() * 0.45 + 0.25) * dpr,
        size: (Math.random() * 1.8 + 0.8) * dpr,
        alpha: Math.random() * 0.5,
        maxAlpha: Math.random() * 0.5 + 0.2,
        colorIndex: Math.floor(Math.random() * 3),
        life: Math.random() * 200,
        maxLife: Math.random() * 220 + 160,
      })
    }

    // Animation Loop
    const render = () => {
      if (!isRunning) return

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        const lifeRatio = p.life / p.maxLife
        if (lifeRatio < 0.2) {
          p.alpha = (lifeRatio / 0.2) * p.maxAlpha
        } else if (lifeRatio > 0.7) {
          p.alpha = ((1 - lifeRatio) / 0.3) * p.maxAlpha
        }

        if (p.life >= p.maxLife || p.y < -10) {
          p.x = Math.random() * width
          p.y = height + Math.random() * 20
          p.vx = (Math.random() - 0.5) * 0.35 * dpr
          p.vy = -(Math.random() * 0.45 + 0.25) * dpr
          p.life = 0
          p.alpha = 0
          p.colorIndex = Math.floor(Math.random() * 3)
        }

        const colorStr = colors[p.colorIndex] || colors[0]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorStr}, ${Math.max(0, p.alpha)})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false
        cancelAnimationFrame(animationFrameId)
      } else {
        isRunning = true
        colors = getThemeRgbColors()
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [ambient])

  if (!ambient) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Drifting Colour Glows (Radial gradients, transform only, 30-45s) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Accent 1 glow */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full ambient-blob-1 transition-colors duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent1-rgb), 0.08) 0%, rgba(var(--accent1-rgb), 0.02) 45%, transparent 70%)',
          }}
        />
        {/* Blob 2: Accent 2 glow */}
        <div
          className="absolute top-[35%] -right-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full ambient-blob-2 transition-colors duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent2-rgb), 0.07) 0%, rgba(var(--accent2-rgb), 0.015) 50%, transparent 70%)',
          }}
        />
        {/* Blob 3: Section-aware / Accent 3 glow */}
        <div
          className="absolute -bottom-[20%] left-[20%] w-[75vw] h-[75vw] max-w-[950px] max-h-[950px] rounded-full ambient-blob-3 transition-colors duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(var(--ambient-rgb), 0.08) 0%, rgba(var(--ambient-rgb), 0.02) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* Layer 2: Ember Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      />

      {/* Layer 3: Cursor Spotlight (pointer: fine only) */}
      <div
        ref={spotlightRef}
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(var(--ambient-rgb), 0.06), transparent 75%)',
        }}
      />

      {/* Layer 4: Vignette Overlay (Guarantees WCAG AA Text Contrast) */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(var(--bg-rgb), 0.45) 85%, rgba(var(--bg-rgb), 0.8) 100%)',
        }}
      />
    </div>
  )
}
