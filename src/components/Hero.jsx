import { EVENT } from '../data/eventData'
import Countdown from './Countdown'
import SparkleStar from './SparkleStar'

/**
 * Hero Section
 * Memorable centerpiece: Staggered TARANG'26 title drop with shimmering gradient sweep,
 * twinkling 4-point star sparkles, and rotating geometric rangoli mandala.
 * Uses only CSS transform/opacity for lightweight 60fps rendering.
 */
export default function Hero() {
  const titleChars = (EVENT.name + EVENT.year).split('')

  return (
    <header
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-16 text-center select-none"
    >
      {/* Rich Multi-Layered Rotating Geometric Rangoli Pattern */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Outer Clockwise Rangoli Layer */}
        <svg
          className="spin-rangoli absolute w-[160vmin] h-[160vmin] max-w-[1100px] max-h-[1100px] opacity-25"
          viewBox="-150 -150 300 300"
          fill="none"
          strokeWidth="0.8"
        >
          {/* Concentric 16-point geometric squares/diamonds */}
          {[...Array(16)].map((_, i) => (
            <rect
              key={`sq-${i}`}
              x="-90"
              y="-90"
              width="180"
              height="180"
              transform={`rotate(${i * 11.25})`}
              stroke={i % 2 === 0 ? 'var(--accent1)' : 'var(--accent2)'}
              strokeDasharray={i % 3 === 0 ? '3 3' : 'none'}
            />
          ))}

          {/* Intersecting petal arches */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`petal-${i}`}
              cx={65 * Math.cos((i * Math.PI) / 6)}
              cy={65 * Math.sin((i * Math.PI) / 6)}
              r="38"
              stroke="var(--accent3)"
              opacity="0.6"
            />
          ))}

          {/* Outer perimeter star polygon */}
          <polygon
            points="0,-140 35,-110 99,-99 110,-35 140,0 110,35 99,99 35,110 0,140 -35,110 -99,99 -110,35 -140,0 -110,-35 -99,-99 -35,-110"
            stroke="var(--accent1)"
            strokeWidth="1.2"
            opacity="0.8"
          />
        </svg>

        {/* Inner Counter-Clockwise Rangoli Layer for Hypnotic Depth */}
        <svg
          className="spin-rangoli-reverse absolute w-[100vmin] h-[100vmin] max-w-[700px] max-h-[700px] opacity-20"
          viewBox="-100 -100 200 200"
          fill="none"
          strokeWidth="1"
        >
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`ell-${i}`}
              cx="0"
              cy="0"
              rx="60"
              ry="22"
              transform={`rotate(${i * 22.5})`}
              stroke="var(--accent1)"
            />
          ))}
          <circle r="60" stroke="var(--accent2)" strokeWidth="0.8" />
          <circle r="40" stroke="var(--accent3)" strokeWidth="0.8" />
          <circle r="20" stroke="var(--accent1)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Date and Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-[var(--accent3)] mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--accent3)] inline-block" />
          <span>{EVENT.dates}</span>
          <span className="opacity-40">·</span>
          <span>{EVENT.address}</span>
        </div>

        {/* Title Container with Twinkling Sparkles */}
        <div className="relative my-2">
          {/* Decorative Twinkling 4-point Stars */}
          <SparkleStar
            size={22}
            delay={0.2}
            color="var(--accent1)"
            className="absolute -top-4 -left-6 sm:-left-12"
          />
          <SparkleStar
            size={18}
            delay={1.4}
            color="var(--accent2)"
            className="absolute -bottom-2 -right-4 sm:-right-10"
          />
          <SparkleStar
            size={14}
            delay={2.1}
            color="var(--accent3)"
            className="absolute top-2 -right-6 sm:-right-8"
          />

          {/* Staggered Giant Festival Headline with Shimmer Sweep */}
          <h1
            className="display headline headline-shimmer text-[18vw] sm:text-[9.5rem] md:text-[11.5rem] leading-[0.9] tracking-tight"
            aria-label={`${EVENT.name} ${EVENT.year}`}
          >
            {titleChars.map((ch, i) => (
              <span
                key={i}
                className="drop"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>

        {/* Festival Tagline */}
        <p className="text-base sm:text-2xl font-light text-[var(--text)] opacity-90 max-w-2xl mt-4 mb-2">
          {EVENT.tagline}
        </p>
        <p className="text-xs sm:text-sm opacity-60">
          {EVENT.venue}
        </p>

        {/* Live Countdown */}
        <Countdown />

        {/* Dual Primary & Secondary CTAs with Light Shimmer sweep */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href="#register"
            className="btn-shimmer inline-block px-8 py-3.5 rounded-full font-bold bg-[var(--accent1)] text-[var(--bg)] hover:-translate-y-0.5 transition-transform shadow-md cursor-pointer"
          >
            Register Now · Free
          </a>
          <a
            href="#schedule"
            className="inline-block px-7 py-3.5 rounded-full font-semibold border border-white/20 hover:border-[var(--accent1)] text-[var(--text)] hover:-translate-y-0.5 transition-transform cursor-pointer"
          >
            Explore Schedule
          </a>
        </div>
      </div>
    </header>
  )
}
