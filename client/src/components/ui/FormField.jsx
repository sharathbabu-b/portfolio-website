const inputBase =
  'w-full rounded-xl border bg-bg/50 px-4 py-3 text-sm text-ink shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)] placeholder:text-muted/70 transition-all duration-200 focus:border-accent/70 focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/10'

export default function FormField({ id, label, error, multiline = false, hint, ...props }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name: id,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    className: `${inputBase} ${error ? 'border-red-400/70' : 'border-[var(--border)]'}`,
    ...props,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...common} className={`${common.className} resize-y`} /> : <input {...common} />}
      <div className="mt-1.5 flex min-h-[1.25rem] justify-between gap-3 text-xs">
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-red-400">
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint && (
          <p id={`${id}-hint`} className="ml-auto text-muted">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}
