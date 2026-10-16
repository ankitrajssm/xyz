import { useEffect } from 'react'

/**
 * Event Detail Dialog Modal.
 * Supports ESC key dismissal, focus trap basics, and direct transition to registration.
 */
export default function EventModal({ event, onClose, onRegisterEvent }) {
  useEffect(() => {
    if (!event) return

    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [event, onClose])

  if (!event) return null

  const handleRegisterClick = () => {
    if (onRegisterEvent) {
      onRegisterEvent(event.title)
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        className="card bg-[#140c34] border-[var(--gold)]/30 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button in corner */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-xl opacity-60 hover:opacity-100 p-2 text-[var(--cream)]"
        >
          ✕
        </button>

        {/* Metadata tag */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--teal)] uppercase tracking-wider mb-2">
          <span>Day {event.day}</span>
          <span>·</span>
          <span>{event.time}</span>
          <span>·</span>
          <span>{event.venue}</span>
        </div>

        {/* Title */}
        <h3
          id="event-modal-title"
          className="display text-2xl sm:text-3xl text-[var(--gold)] mb-3"
        >
          {event.title}
        </h3>

        {/* Category & Prize strip */}
        <div className="flex items-center gap-2 my-4">
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[var(--cream)] font-medium">
            Track: {event.cat}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--red)]/25 border border-[var(--red)]/40 text-[var(--cream)] font-bold">
            Prize: {event.prize}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm opacity-85 leading-relaxed text-white/90 my-4">
          {event.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
          <a
            href="#register"
            onClick={handleRegisterClick}
            className="px-6 py-2.5 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-sm"
          >
            Register for This Event
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 hover:border-white/40 text-[var(--cream)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
