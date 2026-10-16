import { useEffect, useRef } from 'react'

/**
 * CursorGlow Component (Desktop only, pointer: fine).
 * Keeps native cursor visible while adding:
 * 1. Soft glowing lead dot directly at pointer
 * 2. Eased trailing ring that expands on buttons, links and cards
 * 3. Subtle fading sparkle trail (capped at 25 particles) in theme accent colors
 * Automatically disabled on touch screens, when tab is hidden, or when Effects is turned off.
 */
export default function CursorGlow({ effects = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!effects || typeof window === 'undefined') return
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isRunning = true

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = (canvas.width = window.innerWidth * dpr)
    let height = (canvas.height = window.innerHeight * dpr)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth * dpr
      height = canvas.height = window.innerHeight * dpr
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Mouse coordinates (logical)
    let targetX = -100
    let targetY = -100
    let ringX = -100
    let ringY = -100
    let isHovering = false
    let currentRadius = 15
    let hasMoved = false

    // Sparkle trail particles (capped at 25)
    const particles = []
    let lastSpawnTime = 0

    // Theme color cache
    let accent1 = '#ffb627'
    let accent2 = '#e5446d'
    let accent3 = '#2ec4b6'

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement)
      accent1 = style.getPropertyValue('--accent1').trim() || '#ffb627'
      accent2 = style.getPropertyValue('--accent2').trim() || '#e5446d'
      accent3 = style.getPropertyValue('--accent3').trim() || '#2ec4b6'
    }
    updateColors()

    // Helper: draw 4-point star spark
    const drawSparkle = (x, y, radius, color, alpha) => {
      ctx.save()
      ctx.beginPath()
      ctx.translate(x, y)
      ctx.fillStyle = color
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha))

      // 4-point star path
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * radius, Math.sin((i * Math.PI) / 2) * radius)
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (radius * 0.3),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (radius * 0.3)
        )
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const handlePointerMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!hasMoved) {
        hasMoved = true
        ringX = targetX
        ringY = targetY
      }

      // Detect hover over interactive elements
      const target = e.target
      isHovering = Boolean(
        target && target.closest && target.closest('button, a, [role="button"], .card, input, select')
      )

      // Spawn trail particle throttled to ~40ms
      const now = performance.now()
      if (now - lastSpawnTime > 40 && particles.length < 25) {
        lastSpawnTime = now
        const themeColors = [accent1, accent2, accent3]
        particles.push({
          x: targetX * dpr,
          y: targetY * dpr,
          size: (Math.random() * 3 + 2.5) * dpr,
          alpha: 0.9,
          vx: (Math.random() - 0.5) * 0.8 * dpr,
          vy: (Math.random() - 0.5) * 0.8 * dpr,
          life: 0,
          maxLife: Math.random() * 22 + 18,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
        })
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    // Render loop
    const render = () => {
      if (!isRunning) return

      ctx.clearRect(0, 0, width, height)

      if (hasMoved) {
        // Easing interpolation
        ringX += (targetX - ringX) * 0.22
        ringY += (targetY - ringY) * 0.22

        const targetRadius = isHovering ? 25 : 15
        currentRadius += (targetRadius - currentRadius) * 0.2

        // 1. Draw Sparkle Trail
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.life++
          p.x += p.vx
          p.y += p.vy
          p.alpha = Math.max(0, 1 - p.life / p.maxLife)

          if (p.life >= p.maxLife) {
            particles.splice(i, 1)
          } else {
            drawSparkle(p.x, p.y, p.size, p.color, p.alpha)
          }
        }

        // 2. Trailing Eased Ring
        const ringPx = ringX * dpr
        const ringPy = ringY * dpr
        const rPx = currentRadius * dpr

        ctx.save()
        ctx.beginPath()
        ctx.arc(ringPx, ringPy, rPx, 0, Math.PI * 2)
        ctx.strokeStyle = isHovering ? accent2 : accent1
        ctx.lineWidth = (isHovering ? 2 : 1.4) * dpr
        ctx.globalAlpha = isHovering ? 0.75 : 0.45
        ctx.shadowColor = isHovering ? accent2 : accent1
        ctx.shadowBlur = (isHovering ? 12 : 6) * dpr
        ctx.stroke()
        ctx.restore()

        // 3. Dot directly at pointer
        ctx.save()
        ctx.beginPath()
        ctx.arc(targetX * dpr, targetY * dpr, 3.2 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = accent1
        ctx.globalAlpha = 0.85
        ctx.shadowColor = accent1
        ctx.shadowBlur = 6 * dpr
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Visibility management
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false
        cancelAnimationFrame(animationFrameId)
      } else {
        isRunning = true
        updateColors()
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [effects])

  if (!effects) return null

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 pointer-events-none z-50 select-none"
      aria-hidden="true"
    />
  )
}
