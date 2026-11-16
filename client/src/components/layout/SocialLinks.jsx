import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { isPlaceholder, profile } from '../../data/profile'

const itemClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-surface/70 text-muted transition-colors'

// A social link with no URL yet renders as a disabled control rather than a dead link.
function SocialItem({ href, label, children }) {
  if (!href) {
    return (
      <span
        role="img"
        aria-label={`${label} (link not added yet)`}
        title={`${label}: add your URL in src/data/profile.js`}
        className={`${itemClass} cursor-not-allowed opacity-45`}
      >
        {children}
      </span>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      aria-label={label}
      className={`${itemClass} hover:border-primary/60 hover:text-ink`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export default function SocialLinks({ className = '' }) {
  const mail = isPlaceholder(profile.email) ? '' : `mailto:${profile.email}`
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SocialItem href={profile.socials.github} label="GitHub">
        <GithubIcon size={18} />
      </SocialItem>
      <SocialItem href={profile.socials.linkedin} label="LinkedIn">
        <LinkedinIcon size={18} />
      </SocialItem>
      <SocialItem href={mail} label="Email">
        <Mail size={18} aria-hidden="true" />
      </SocialItem>
    </div>
  )
}
