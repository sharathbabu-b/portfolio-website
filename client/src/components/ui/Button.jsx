import { motion, useReducedMotion } from 'framer-motion'
import { scrollToSection } from '../../utils/scroll'

// Two sizes only, so every button on the page lines up:
//   md = 44px high (hero, form)   sm = 40px high (navbar, cards)
const base =
  'portfolio-button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold leading-none select-none'

const sizes = {
  md: 'h-11 px-5',
  sm: 'h-10 px-4',
}

const variants = {
  primary: 'portfolio-button-primary text-white',
  secondary: 'portfolio-button-secondary text-ink',
}

/**
 * Renders an <a> when `href` is given, a <button> otherwise.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()
  const { onClick, ...restProps } = rest
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  const motionProps = reduce ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }
  const handleAnchorClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !href?.startsWith('#')) return

    const id = href.slice(1)
    if (!document.getElementById(id)) return

    event.preventDefault()
    scrollToSection(id)
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={handleAnchorClick}
        {...motionProps}
        {...restProps}
      >
        <span className="portfolio-button-content">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} onClick={onClick} {...motionProps} {...restProps}>
      <span className="portfolio-button-content">{children}</span>
    </motion.button>
  )
}
