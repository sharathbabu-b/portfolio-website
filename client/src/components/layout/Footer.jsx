import { ArrowUpRight } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { isPlaceholder, profile } from '../../data/profile'
import Button from '../ui/Button'
import SocialLinks from './SocialLinks'
import { scrollToSection } from '../../utils/scroll'

export default function Footer() {
  const year = new Date().getFullYear()
  const phoneHref = isPlaceholder(profile.phone) ? '' : `tel:${profile.phone.replace(/\s+/g, '')}`
  const emailHref = isPlaceholder(profile.email) ? '' : `mailto:${profile.email}`
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <footer className="site-footer">
      <div className="container-x relative z-10 py-12 sm:py-16">
        <div className="footer-cta">
          <div>
            <p className="footer-kicker">Ready when you are</p>
            <h2 className="footer-cta-title">
              Let&apos;s build <span className="gradient-text">something worth using.</span>
            </h2>
          </div>
          <Button href="#contact" size="sm" className="shrink-0">
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <div className="footer-main">
          <div className="footer-brand-block">
            <div className="flex items-center gap-4">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt=""
                  width="60"
                  height="60"
                  loading="lazy"
                  className="h-[3.75rem] w-[3.75rem] rounded-2xl border border-[var(--border)] object-cover shadow-lg"
                />
              ) : (
                <span className="footer-initials">{initials}</span>
              )}
              <div>
                <p className="font-display text-lg font-bold">{profile.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {profile.title}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Building thoughtful, scalable web experiences with the MERN stack.
            </p>
            <SocialLinks className="footer-social-links mt-6" />
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <p className="footer-kicker">Explore</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(link.id)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-direct">
            <p className="footer-kicker">Direct contact</p>
            <div className="mt-4 space-y-2">
              {emailHref && (
                <a className="footer-direct-link" href={emailHref}>
                  <span className="footer-direct-copy">
                    <span className="footer-direct-label">Email</span>
                    <span className="footer-direct-value">{profile.email}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {phoneHref && (
                <a className="footer-direct-link" href={phoneHref}>
                  <span className="footer-direct-copy">
                    <span className="footer-direct-label">Phone</span>
                    <span className="footer-direct-value">{profile.phone}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} {profile.name}. All rights reserved.</p>
          <p>{profile.contactLocation}</p>
        </div>
      </div>
    </footer>
  )
}
