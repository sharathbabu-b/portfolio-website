import { useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react'
import { isPlaceholder, profile } from '../../data/profile'

const WELCOME = {
  role: 'assistant',
  content: "Hi! I can answer questions about Boya's skills, experience, and projects.",
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [activeTooltip, setActiveTooltip] = useState('')
  const launcherRef = useRef(null)
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const phoneNumber = isPlaceholder(profile.phone) ? '' : profile.phone.replace(/\D/g, '')
  const phoneHref = phoneNumber ? `tel:+${phoneNumber}` : ''
  const whatsappHref = phoneNumber ? `https://wa.me/${phoneNumber}` : ''

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, pending, open])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const sendMessage = async (event) => {
    event.preventDefault()
    const content = draft.trim()
    if (!content || pending) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setDraft('')
    setError('')
    setPending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(1).slice(-12) }),
      })

      if (!response.headers.get('content-type')?.toLowerCase().includes('application/json')) {
        const message = response.ok
          ? 'The chat API returned an unexpected response. Restart with npm run dev or check the Node deployment.'
          : 'The chat API is unavailable. Restart with npm run dev or check the Node deployment.'
        throw new Error(message)
      }

      let data
      try {
        data = await response.json()
      } catch {
        throw new Error('The chat API returned invalid data. Please try again.')
      }

      if (!response.ok) {
        throw new Error(data.error || 'The AI could not reply. Please try again.')
      }
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('The AI returned an empty reply. Please try again.')
      }

      setMessages((current) => [...current, { role: 'assistant', content: data.reply.trim() }])
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not connect to the chat service.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="ai-chat-widget">
      {open && (
        <section
          id="ai-chat-panel"
          className="ai-chat-panel"
          role="dialog"
          aria-labelledby="ai-chat-title"
          aria-describedby="ai-chat-disclaimer"
        >
          <header className="ai-chat-header">
            <span className="ai-chat-avatar">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="ai-chat-title" className="font-display text-sm font-bold">
                AI assistant
              </h2>
              <p className="mt-0.5 text-xs text-muted">Powered by GroqCloud</p>
            </div>
            <button
              type="button"
              className="ai-chat-close"
              aria-label="Close AI assistant"
              onClick={() => {
                setOpen(false)
                launcherRef.current?.focus()
              }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="ai-chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`ai-chat-message ai-chat-message-${message.role}`}>
                {message.role === 'assistant' && (
                  <span className="ai-chat-message-icon">
                    <Bot size={15} aria-hidden="true" />
                  </span>
                )}
                <p>{message.content}</p>
              </div>
            ))}
            {pending && (
              <div className="ai-chat-pending" role="status">
                <span className="ai-chat-dots" aria-hidden="true"><i /><i /><i /></span>
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && <p className="ai-chat-error" role="alert">{error}</p>}

          <form className="ai-chat-composer" onSubmit={sendMessage}>
            <textarea
              ref={inputRef}
              rows={1}
              maxLength={2000}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Ask about skills, experience, or projects…"
              aria-label="Your message"
              disabled={pending}
            />
            <button type="submit" aria-label="Send message" disabled={pending || !draft.trim()}>
              <Send size={17} aria-hidden="true" />
            </button>
          </form>

          <p id="ai-chat-disclaimer" className="ai-chat-disclaimer">
            AI replies may be inaccurate. Messages are sent to GroqCloud; don&apos;t share sensitive information.
          </p>
        </section>
      )}

      <div className="ai-chat-shortcuts" role="group" aria-label="Contact shortcuts">
        {whatsappHref && (
          <a
            className="contact-fab contact-fab-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Message on WhatsApp"
            onMouseEnter={() => setActiveTooltip('whatsapp')}
            onMouseLeave={() => setActiveTooltip('')}
            onFocus={() => setActiveTooltip('whatsapp')}
            onBlur={() => setActiveTooltip('')}
          >
            <span className="whatsapp-mark" aria-hidden="true">
              <MessageCircle size={23} strokeWidth={2.1} />
              <Phone size={10} strokeWidth={2.5} />
            </span>
            {activeTooltip === 'whatsapp' && <span className="contact-tooltip" aria-hidden="true">WhatsApp</span>}
          </a>
        )}
        {phoneHref && (
          <a
            className="contact-fab contact-fab-phone"
            href={phoneHref}
            aria-label={`Call ${profile.phone}`}
            onMouseEnter={() => setActiveTooltip('call')}
            onMouseLeave={() => setActiveTooltip('')}
            onFocus={() => setActiveTooltip('call')}
            onBlur={() => setActiveTooltip('')}
          >
            <Phone size={19} aria-hidden="true" />
            {activeTooltip === 'call' && <span className="contact-tooltip" aria-hidden="true">Make a call</span>}
          </a>
        )}
        <button
          ref={launcherRef}
          type="button"
          className="ai-chat-launcher"
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={open}
          aria-controls="ai-chat-panel"
          onClick={() => setOpen((current) => !current)}
          onMouseEnter={() => setActiveTooltip('ai')}
          onMouseLeave={() => setActiveTooltip('')}
          onFocus={() => setActiveTooltip('ai')}
          onBlur={() => setActiveTooltip('')}
        >
          {open ? <X size={19} aria-hidden="true" /> : <Sparkles size={19} aria-hidden="true" />}
          {activeTooltip === 'ai' && (
            <span className="contact-tooltip" aria-hidden="true">{open ? 'Close chat' : 'Chat with AI'}</span>
          )}
        </button>
      </div>
    </div>
  )
}
