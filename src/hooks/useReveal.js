import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to elements matching selector (defaults to '.reveal').
 * When element enters viewport, adds the '.in' class to trigger transform/opacity transition.
 * Automatically unobserves elements to conserve memory and disconnects on unmount.
 */
export function useReveal(selector = '.reveal', options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately without waiting for scroll
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll(selector)

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('in'))
      return
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          obs.unobserve(entry.target)
        }
      })
    }, options)

    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [selector])
}
