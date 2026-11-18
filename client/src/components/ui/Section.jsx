// Keep sections compact while leaving enough room around their content.
export default function Section({ id, children, className = '', labelledBy }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-shell relative py-14 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  )
}
