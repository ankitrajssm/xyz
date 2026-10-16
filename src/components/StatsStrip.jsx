import { getDerivedStats, CATS } from '../data/eventData'
import { useCountUp } from '../hooks/useCountUp'

function StatItem({ value, label, prefix = '', suffix = '', detail }) {
  const { count, ref } = useCountUp(value, 1500)

  return (
    <div ref={ref} className="card p-5 sm:p-6 text-center flex flex-col justify-center">
      <div className="display text-3xl sm:text-5xl text-[var(--gold)] tabular-nums">
        {prefix}
        {count.toLocaleString('en-IN')}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm font-bold text-[var(--teal)] uppercase tracking-wider mt-1.5">
        {label}
      </div>
      {detail && (
        <div className="text-[11px] opacity-60 mt-1">
          {detail}
        </div>
      )}
    </div>
  )
}

/**
 * Animated statistics strip.
 * All figures are strictly derived from eventData.js (no invented numbers).
 */
export default function StatsStrip() {
  const stats = getDerivedStats()

  return (
    <section
      className="max-w-6xl mx-auto px-4 py-8 reveal"
      aria-label="Festival Statistics"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatItem
          value={stats.prizeNumeric}
          prefix="₹"
          label="Total Prize Pool"
          detail="Distributed across 7 prize events"
        />
        <StatItem
          value={stats.totalEvents}
          suffix=" Events"
          label="Flagship Competitions"
          detail="Coding, gaming, bands & more"
        />
        <StatItem
          value={stats.totalDays}
          suffix=" Days"
          label="Festival Duration"
          detail="Nov 20 to Nov 22, 2026"
        />
        <StatItem
          value={stats.totalCategories}
          suffix=" Tracks"
          label="Core Categories"
          detail={CATS.map(c => c.name).join(' · ')}
        />
      </div>
    </section>
  )
}
