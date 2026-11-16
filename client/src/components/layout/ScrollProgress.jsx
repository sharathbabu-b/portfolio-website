import useScrollProgress from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
