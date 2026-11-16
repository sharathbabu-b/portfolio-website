const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const LIMITS = { name: 80, subject: 120, message: 2000 }

export function validateContact({ name, email, subject, message }) {
  const errors = {}

  const n = name.trim()
  if (!n) errors.name = 'Please enter your name.'
  else if (n.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (n.length > LIMITS.name) errors.name = `Name must be under ${LIMITS.name} characters.`

  const e = email.trim()
  if (!e) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(e)) errors.email = 'Enter a valid email address.'

  const s = subject.trim()
  if (!s) errors.subject = 'Please add a subject.'
  else if (s.length < 3) errors.subject = 'Subject must be at least 3 characters.'
  else if (s.length > LIMITS.subject) errors.subject = `Subject must be under ${LIMITS.subject} characters.`

  const m = message.trim()
  if (!m) errors.message = 'Please write a message.'
  else if (m.length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (m.length > LIMITS.message) errors.message = `Message must be under ${LIMITS.message} characters.`

  return errors
}

export const isValidEmail = (value) => EMAIL_RE.test(String(value).trim())
