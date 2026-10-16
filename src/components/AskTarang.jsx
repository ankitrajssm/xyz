import { useState, useRef, useEffect } from 'react'
import { useAssistant } from '../hooks/useAssistant'

const QUICK_CHIPS = [
  'Schedule today',
  'How to save events?',
  'Add to calendar?',
  'How to register?',
  'Rules of Hackathon',
  'Venue & travel',
  'Prizes',
  'Who can participate?',
]

const FALLBACK_CHIPS = [
  'How to save events?',
  'Add to calendar?',
  'How to register?',
  'Schedule today',
  'Who can participate?',
  'Prizes',
]

/**
 * Ask Tarang Doubt Assistant UI Component.
 * Floating round button at bottom-right opening an accessible, keyboard-friendly
 * chat panel powered by the rule-based answer engine.
 */
export default function AskTarang({ onNavigateToEvent, triggerQuery }) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const { messages, isTyping, sendMessage, clearChat } = useAssistant()

  const toggleButtonRef = useRef(null)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Open and send query when triggered externally (e.g. from EventDetail)
  useEffect(() => {
    if (triggerQuery && triggerQuery.query) {
      setIsOpen(true)
      sendMessage(triggerQuery.query)
    }
  }, [triggerQuery, sendMessage])

  // Focus management: move focus into panel on open, return to trigger on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus()
      }, 50)
    } else {
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus()
      }
    }
  }, [isOpen])

  // Auto-scroll to bottom of messages container
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isOpen])

  // Esc key closes chat panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSend = (e) => {
    if (e) e.preventDefault()
    if (!inputText.trim()) return
    sendMessage(inputText)
    setInputText('')
  }

  const handleChipClick = (chipText) => {
    sendMessage(chipText)
  }

  const handleLinkClick = (hash) => {
    if (hash.startsWith('#/event/')) {
      const id = hash.replace('#/event/', '')
      if (onNavigateToEvent) {
        onNavigateToEvent(id)
      } else {
        window.location.hash = hash
      }
    } else {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Round Trigger Button at Bottom-Right */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls="ask-tarang-panel"
        aria-label={isOpen ? 'Close Ask Tarang assistant' : 'Open Ask Tarang doubt assistant'}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[var(--gold)] text-[var(--ink)] shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 group cursor-pointer border-2 border-[var(--ink)]"
      >
        <span className="text-xl" aria-hidden="true">
          {isOpen ? '✕' : '💬'}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider pr-1 hidden sm:inline">
          {isOpen ? 'Close' : 'Ask Tarang'}
        </span>
        {/* Pulsing beacon dot on button when closed */}
        {!isOpen && (
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--red)] absolute -top-0.5 -right-0.5 border-2 border-[var(--ink)] inline-block" />
        )}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <section
          id="ask-tarang-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Ask Tarang Festival Doubt Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 max-h-[560px] h-[520px] bg-[#140c34] border border-[var(--gold)]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in"
        >
          {/* Header */}
          <div className="bg-[#1b1242] border-b border-white/10 p-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] inline-block" />
              <div>
                <h3 className="font-bold text-sm text-[var(--gold)] leading-none">
                  Ask Tarang
                </h3>
                <span className="text-[10px] text-white/60">
                  Instant Festival Guide · Offline Engine
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="text-[11px] text-white/60 hover:text-[var(--gold)] hover:underline p-1"
                aria-label="Clear chat messages"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-white/70 hover:text-[var(--cream)] hover:bg-white/10 text-sm"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips Scrollbar */}
          <div className="bg-[#100928] px-3 py-2 border-b border-white/5 overflow-x-auto flex gap-1.5 shrink-0 no-scrollbar">
            {QUICK_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[var(--gold)] text-[var(--ink)] font-semibold rounded-br-none'
                      : 'bg-white/10 text-[var(--cream)] border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.text}

                  {/* Contextual Link Button */}
                  {msg.link && (
                    <button
                      onClick={() => handleLinkClick(msg.link.hash)}
                      className="mt-2.5 block text-left text-xs font-bold text-[var(--gold)] hover:underline bg-black/20 px-2.5 py-1 rounded border border-[var(--gold)]/30"
                    >
                      {msg.link.text} →
                    </button>
                  )}
                </div>

                {/* Suggestions on Fallback */}
                {msg.fallback && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {FALLBACK_CHIPS.map(chip => (
                      <button
                        key={chip}
                        onClick={() => handleChipClick(chip)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-[var(--teal)] hover:bg-white/10"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-white/50 p-2" aria-label="Tarang assistant is typing">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-bounce [animation-delay:300ms]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#1b1242] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask a question (e.g. Hackathon rules)..."
              aria-label="Ask a question about Tarang '26"
              className="flex-1 bg-white/5 border border-white/20 rounded-full px-3.5 py-2 text-xs sm:text-sm text-[var(--cream)] placeholder-white/40 focus:border-[var(--teal)] transition-colors outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send question"
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-[var(--gold)] text-[var(--ink)] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 transition-all shrink-0"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </>
  )
}
