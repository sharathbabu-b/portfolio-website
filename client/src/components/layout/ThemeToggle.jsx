import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-surface/70 text-muted transition-colors hover:border-primary/60 hover:text-ink"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
