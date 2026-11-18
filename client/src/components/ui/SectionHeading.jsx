import Reveal from './Reveal'

// Same heading block everywhere: eyebrow (12px), h2 (30/36px), optional one-line intro.
export default function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <Reveal className="section-heading mb-10 max-w-3xl sm:mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-7 bg-accent" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      </div>
      <h2 id={id} className="text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}
