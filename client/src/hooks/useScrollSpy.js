import { useEffect, useState } from 'react'
import { scrollToSection } from '../utils/scroll'

// Returns the id of the section currently crossing the upper-middle of the viewport.
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let savedSection = ''
    try {
      savedSection = sessionStorage.getItem('portfolio-active-section') ?? ''
    } catch {
      // Section tracking is optional when browser storage is unavailable.
    }

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const initialHash = window.location.hash.slice(1)
    const restoreId = ids.includes(initialHash) ? initialHash : savedSection
    if (ids.includes(restoreId)) {
      setActive(restoreId)
      scrollToSection(restoreId, { behavior: 'auto' })
    } else if (initialHash) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
    }

    const updateActive = () => {
      const marker = window.innerHeight * 0.4
      let nextActive = elements[0].id

      for (const element of elements) {
        if (element.getBoundingClientRect().top > marker) break
        nextActive = element.id
      }

      setActive(nextActive)
      try {
        sessionStorage.setItem('portfolio-active-section', nextActive)
      } catch {
        // Section tracking is optional when browser storage is unavailable.
      }
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [ids])

  return active
}
