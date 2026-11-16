import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function AIParallaxBackground() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const leftOrbY = useTransform(scrollYProgress, [0, 1], [0, -360])
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 240])
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 18])
  const rightOrbY = useTransform(scrollYProgress, [0, 1], [0, -260])

  return (
    <div aria-hidden="true" className="ai-parallax-background">
      <motion.div className="parallax-grid" style={reduce ? undefined : { y: gridY }} />
      <motion.div className="parallax-orb parallax-orb-left" style={reduce ? undefined : { y: leftOrbY }} />
      <motion.div className="parallax-orbit" style={reduce ? undefined : { y: orbitY, rotate: orbitRotation }} />
      <motion.div className="parallax-orb parallax-orb-right" style={reduce ? undefined : { y: rightOrbY }} />
    </div>
  )
}
