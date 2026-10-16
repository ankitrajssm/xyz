import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'tarang_effects'

/**
 * Custom hook to manage the "Effects" mode toggle.
 * Controls cursor trail, click spark bursts, heading sparkles, and celebration petals.
 * Automatically respects prefers-reduced-motion: reduce (defaults to false).
 * Persists user choice in localStorage and reflects on [data-effects] on <html>.
 */
export function useEffects() {
  const [effects, setEffectsState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved !== null) {
          return saved === 'true'
        }
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return false
        }
      } catch {
        // Storage unavailable
      }
    }
    return true
  })

  // Synchronize with prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === null && e.matches) {
          setEffectsState(false)
        }
      } catch {
        // Ignore
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  // Sync state to <html> attribute and localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      document.documentElement.setAttribute('data-effects', String(effects))
      localStorage.setItem(STORAGE_KEY, String(effects))
    } catch {
      // Ignore
    }
  }, [effects])

  const toggleEffects = useCallback(() => {
    setEffectsState(prev => !prev)
  }, [])

  const setEffects = useCallback((val) => {
    setEffectsState(Boolean(val))
  }, [])

  return {
    effects,
    setEffects,
    toggleEffects,
  }
}
