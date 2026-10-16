import { EVENT } from '../data/eventData'
import SparkleStar from './SparkleStar'

const VENUE_TIPS = [
  {
    icon: '🪪',
    title: 'Carry College ID',
    desc: 'A valid physical college photo ID card is mandatory for campus entry and participation in all events.',
  },
  {
    icon: '⏱️',
    title: 'Reach 30 Minutes Early',
    desc: 'Report to your respective event venue at least 30 minutes prior to scheduled start time for attendance and briefings.',
  },
  {
    icon: '💻',
    title: 'Laptops & Chargers Responsibility',
    desc: 'Laptops, chargers, adapters, and personal equipment are your own responsibility throughout the festival.',
  },
  {
    icon: '📢',
    title: 'Official Updates',
    desc: 'Follow the organisers\' official channels for updates on timetable notices and announcements.',
  },
]

/**
 * Venue section: Interactive SVG campus guide and practical generic tips.
 * Updated to use Main Gate check-in and generic festival tips only.
 */
export default function Venue() {
  return (
    <section id="venue" className="max-w-6xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header with Shimmer */}
      <div className="text-center mb-12 relative">
        <SparkleStar
          size={16}
          delay={1.1}
          color="var(--accent1)"
          className="absolute -top-3 left-1/3 hidden sm:inline-block"
        />
        <h2 className="display headline-shimmer text-3xl sm:text-5xl text-[var(--accent1)]">
          Venue & Campus
        </h2>
        <SparkleStar
          size={14}
          delay={2.4}
          color="var(--accent3)"
          className="absolute -top-1 right-1/3 hidden sm:inline-block"
        />
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          {EVENT.venue} · {EVENT.address}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Campus Map SVG Vector Card */}
        <div className="lg:col-span-6 card p-4 sm:p-6 bg-white/[0.04]">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[var(--teal)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--teal)] inline-block" />
              Interactive Campus Blueprint
            </span>
            <span className="opacity-60 text-[11px]">Main Gate Entry</span>
          </div>

          <svg
            viewBox="0 0 460 300"
            className="w-full h-auto rounded-lg border border-white/10 bg-[#0e0824]"
            role="img"
            aria-label="Map of the festival campus showing Tech Block, Open Air Theatre, Main Stage and Main Gate"
          >
            {/* Campus connecting pathways */}
            <path
              d="M 40 260 L 150 220 L 230 150 L 330 110 L 420 70"
              stroke="rgba(255, 244, 224, 0.15)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 150 220 L 150 90 L 330 110"
              stroke="rgba(255, 244, 224, 0.12)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 230 150 L 310 230"
              stroke="rgba(46, 196, 182, 0.3)"
              strokeWidth="3"
              strokeDasharray="6 4"
              fill="none"
            />

            {/* Tech Complex Block */}
            <rect x="50" y="45" width="115" height="75" rx="6" fill="#1b1242" stroke="var(--teal)" strokeWidth="1.5" />
            <text x="65" y="75" fill="var(--cream)" fontSize="11" fontWeight="bold">Tech Block</text>
            <text x="65" y="92" fill="var(--teal)" fontSize="9">Hackathon & Labs</text>

            {/* Open Air Theatre */}
            <rect x="280" y="35" width="130" height="75" rx="6" fill="#1b1242" stroke="var(--gold)" strokeWidth="1.5" />
            <text x="295" y="65" fill="var(--cream)" fontSize="11" fontWeight="bold">Open Air Theatre</text>
            <text x="295" y="82" fill="var(--gold)" fontSize="9">DJ Night & Bands</text>

            {/* Central Lawn / Cultural Arena */}
            <rect x="250" y="195" width="140" height="65" rx="6" fill="#1b1242" stroke="var(--red)" strokeWidth="1.5" />
            <text x="268" y="224" fill="var(--cream)" fontSize="11" fontWeight="bold">Central Lawn</text>
            <text x="268" y="240" fill="var(--red)" fontSize="9">Street Play & Bhangra</text>

            {/* Main Stage Focal Point with Pulsing Ring */}
            <circle cx="230" cy="150" r="12" fill="var(--gold)" />
            <circle className="pulse-beacon" cx="230" cy="150" r="22" fill="none" stroke="var(--gold)" strokeWidth="2" />
            <text x="180" y="180" fill="var(--cream)" fontSize="11" fontWeight="bold">Main Stage</text>

            {/* Main Gate Helpdesk */}
            <circle cx="45" cy="260" r="7" fill="var(--teal)" />
            <text x="60" y="264" fill="var(--cream)" fontSize="10">Main Gate Check-in</text>
          </svg>
          <div className="text-[11px] opacity-60 text-center mt-2">
            Volunteers and helpdesks are positioned at each marked zone.
          </div>
        </div>

        {/* Practical Arrival and Guidelines Tips */}
        <div className="lg:col-span-6 space-y-3">
          {VENUE_TIPS.map(tip => (
            <div key={tip.title} className="card p-4 flex gap-4 items-start">
              <span className="text-2xl shrink-0 p-1.5 rounded-lg bg-white/5" aria-hidden="true">
                {tip.icon}
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[var(--gold)]">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-75 mt-1 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
