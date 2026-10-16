/**
 * SparkleStar Component:
 * Lightweight 4-point geometric SVG star that twinkles near headers and titles.
 * Uses only transform and opacity keyframes with staggered delays.
 */
export default function SparkleStar({
  size = 18,
  delay = 0,
  className = '',
  color = 'var(--accent1)',
}) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      width={size}
      height={size}
      className={`twinkle-star pointer-events-none select-none inline-block ${className}`}
      style={{
        animationDelay: `${delay}s`,
        color,
      }}
      aria-hidden="true"
    >
      <path
        d="M 0 -9 Q 1 -2 8 0 Q 1 2 0 9 Q -1 2 -8 0 Q -1 -2 0 -9 Z"
        fill="currentColor"
      />
    </svg>
  )
}
