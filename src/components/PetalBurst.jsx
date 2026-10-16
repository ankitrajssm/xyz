import { useEffect, useRef } from 'react'

/**
 * PetalBurst Component:
 * Celebratory burst of authentic marigold petal shapes (canvas paths, not emoji)
 * in theme accent colors that swirl and drift downward for 2.5 seconds
 * upon successful event registration, then cleanly stops and unmounts.
 */
export default function PetalBurst({ durationMs = 2500 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let startTime = performance.now()
    let isRunning = true

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const rect = canvas.getBoundingClientRect()
    const width = (canvas.width = (rect.width || 500) * dpr)
    const height = (canvas.height = (rect.height || 600) * dpr)

    // Pull theme colors
    const style = getComputedStyle(document.documentElement)
    const colors = [
      style.getPropertyValue('--accent1').trim() || '#ffb627',
      style.getPropertyValue('--accent2').trim() || '#e5446d',
      style.getPropertyValue('--accent3').trim() || '#2ec4b6',
      style.getPropertyValue('--text').trim() || '#fff4e0',
    ]

    // Create 32 marigold petals
    const petalCount = 32
    const petals = []

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: (Math.random() * 0.8 + 0.1) * width,
        y: (Math.random() * -0.3) * height,
        vx: (Math.random() - 0.5) * 1.5 * dpr,
        vy: (Math.random() * 1.8 + 1.2) * dpr,
        length: (Math.random() * 7 + 8) * dpr,
        width: (Math.random() * 4 + 4) * dpr,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        swaySpeed: Math.random() * 0.03 + 0.02,
        swayAmp: (Math.random() * 1.2 + 0.8) * dpr,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.3 + 0.7,
      })
    }

    // Helper: draw single organic marigold petal curve
    const drawPetal = (x, y, len, wid, rot, color, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.fillStyle = color
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha))

      ctx.beginPath()
      // Petal profile: pointed top, full belly, rounded base
      ctx.moveTo(0, -len)
      ctx.bezierCurveTo(wid, -len * 0.6, wid, len * 0.4, 0, len)
      ctx.bezierCurveTo(-wid, len * 0.4, -wid, -len * 0.6, 0, -len)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const render = (time) => {
      const elapsed = time - startTime
      if (elapsed > durationMs) {
        ctx.clearRect(0, 0, width, height)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Fade out over last 500ms
      const fadeRatio = elapsed > durationMs - 500 ? (durationMs - elapsed) / 500 : 1

      for (const p of petals) {
        p.x += p.vx + Math.sin(elapsed * p.swaySpeed) * p.swayAmp
        p.y += p.vy
        p.rot += p.rotSpeed

        drawPetal(p.x, p.y, p.length, p.width, p.rot, p.color, p.alpha * fadeRatio)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [durationMs])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    />
  )
}
