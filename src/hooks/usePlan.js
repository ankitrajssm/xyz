import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'tarang_plan'

/**
 * Custom hook for managing the visitor's bookmarked "My Plan" festival itinerary.
 * Persists selected event IDs in localStorage with instant responsive state updates.
 */
export function usePlan() {
  const [plan, setPlan] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          return parsed.map(Number).filter(n => !isNaN(n))
        }
      }
    } catch {
      // Storage unavailable or corrupted
    }
    return []
  })

  // Synchronize state changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
    } catch {
      // Ignore quota exceptions
    }
  }, [plan])

  const isPlanned = useCallback(
    (id) => plan.includes(Number(id)),
    [plan]
  )

  const togglePlan = useCallback((id) => {
    const numId = Number(id)
    setPlan(prev => {
      if (prev.includes(numId)) {
        return prev.filter(item => item !== numId)
      } else {
        return [...prev, numId]
      }
    })
  }, [])

  const clearPlan = useCallback(() => {
    setPlan([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
  }, [])

  return {
    plan,
    isPlanned,
    togglePlan,
    clearPlan,
  }
}
