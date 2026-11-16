import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', parallax = true }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [64, -64])
  const Component = motion[as] ?? motion.div

  return (
    <motion.div ref={ref} style={reduce || !parallax ? undefined : { y: parallaxY }}>
      <Component
        className={className}
        initial={reduce ? false : { opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Component>
    </motion.div>
  )
}
