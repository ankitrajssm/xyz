import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Custom Hash Routing Hook for Event Detail Views (#/event/<id>).
 * - Enables direct links and browser back/forward buttons (popstate & hashchange).
 * - Restores user's previous scroll position when closing the detail view.
 * - Handles Escape key to return to main page.
 */
export function useHashRoute() {
  const [activeEventId, setActiveEventId] = useState(null)
  const savedScrollY = useRef(0)
  const wasOpenedRef = useRef(false)

  // Parse current hash on mount and hash changes
  const checkHash = useCallback(() => {
    const hash = window.location.hash || ''
    const match = hash.match(/^#\/event\/([a-zA-Z0-9_-]+)/)

    if (match) {
      if (!wasOpenedRef.current) {
        // Save current scroll position before entering detail view
        savedScrollY.current = window.scrollY || document.documentElement.scrollTop || 0
        wasOpenedRef.current = true
      }
      setActiveEventId(match[1])
    } else {
      if (wasOpenedRef.current) {
        // Exiting detail view: restore scroll position
        wasOpenedRef.current = false
        setActiveEventId(null)
        const targetY = savedScrollY.current
        setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' })
        }, 10)
      } else {
        setActiveEventId(null)
      }
    }
  }, [])

  useEffect(() => {
    checkHash()
    window.addEventListener('hashchange', checkHash)
    window.addEventListener('popstate', checkHash)

    // Escape key listener to close detail view
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && window.location.hash.startsWith('#/event/')) {
        closeEvent()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('hashchange', checkHash)
      window.removeEventListener('popstate', checkHash)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [checkHash])

  const openEvent = useCallback((id) => {
    if (!wasOpenedRef.current) {
      savedScrollY.current = window.scrollY || document.documentElement.scrollTop || 0
      wasOpenedRef.current = true
    }
    window.location.hash = `#/event/${id}`
  }, [])

  const closeEvent = useCallback(() => {
    if (window.location.hash.startsWith('#/event/')) {
      // Return to base URL without hash or with empty hash
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.hash = ''
      }
    }
  }, [])

  return {
    activeEventId,
    openEvent,
    closeEvent,
  }
}
