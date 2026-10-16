import { useState, useEffect, useRef } from 'react'

/**
 * Smoothly animates an integer from 0 to endValue using requestAnimationFrame
 * triggered when the element scrolls into view via IntersectionObserver.
 * Instantly resolves to endValue if the user prefers reduced motion.
 */
export function useCountUp(endValue, duration = 1400) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(endValue)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.2 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [endValue])

  useEffect(() => {
    if (!started) return

    let startTime = null
    let animationFrameId = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Cubic ease-out: fast onset, smooth deceleration
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOutProgress * endValue))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [started, endValue, duration])

  return { count, ref }
}
