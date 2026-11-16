import { isPlaceholder } from '../../data/profile'

export default function Tag({ children, className = '' }) {
  const placeholder = isPlaceholder(children)
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium leading-5 ${className} ${
        placeholder
          ? 'border-dashed border-muted/50 italic text-muted'
          : 'border-[var(--border)] bg-bg/60 text-ink'
      }`}
    >
      {children}
    </span>
  )
}
