import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Page not found | Boya Sharathbabu'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="gradient-text font-display text-7xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page does not exist</h1>
      <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have been moved.</p>
      <Link
        to="/"
        className="portfolio-button portfolio-button-primary mt-8 h-11 px-5 text-sm font-semibold text-white"
      >
        <span className="portfolio-button-content">
          <Home size={16} aria-hidden="true" /> Back to home
        </span>
      </Link>
    </section>
  )
}
