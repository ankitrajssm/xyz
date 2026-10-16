import { useState, useEffect } from 'react'
import { EVENTS, HOW_TO_PARTICIPATE } from '../data/eventData'
import PetalBurst from './PetalBurst'
import SparkleStar from './SparkleStar'

/**
 * Registration & Participation Section.
 * Includes a prominent 3-step "How to participate" walkthrough,
 * strict input validation, localStorage persistence, and confirmation card.
 */
export default function Register({ preSelectedEventTitle }) {
  const defaultEvent = preSelectedEventTitle || EVENTS[0].title

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    college: '',
    event: defaultEvent,
  }

  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [confirmationData, setConfirmationData] = useState(null)

  // Update selected event if user clicked Register from an event modal or detail view
  useEffect(() => {
    if (preSelectedEventTitle) {
      setFormData(prev => ({ ...prev, event: preSelectedEventTitle }))
    }
  }, [preSelectedEventTitle])

  const handleChange = field => e => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = {}

    // Validation rules
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Please enter your full name (at least 3 characters).'
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., student@college.edu).'
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.'
    }
    if (!formData.college.trim()) {
      newErrors.college = 'Please enter your college or university name.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // Save to localStorage
    const record = {
      ...formData,
      id: `TRG-${Date.now().toString().slice(-6)}`,
      timestamp: Date.now(),
    }

    try {
      const stored = JSON.parse(localStorage.getItem('regs') || '[]')
      stored.push(record)
      localStorage.setItem('regs', JSON.stringify(stored))
    } catch {
      // Gracefully handle locked or disabled localStorage
    }

    setConfirmationData(record)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData(initialForm)
    setErrors({})
    setIsSubmitted(false)
    setConfirmationData(null)
  }

  const inputClass =
    'w-full mt-1.5 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-[var(--cream)] placeholder-white/30 focus:border-[var(--teal)] transition-colors'

  return (
    <section id="register" className="max-w-4xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header with Shimmer & Twinkle Stars */}
      <div className="text-center mb-12 relative">
        <SparkleStar
          size={18}
          delay={0.6}
          color="var(--accent1)"
          className="absolute -top-3 left-1/4 hidden sm:inline-block"
        />
        <h2 className="display headline-shimmer text-3xl sm:text-5xl text-[var(--accent1)]">
          Participation & Registration
        </h2>
        <SparkleStar
          size={14}
          delay={1.9}
          color="var(--accent2)"
          className="absolute -top-2 right-1/4 hidden sm:inline-block"
        />
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Free entry for all eligible college and university students. Register in one minute to secure your slot.
        </p>
      </div>

      {/* "How to participate" 3-step block with real functional links */}
      <div className="mb-14">
        <div className="text-xs uppercase font-bold tracking-widest text-[var(--teal)] text-center mb-6">
          How To Participate · 3 Simple Steps
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {HOW_TO_PARTICIPATE.map((step, idx) => {
            const stepLinks = ['#schedule', '#reg-name', '#venue']
            const linkLabels = ['Browse Timetable →', 'Jump to Form ↓', 'View Main Gate →']

            return (
              <div key={step.step} className="card p-5 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="display text-3xl text-[var(--gold)]/80 font-bold mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-base text-[var(--cream)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs opacity-70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <a
                  href={stepLinks[idx]}
                  className="mt-3 text-[11px] text-[var(--gold)] font-bold hover:underline inline-block self-start"
                >
                  {linkLabels[idx]}
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* Registration Card: Form or Confirmation Card */}
      {isSubmitted && confirmationData ? (
        <div
          className="card relative overflow-hidden max-w-xl mx-auto p-8 sm:p-10 text-center border-[var(--teal)]"
          role="status"
          aria-live="polite"
        >
          {/* Swirling Celebratory Marigold Petal Burst (2.5 seconds) */}
          <PetalBurst durationMs={2500} />

          <div className="text-5xl mb-3" aria-hidden="true">🎉</div>
          <div className="text-xs uppercase font-bold tracking-wider text-[var(--teal)] mb-1">
            Registration Confirmed
          </div>
          <h3 className="display text-2xl sm:text-3xl text-[var(--gold)]">
            You're In, {confirmationData.name.split(' ')[0]}!
          </h3>
          <p className="text-sm opacity-80 mt-2">
            You are successfully registered for{' '}
            <strong className="text-[var(--gold)]">{confirmationData.event}</strong>.
          </p>

          {/* Registration Details Summary */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 my-6 text-left text-xs sm:text-sm space-y-2">
            <div className="flex justify-between">
              <span className="opacity-60">Pass ID:</span>
              <span className="font-mono font-bold text-[var(--teal)]">{confirmationData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Participant:</span>
              <span className="font-medium">{confirmationData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Institution:</span>
              <span className="font-medium truncate max-w-[200px]">{confirmationData.college}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Reporting Spot:</span>
              <span className="font-medium text-[var(--gold)]">Registration & Help Desk (exact spot announced on event day)</span>
            </div>
          </div>

          <p className="text-xs opacity-60 mb-6">
            Please present your college ID card at the campus help desk upon arrival.
          </p>

          <button
            onClick={resetForm}
            className="inline-block px-7 py-3 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:brightness-105 transition-all text-sm cursor-pointer"
          >
            Register Another Person
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="card max-w-xl mx-auto p-6 sm:p-8 space-y-4"
          aria-label="Festival Registration Form"
        >
          <h3 className="display text-2xl text-[var(--gold)] text-center mb-2">
            Individual / Team Lead Entry
          </h3>

          {/* Full Name */}
          <div>
            <label htmlFor="reg-name" className="block text-xs font-semibold uppercase tracking-wider text-white/80">
              Full Name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="reg-name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="e.g. Aman Sharma"
              className={inputClass}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
            {errors.name && (
              <p id="err-name" className="text-xs text-[var(--red)] mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-wider text-white/80">
              Email Address <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="reg-email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="e.g. student@college.edu"
              className={inputClass}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && (
              <p id="err-email" className="text-xs text-[var(--red)] mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="reg-phone" className="block text-xs font-semibold uppercase tracking-wider text-white/80">
              Mobile Number (10 digits) <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              placeholder="e.g. 9876543210"
              className={inputClass}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
            />
            {errors.phone && (
              <p id="err-phone" className="text-xs text-[var(--red)] mt-1 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* College */}
          <div>
            <label htmlFor="reg-college" className="block text-xs font-semibold uppercase tracking-wider text-white/80">
              College / Institute Name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              id="reg-college"
              type="text"
              value={formData.college}
              onChange={handleChange('college')}
              placeholder="e.g. Punjab Engineering College"
              className={inputClass}
              aria-invalid={!!errors.college}
              aria-describedby={errors.college ? 'err-college' : undefined}
            />
            {errors.college && (
              <p id="err-college" className="text-xs text-[var(--red)] mt-1 font-medium">{errors.college}</p>
            )}
          </div>

          {/* Event selection */}
          <div>
            <label htmlFor="reg-event" className="block text-xs font-semibold uppercase tracking-wider text-white/80">
              Event <span className="text-[var(--red)]">*</span>
            </label>
            <select
              id="reg-event"
              value={formData.event}
              onChange={handleChange('event')}
              className={`${inputClass} text-black bg-white/90 cursor-pointer`}
            >
              {EVENTS.map(event => (
                <option key={event.id} value={event.title}>
                  {event.title} (Day {event.day} · {event.cat})
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] opacity-60 text-center pt-2">
            By registering, you agree to abide by the festival code of conduct and campus safety rules.
          </p>

          <button
            type="submit"
            className="btn-shimmer w-full py-3.5 rounded-full font-bold bg-[var(--accent1)] text-[var(--bg)] hover:brightness-105 transition-all text-base mt-2 cursor-pointer shadow-md"
          >
            Complete Free Registration
          </button>
        </form>
      )}
    </section>
  )
}
