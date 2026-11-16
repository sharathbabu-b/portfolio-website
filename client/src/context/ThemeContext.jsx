import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const readInitialTheme = () => {
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#181816' : '#F8F7F4')
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      /* storage unavailable: theme still works for this visit */
    }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
