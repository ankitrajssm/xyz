import { useState, useCallback, useRef } from 'react'
import { answerVisitorQuery } from '../utils/answerEngine'

const INITIAL_MESSAGE = {
  id: 'init-1',
  sender: 'assistant',
  text: 'Hello! I am your Tarang \'26 festival guide. Ask me anything about event schedules, hackathon rules, campus venue directions, prizes, or free registration.',
  link: null,
  timestamp: Date.now(),
}

/**
 * Hook managing Ask Tarang Assistant conversation state, typing indicator delay,
 * and memory-only chat history.
 */
export function useAssistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const typingTimerRef = useRef(null)

  const sendMessage = useCallback((queryText) => {
    if (!queryText || !queryText.trim()) return

    const trimmed = queryText.trim()
    const userMsg = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      text: trimmed,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const delay = prefersReducedMotion ? 0 : 420

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = setTimeout(() => {
      const answer = answerVisitorQuery(trimmed)
      const assistantMsg = {
        id: `ast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'assistant',
        text: answer.text,
        link: answer.link,
        fallback: answer.fallback || false,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, delay)
  }, [])

  const clearChat = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }
    setIsTyping(false)
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `init-${Date.now()}`,
        timestamp: Date.now(),
      },
    ])
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  }
}
