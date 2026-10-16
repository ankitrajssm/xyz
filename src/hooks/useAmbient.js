import { useState, useEffect } from 'react'

const STORAGE_KEY = 'tarang_ambient'

/**
 * Custom hook to manage Ambient Mode state.
 * Automatically respects prefers-reduced-motion: reduce (defaults to false).
 * Otherwise defaults to true and persists user selection in localStorage.
 */
export function useAmbient() {
  const [ambient, setAmbient] = useState(() => {
    // Check if user has explicit saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        return saved === 'true'
      }
      // Respect prefers-reduced-motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false
      }
    }
    return true
  })

  // Synchronize with prefers-reduced-motion listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => {
      // If user hasn't explicitly set localStorage, follow system preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === null && e.matches) {
        setAmbient(false)
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

  // Update root attribute and persist when state changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, String(ambient))
      document.documentElement.setAttribute('data-ambient', String(ambient))
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }, [ambient])

  const toggleAmbient = () => setAmbient(prev => !prev)

  return { ambient, setAmbient, toggleAmbient }
}
