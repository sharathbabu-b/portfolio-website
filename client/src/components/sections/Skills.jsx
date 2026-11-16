import { motion, useReducedMotion } from 'framer-motion'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Tag from '../ui/Tag'
import { DynamicIcon } from '../ui/Icons'
import { skillCategories } from '../../data/skills'

const marqueeSkills = [
  'React.js',
  'Next.js',
  'Node.js',
  'Python',
  'API Integrations',
  'LLMs',
  'RAG',
  'Claude AI',
  'Cursor AI',
  'Codex',
  'MongoDB',
  'REST APIs',
]

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: [0, -5, 0], scale: 1.05, transition: { duration: 0.4, ease: 'easeOut' } },
}

const cardVariants = {
  rest: { y: 0, borderColor: 'var(--border)' },
  hover: {
    y: -4,
    borderColor: 'rgba(40, 184, 255, 0.42)',
    boxShadow: '0 20px 36px -26px rgba(0, 0, 0, 0.38)',
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

const skillListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.12 },
  },
}

const skillItemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
}

function SkillCard({ category, index }) {
  const reduce = useReducedMotion()

  return (
    <Reveal delay={index * 0.055} className="h-full">
      <motion.article
        className="card skill-card h-full p-5 sm:p-6"
        variants={cardVariants}
        initial="rest"
        whileHover={reduce ? undefined : 'hover'}
      >
        <header className="skill-card-header mb-4 flex items-center gap-3">
          <span className="skill-card-icon relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <motion.span variants={iconVariants}>
              <DynamicIcon name={category.icon} size={20} />
            </motion.span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Skill set</p>
            <h3 className="text-lg font-semibold">{category.title}</h3>
          </div>
          <span className="skill-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </header>
        <motion.ul
          className="skill-list flex flex-wrap gap-2"
          variants={skillListVariants}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-30px' }}
        >
          {category.skills.map((skill) => (
            <motion.li
              key={skill}
              variants={skillItemVariants}
              whileHover={reduce ? undefined : { y: -3, scale: 1.045 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Tag className="skill-tag">{skill}</Tag>
            </motion.li>
          ))}
        </motion.ul>
      </motion.article>
    </Reveal>
  )
}

export default function Skills() {
  const reduce = useReducedMotion()

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="Technical skills"
        title="The tools I build with"
        description="Across full-stack development, Python, AI workflows, integrations and everyday tools."
      />

      <div className="skills-marquee mb-8" aria-hidden="true">
        <motion.div
          className="skills-marquee-track"
          animate={reduce ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={reduce ? { duration: 0 } : { duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div className="skills-marquee-group" key={copy}>
              {marqueeSkills.map((skill) => (
                <span className="skills-marquee-item" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <ul className="sr-only" aria-label="Featured skills">
        {marqueeSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <ul className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <li key={category.id}>
            <SkillCard category={category} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
