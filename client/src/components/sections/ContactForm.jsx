import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import { isPlaceholder, profile } from '../../data/profile'
import { LIMITS, validateContact } from '../../utils/validation'

const EMPTY = { name: '', email: '', subject: '', message: '' }

// There is no backend here, so the form never claims a message was sent.
// With a real email configured it opens the visitor's email app with the
// message prefilled; without one it says plainly that nothing was sent.
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState(null)

  const hasRealEmail = !isPlaceholder(profile.email)

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateContact(next)[field] }))
    if (status) setStatus(null)
  }

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateContact(values)[field] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      setStatus({ type: 'error', text: 'Please fix the highlighted fields.' })
      return
    }

    if (!hasRealEmail) {
      setStatus({
        type: 'info',
        text: 'Your details look good, but this message was not sent: no email address or email service is connected to this site yet.',
      })
      return
    }

    const body = `${values.message.trim()}\n\n- ${values.name.trim()} (${values.email.trim()})`
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setStatus({
      type: 'info',
      text: 'Your email app should now open with the message ready. It has not been sent until you send it from there.',
    })
  }

  const statusStyle =
    status?.type === 'error' ? 'border-red-400/40 bg-red-400/10 text-red-300' : 'border-accent/40 bg-accent/10 text-ink'

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form card h-full p-6 sm:p-8 lg:p-9" aria-label="Contact form">
      <div className="mb-7 border-b border-[var(--border)] pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Send a message</p>
        <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Tell me about your idea</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your email app will open with the message ready for you to review and send.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="name" label="Name" autoComplete="name" placeholder="Your name" value={values.name} onChange={update('name')} onBlur={blur('name')} error={errors.name} maxLength={LIMITS.name} />
          <FormField id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={update('email')} onBlur={blur('email')} error={errors.email} />
        </div>
        <FormField id="subject" label="Subject" placeholder="What is this about?" value={values.subject} onChange={update('subject')} onBlur={blur('subject')} error={errors.subject} maxLength={LIMITS.subject} />
        <FormField
          id="message"
          label="Message"
          multiline
          placeholder="Tell me about your project or opportunity"
          value={values.message}
          onChange={update('message')}
          onBlur={blur('message')}
          error={errors.message}
          maxLength={LIMITS.message}
          hint={`${values.message.length}/${LIMITS.message}`}
        />
      </div>

      <Button type="submit" className="mt-6 w-full sm:w-auto">
        <Send size={16} aria-hidden="true" /> Send Message
      </Button>

      <div aria-live="polite" className="mt-4">
        {status && <p className={`rounded-xl border px-4 py-3 text-sm ${statusStyle}`}>{status.text}</p>}
      </div>
    </form>
  )
}
