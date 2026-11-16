import { Mail, MapPin, Phone } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import EditableText from '../ui/EditableText'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import ContactForm from './ContactForm'
import { isPlaceholder, profile } from '../../data/profile'

const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '')

function DetailRow({ icon: Icon, label, value, href }) {
  const content = isPlaceholder(value) || !href ? (
    <EditableText value={value} />
  ) : (
    <a href={href} className="break-all transition-colors hover:text-accent" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {value}
    </a>
  )

  return (
    <li className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
      <span className="contact-detail-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-0.5 text-sm sm:text-base">{content}</p>
      </div>
    </li>
  )
}

export default function Contact() {
  const { github, linkedin } = profile.socials
  const phoneHref = isPlaceholder(profile.phone) ? '' : `tel:${profile.phone.replace(/\s+/g, '')}`

  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Let's Build Something Great Together."
        description="Have a project, role or idea in mind? Use the form or reach out directly."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <Reveal className="h-full">
          <div className="contact-details-panel h-full rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Direct contact</p>
            <h3 className="mt-4 max-w-sm font-display text-2xl font-bold leading-tight sm:text-3xl">
              Let&apos;s talk about what you&apos;re building.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Choose the channel that works best for you. I&apos;m happy to discuss projects, roles, and ideas.
            </p>
            <ul className="mt-8 space-y-5">
              <DetailRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <DetailRow icon={Phone} label="Phone" value={profile.phone} href={phoneHref} />
              <DetailRow icon={LinkedinIcon} label="LinkedIn" value={displayUrl(linkedin)} href={linkedin} />
              <DetailRow icon={GithubIcon} label="GitHub" value={displayUrl(github)} href={github} />
              <DetailRow icon={MapPin} label="Location" value={profile.contactLocation} />
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
