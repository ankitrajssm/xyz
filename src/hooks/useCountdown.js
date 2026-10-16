import { useState, useEffect } from 'react'

/**
 * Calculates time remaining until target timestamp.
 * Ticks every 1000ms and cleans up interval on unmount.
 */
export function useCountdown(targetIsoDate) {
  const calculate = () => {
    const diff = Math.max(0, new Date(targetIsoDate).getTime() - Date.now())
    return {
      Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      Mins: Math.floor((diff / (1000 * 60)) % 60),
      Secs: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculate)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculate())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetIsoDate])

  return timeLeft
}
