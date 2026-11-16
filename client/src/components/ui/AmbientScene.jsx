import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 280

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 animatedPosition = position;
    animatedPosition.x += sin(uTime * 0.18 + aPhase) * 0.12;
    animatedPosition.y += cos(uTime * 0.14 + aPhase * 1.7) * 0.16;

    vec4 viewPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * uPixelRatio * (32.0 / -viewPosition.z);

    vColor = aColor;
    vAlpha = 0.22 + 0.38 * (0.5 + 0.5 * sin(uTime * 0.42 + aPhase));
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float distanceFromCenter = length(gl_PointCoord - 0.5);
    float glow = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`

export default function AmbientScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    if (!canvas || !section) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch (error) {
      console.error('Unable to initialize the Three.js background scene.', error)
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 10

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const violet = new THREE.Color('#7657ff')
    const blue = new THREE.Color('#28b8ff')

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const offset = i * 3
      positions[offset] = Math.random() * 14 - 7
      positions[offset + 1] = Math.random() * 8 - 4
      positions[offset + 2] = Math.random() * -4
      sizes[i] = Math.random() * 1.7 + 0.7
      phases[i] = Math.random() * Math.PI * 2

      const color = violet.clone().lerp(blue, Math.random())
      colors[offset] = color.r
      colors[offset + 1] = color.g
      colors[offset + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const rings = new THREE.Group()
    const ringColors = ['#7657ff', '#28b8ff', '#7657ff']
    const ringMaterials = ringColors.map(
      (color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.19, depthWrite: false }),
    )
    const ringGeometry = new THREE.TorusGeometry(1, 0.006, 6, 160)

    ringMaterials.forEach((ringMaterial, index) => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.set(Math.PI / 2 + index * 0.28, index * 0.36, index * 0.2)
      rings.add(ring)
    })
    scene.add(rings)

    const orbit = new THREE.Group()
    const orbitDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 12),
      new THREE.MeshBasicMaterial({ color: '#28b8ff' }),
    )
    orbit.add(orbitDot)
    scene.add(orbit)

    let pointerX = 0
    let pointerY = 0
    let ringCenterX = 0
    const handlePointerMove = (event) => {
      if (reducedMotion) return
      const bounds = section.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      pointerX = (event.clientX - bounds.left) / bounds.width - 0.5
      pointerY = (event.clientY - bounds.top) / bounds.height - 0.5
    }

    section.addEventListener('pointermove', handlePointerMove, { passive: true })

    const resize = () => {
      const { width, height } = section.getBoundingClientRect()
      if (!width || !height) return

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
      const ringRadius = Math.min(visibleHeight * 0.3, (visibleHeight * camera.aspect) * 0.16)
      ringCenterX = visibleHeight * camera.aspect * 0.2
      rings.position.set(ringCenterX, 0, -0.5)
      rings.scale.setScalar(ringRadius)
      orbit.position.copy(rings.position)
      orbitDot.position.x = 1
      orbit.scale.setScalar(ringRadius)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)

    const timer = new THREE.Timer()
    timer.connect(document)
    let frameId
    let inView = false
    const render = () => {
      if (!inView) return
      timer.update()
      const time = reducedMotion ? 0 : timer.getElapsed()
      material.uniforms.uTime.value = time
      particles.position.x = pointerX * 0.12
      particles.position.y = -pointerY * 0.12
      if (!reducedMotion) {
        rings.rotation.z = Math.sin(time * 0.16) * 0.13
        rings.rotation.y = Math.cos(time * 0.12) * 0.09
        rings.position.x += (ringCenterX + pointerX * 0.18 - rings.position.x) * 0.03
        rings.position.y += (pointerY * 0.14 - rings.position.y) * 0.03
        orbit.position.copy(rings.position)
        orbit.rotation.z = time * 0.24
      }
      renderer.render(scene, camera)
      if (!reducedMotion) frameId = window.requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) {
          if (frameId) window.cancelAnimationFrame(frameId)
          timer.dispose()
          render()
        } else if (frameId) {
          window.cancelAnimationFrame(frameId)
          frameId = undefined
        }
      },
      { threshold: 0 },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      section.removeEventListener('pointermove', handlePointerMove)
      if (frameId) window.cancelAnimationFrame(frameId)
      geometry.dispose()
      material.dispose()
      ringGeometry.dispose()
      ringMaterials.forEach((ringMaterial) => ringMaterial.dispose())
      orbitDot.geometry.dispose()
      orbitDot.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="ambient-scene pointer-events-none absolute inset-0 h-full w-full" />
}
