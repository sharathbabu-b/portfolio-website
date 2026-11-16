import { Award, GraduationCap } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { certifications, education } from '../../data/education'

function Group({ icon: Icon, title, delay = 0, children }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card card-interactive h-full p-6">
        <h3 className="mb-5 flex items-center gap-3 text-lg font-semibold">
          <span className="icon-motion flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon size={20} aria-hidden="true" />
          </span>
          {title}
        </h3>
        <ul className="space-y-5">{children}</ul>
      </div>
    </Reveal>
  )
}

// Title on the left, period on the right (stacked on narrow screens).
function Entry({ title, meta, period, accent }) {
  return (
    <li className={`-ml-1 border-l-2 py-1 pl-4 transition-transform duration-300 hover:translate-x-1 ${accent}`}>
      <div className="flex flex-col gap-1 xl:flex-row xl:items-baseline xl:justify-between xl:gap-4">
        <p className="min-w-0 break-words font-medium">{title}</p>
        <p className="text-sm text-muted xl:shrink-0">{period}</p>
      </div>
      <p className="mt-1 break-words text-sm text-muted">{meta}</p>
    </li>
  )
}

export default function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading id="education-title" eyebrow="Education & certifications" title="Learning and credentials" />

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Group icon={GraduationCap} title="Education">
          {education.map((item) => (
            <Entry
              key={item.id}
              title={item.degree}
              meta={`${item.institution} | ${item.grade}`}
              period={item.period}
              accent="border-primary/40"
            />
          ))}
        </Group>

        <Group icon={Award} title="Certifications" delay={0.06}>
          {certifications.map((item) => (
            <Entry
              key={item.id}
              title={item.name}
              meta={item.issuer}
              period={item.period}
              accent="border-accent/40"
            />
          ))}
        </Group>
      </div>
    </Section>
  )
}
