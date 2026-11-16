// Keep sections compact while leaving enough room around their content.
export default function Section({ id, children, className = '', labelledBy }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-shell relative py-10 sm:py-12 ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  )
}
