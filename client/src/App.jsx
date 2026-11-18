import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AIChatbot from './components/layout/AIChatbot'
import ScrollProgress from './components/layout/ScrollProgress'
import AIParallaxBackground from './components/ui/AIParallaxBackground'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { scrollToSection } from './utils/scroll'

export default function App() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    if (navigation?.type !== 'reload' || window.location.pathname !== '/') return

    window.history.scrollRestoration = 'manual'
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    )

    const root = document.documentElement
    const scrollHome = () => {
      root.style.scrollBehavior = 'auto'
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    scrollHome()
    requestAnimationFrame(() => requestAnimationFrame(scrollHome))
  }, [])

  return (
    <div className="relative isolate min-h-screen">
      <AIParallaxBackground />
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus({ preventScroll: true })
          scrollToSection('main')
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex="-1" className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <AIChatbot />
    </div>
  )
}
