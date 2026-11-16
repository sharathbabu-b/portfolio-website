import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import Button from '../ui/Button'
import { profile } from '../../data/profile'
import { scrollToSection } from '../../utils/scroll'

function AnimatedLetters({ text, highlighted = false, delay = 0, loop = false }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span aria-hidden="true" className="inline">
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          {wordIndex > 0 && ' '}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((letter, letterIndex) => {
              const position = letterIndex + letterIndexOfWord(words, wordIndex)
              return (
                <AnimatedLetter
                  key={`${wordIndex}-${letterIndex}`}
                  letter={letter}
                  highlighted={highlighted}
                  reduce={reduce}
                  delay={delay + position * 0.025}
                  loop={loop}
                  loopTiming={{
                    enterDelay: position * 0.035,
                  }}
                />
              )
            })}
          </span>
        </Fragment>
      ))}
    </span>
  )
}

function letterIndexOfWord(words, wordIndex) {
  return words.slice(0, wordIndex).reduce((total, word) => total + word.length, 0)
}

function AnimatedLetter({ letter, highlighted, reduce, delay, loop, loopTiming }) {
  if (loop) {
    return (
      <motion.span
        className={`inline-block ${highlighted ? 'gradient-text' : ''}`}
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -4, 0] }}
        transition={reduce
          ? { duration: 0 }
          : {
              opacity: { duration: 0.25, delay: loopTiming.enterDelay },
              y: {
                duration: 0.55,
                delay: loopTiming.enterDelay,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: 'easeInOut',
              },
            }}
        style={{ backgroundSize: highlighted ? '200% 100%' : undefined, transformPerspective: 500 }}
      >
        {letter}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={`inline-block ${highlighted ? 'gradient-text' : ''}`}
      initial={reduce ? false : {
        opacity: 1,
        y: 10,
        ...(highlighted ? { backgroundPosition: '0% 50%' } : {}),
      }}
      animate={reduce ? undefined : {
        opacity: 1,
        y: 0,
        ...(highlighted ? { backgroundPosition: '100% 50%' } : {}),
      }}
      transition={reduce ? undefined : {
        duration: 0.38,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(highlighted
          ? { backgroundPosition: { duration: 1.1, ease: 'easeInOut', delay, repeat: 1, repeatType: 'reverse' } }
          : {}),
      }}
      style={{ backgroundSize: highlighted ? '200% 100%' : undefined, transformPerspective: 500 }}
    >
      {letter}
    </motion.span>
  )
}

function ProfileVisual() {
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[24rem]">
      <div className="absolute inset-[7%] animate-float rounded-full border-[3px] border-primary bg-surface shadow-[0_18px_48px_-32px_rgb(var(--c-primary)/0.35)]">
        <div className="h-full w-full overflow-hidden rounded-full bg-surface">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width="400"
              height="400"
              fetchpriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`${profile.name} initials`}
              className="flex h-full w-full items-center justify-center"
            >
              <span className="gradient-text font-display text-6xl font-bold sm:text-7xl">{initials}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 20%, transparent 70%)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col justify-center overflow-hidden pb-14 pt-28 sm:pt-32 lg:min-h-screen"
    >
      <Background />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
            <span className="status-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {profile.experienceYears} years of professional experience
          </p>

          <h1
            id="hero-title"
            aria-label={`Hello, I'm ${profile.name}.`}
            className="text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            <AnimatedLetters text="Hello, I'm" />{' '}
            <AnimatedLetters text={`${profile.name}.`} highlighted delay={0.2} loop />
          </h1>

          <p className="mt-4 text-lg font-medium text-accent sm:text-xl">
            {profile.title}
          </p>

          <p className="mt-5 max-w-xl font-display text-lg font-semibold leading-snug sm:text-xl">{profile.tagline}</p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{profile.intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="#projects">
              View My Projects <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary">
              <Mail size={16} aria-hidden="true" /> Contact Me
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <ProfileVisual />
        </motion.div>
      </div>

      <div className="container-x relative mt-12 hidden justify-center lg:flex">
        <a
          href="#about"
          aria-label="Scroll to About section"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection('about')
          }}
          className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          <span className="flex h-9 w-6 justify-center rounded-full border border-muted/60 pt-1.5">
            <span className="h-1.5 w-1 animate-scrollDot rounded-full bg-accent" />
          </span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
