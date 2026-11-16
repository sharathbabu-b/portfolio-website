import { Briefcase, MapPin } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Tag from '../ui/Tag'
import { experience } from '../../data/experience'

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" eyebrow="Professional experience" title="Where I have worked" />

      <ol className="relative ml-4 border-l border-[var(--border)] sm:ml-5">
        {experience.map((job) => (
          <li key={job.id} className="relative pl-6 sm:pl-10">
            <span
              aria-hidden="true"
              className="timeline-dot absolute -left-5 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-surface text-accent"
            >
              <Briefcase size={18} />
            </span>

            <Reveal>
              <article className="card card-interactive p-5 sm:p-6">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.company}</h3>
                    <p className="mt-1 text-base text-accent">{job.role}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin size={14} aria-hidden="true" />
                      {job.location}
                    </p>
                  </div>
                  <p className="inline-flex shrink-0 items-center self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm">
                    {job.period}
                  </p>
                </header>

                <ul className="mt-5 space-y-2.5">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted transition-transform duration-300 hover:translate-x-1 sm:text-base">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--border)] pt-5" aria-label="Technologies">
                  {job.tech.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
