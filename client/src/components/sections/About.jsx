import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { DynamicIcon } from '../ui/Icons'
import { profile } from '../../data/profile'

export default function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" eyebrow="About me" title="Engineering with a focus on clarity and scale" />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <dl className="grid grid-cols-1 gap-3 pt-3 min-[375px]:grid-cols-3">
            {profile.aboutHighlights.map((item) => (
              <div key={item.label} className="card card-interactive flex flex-col-reverse justify-center p-3 text-center sm:p-4">
                <dt className="mt-1 text-[11px] uppercase tracking-wide text-muted">{item.label}</dt>
                <dd className="gradient-text font-display text-lg font-bold sm:text-xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {profile.aboutFocus.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.06} className="card card-interactive flex h-full gap-4 p-5">
                <span className="icon-motion flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <DynamicIcon name={item.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
