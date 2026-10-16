import { useState } from 'react'
import { FAQS } from '../data/eventData'

/**
 * FAQ Section: Accessible collapsible accordion with smooth CSS grid expansion.
 */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = index => {
    setOpenIndex(prev => (prev === index ? -1 : index))
  }

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-16 sm:py-24 reveal">
      <div className="text-center mb-10">
        <h2 className="display text-3xl sm:text-5xl text-[var(--gold)]">Frequently Asked Questions</h2>
        <p className="text-sm sm:text-base opacity-75 mt-2 max-w-lg mx-auto">
          Common queries regarding eligibility, fees, accommodation, and equipment rules.
        </p>
      </div>

      <div className="space-y-3" role="region" aria-label="Frequently Asked Questions Accordion">
        {FAQS.map(([question, answer], index) => {
          const isOpen = openIndex === index
          const contentId = `faq-answer-${index}`
          const headerId = `faq-header-${index}`

          return (
            <div key={question} className="card overflow-hidden">
              <h3>
                <button
                  id={headerId}
                  className="w-full text-left p-4 sm:p-5 font-semibold text-sm sm:text-base flex justify-between items-center gap-4 text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(index)}
                >
                  <span>{question}</span>
                  <span
                    className="text-lg font-mono text-[var(--gold)] shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    ＋
                  </span>
                </button>
              </h3>
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden px-4 sm:px-5">
                  <p className="pb-4 text-xs sm:text-sm opacity-80 leading-relaxed text-white/90">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
