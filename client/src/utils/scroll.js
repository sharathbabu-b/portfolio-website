// Scrolls to a section by id, honouring the user's reduced-motion setting.
// Section offset comes from `scroll-padding-top` on <html> (see index.css).
export function scrollToSection(id, { behavior } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scrollBehavior = behavior ?? (reduce ? 'auto' : 'smooth')

  if (scrollBehavior === 'auto') {
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
    root.style.scrollBehavior = previousBehavior
  } else {
    el.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
  }

  try {
    sessionStorage.setItem('portfolio-active-section', id)
  } catch {
    // Scrolling still works when browser storage is unavailable.
  }

  if (window.location.hash) {
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
  }
}
