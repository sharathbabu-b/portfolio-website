import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Tag from '../ui/Tag'
import { DynamicIcon, GithubIcon } from '../ui/Icons'
import { projects } from '../../data/projects'

function CardHeader({ project }) {
  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        width="640"
        height="240"
        className="h-40 w-full object-cover"
      />
    )
  }
  return (
    <div className="flex h-24 items-center justify-between bg-primary/5 px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
        <DynamicIcon name={project.icon} size={22} />
      </span>
      <span className="rounded-full border border-[var(--border)] bg-bg/60 px-3 py-1 text-xs font-medium text-muted">
        {project.kind}
      </span>
    </div>
  )
}

function ProjectCard({ project }) {
  const reduce = useReducedMotion()
  const hasLinks = Boolean(project.liveUrl || project.githubUrl)

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="card flex h-full flex-col overflow-hidden transition-colors hover:border-primary/60"
    >
      <CardHeader project={project} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.overview}</p>

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Key features</h4>
        <ul className="space-y-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0 break-words">{feature}</span>
            </li>
          ))}
        </ul>

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Technologies</h4>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {hasLinks && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                external
                size="sm"
                aria-label={`Live demo of ${project.title} (opens in a new tab)`}
              >
                <ExternalLink size={15} aria-hidden="true" /> Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                external
                size="sm"
                variant="secondary"
                aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
              >
                <GithubIcon size={15} /> GitHub
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

function ProjectParallaxBackdrop({ targetRef }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const firstY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const secondY = useTransform(scrollYProgress, [0, 1], [-70, 70])

  return (
    <div className="project-parallax-backdrop" aria-hidden="true">
      <motion.div className="project-parallax-orb project-parallax-orb-primary" style={reduce ? undefined : { y: firstY }} />
      <motion.div className="project-parallax-orb project-parallax-orb-accent" style={reduce ? undefined : { y: secondY }} />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)

  return (
    <Section id="projects" labelledBy="projects-title">
      <div ref={sectionRef} className="project-parallax-stage">
        <ProjectParallaxBackdrop targetRef={sectionRef} />
        <div className="project-parallax-content">
          <SectionHeading
            id="projects-title"
            eyebrow="Featured projects"
            title="Projects I've built "
            description="Multi-tenant SaaS platforms built at work, and full stack projects built on my own."
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <li key={project.id} className="md:[&:last-child:nth-child(odd)]:col-span-2">
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
