import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'tarang_theme'

export const THEMES = [
  {
    id: 'marigold',
    name: 'Marigold Night',
    desc: 'Deep indigo with golden marigold, coral & teal',
    preview: ['#ffb627', '#e5446d', '#2ec4b6'],
    bg: '#120b2e',
  },
  {
    id: 'neon',
    name: 'Neon Mela',
    desc: 'Electric festival lights: cyan, magenta & lime',
    preview: ['#00f0ff', '#ff1389', '#38ef7d'],
    bg: '#090514',
  },
  {
    id: 'sunset',
    name: 'Sunset Rangoli',
    desc: 'Warm dark maroon with saffron, rose & turquoise',
    preview: ['#ff9f1c', '#f25c78', '#20b2aa'],
    bg: '#1a070e',
  },
]

/**
 * Custom hook to manage the active festival color theme.
 * Synchronizes with [data-theme] on <html> and persists to localStorage.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved && THEMES.some(t => t.id === saved)) {
          return saved
        }
      } catch {
        // Ignore storage errors
      }
    }
    return 'marigold'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore
    }
  }, [theme])

  const setTheme = useCallback((newTheme) => {
    if (THEMES.some(t => t.id === newTheme)) {
      setThemeState(newTheme)
    }
  }, [])

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0]

  return {
    theme,
    setTheme,
    themes: THEMES,
    currentTheme: currentThemeObj,
  }
}
