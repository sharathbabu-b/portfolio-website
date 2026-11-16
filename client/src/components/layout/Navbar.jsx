import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, sectionIds } from '../../data/navigation'
import { profile } from '../../data/profile'
import useScrollSpy from '../../hooks/useScrollSpy'
import { scrollToSection } from '../../utils/scroll'
import ThemeToggle from './ThemeToggle'
import ResumeButton from '../ui/ResumeButton'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  // Closing the menu while the browser runs its own smooth anchor scroll
  // cancels that scroll on mobile, so while the menu is open we wait for its
  // exit animation to finish and then scroll ourselves.
  const pendingId = useRef(null)

  const goTo = (id) => (e) => {
    e.preventDefault()
    if (open) {
      pendingId.current = id
      setOpen(false)
    } else {
      scrollToSection(id)
    }
  }

  const handleExitComplete = () => {
    const id = pendingId.current
    pendingId.current = null
    if (id) scrollToSection(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] backdrop-blur-xl transition-all duration-300 ${
        scrolled || open
          ? 'bg-bg/90 shadow-[0_8px_30px_-20px_rgb(0_0_0/0.6)]'
          : 'bg-bg/70 shadow-[0_8px_24px_-24px_rgb(0_0_0/0.6)]'
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#home" onClick={goTo('home')} className="whitespace-nowrap font-display text-sm font-bold tracking-wider sm:text-lg">
          <span className="gradient-text">{profile.logo}</span>
        </a>

        <ul className="hidden items-center gap-0.5 rounded-full border border-[var(--border)] bg-surface/40 p-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={goTo(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'bg-primary/15 text-ink'
                    : 'text-muted hover:bg-surface/70 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ResumeButton variant="primary" size="sm" />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-surface/70 text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence onExitComplete={handleExitComplete}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--border)] lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={goTo(link.id)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      active === link.id ? 'bg-primary/15 text-ink' : 'text-muted hover:bg-primary/10 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <ResumeButton variant="primary" className="w-full" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
