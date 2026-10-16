import { GENERAL_RULES } from '../data/eventData'

/**
 * Rules & Eligibility Guidelines Section.
 * Comprehensive guidelines, cross-college team policies, code of conduct,
 * and fee/refund notes sourced strictly from eventData.js.
 */
export default function RulesSection() {
  return (
    <section id="rules" className="max-w-6xl mx-auto px-4 py-16 sm:py-24 reveal">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="display text-3xl sm:text-5xl text-[var(--gold)]">
          Rules & Eligibility
        </h2>
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-xl mx-auto">
          Festival standards to ensure fair competition, campus safety, and an inclusive experience for all participants.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* General Guidelines */}
        <div className="card p-6 sm:p-7 border-l-4 border-l-[var(--gold)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">📜</span>
            <h3 className="display text-xl text-[var(--gold)]">
              General Campus Guidelines
            </h3>
          </div>
          <ul className="space-y-2.5">
            {GENERAL_RULES.guidelines.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm opacity-85 leading-relaxed">
                <span className="text-[var(--gold)] font-bold">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility Policy */}
        <div className="card p-6 sm:p-7 border-l-4 border-l-[var(--teal)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">🎓</span>
            <h3 className="display text-xl text-[var(--teal)]">
              Eligibility & Delegations
            </h3>
          </div>
          <ul className="space-y-2.5">
            {GENERAL_RULES.eligibility.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm opacity-85 leading-relaxed">
                <span className="text-[var(--teal)] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code of Conduct */}
        <div className="card p-6 sm:p-7 border-l-4 border-l-[var(--red)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">⚖️</span>
            <h3 className="display text-xl text-[var(--red)]">
              Fair Play & Code of Conduct
            </h3>
          </div>
          <ul className="space-y-2.5">
            {GENERAL_RULES.codeOfConduct.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm opacity-85 leading-relaxed">
                <span className="text-[var(--red)] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Free Registration & Accommodation Policy */}
        <div className="card p-6 sm:p-7 border-l-4 border-l-white/40">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">🎟️</span>
            <h3 className="display text-xl text-[var(--cream)]">
              Fee & Cancellation Policy
            </h3>
          </div>
          <ul className="space-y-2.5">
            {GENERAL_RULES.feeAndRefund.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm opacity-85 leading-relaxed">
                <span className="text-white/60 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
