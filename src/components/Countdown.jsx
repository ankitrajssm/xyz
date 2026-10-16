import { useCountdown } from '../hooks/useCountdown'
import { EVENT } from '../data/eventData'

/**
 * Event live countdown widget.
 * Uses tabular numbers to prevent width jitter during second ticks.
 */
export default function Countdown() {
  const timeLeft = useCountdown(EVENT.date)

  return (
    <div
      className="flex justify-center gap-2 sm:gap-4 my-6"
      role="timer"
      aria-label="Countdown until festival starts"
    >
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="card w-16 sm:w-24 py-3 sm:py-4 px-2 text-center"
        >
          <div className="display text-2xl sm:text-4xl text-[var(--gold)] tabular-nums leading-tight">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[var(--teal)] mt-1">
            {unit}
          </div>
        </div>
      ))}
    </div>
  )
}
