import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap'
import { marquee } from '../data'

// Duas faixas em sentidos opostos que aceleram com a velocidade da rolagem e invertem com a direção.
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const loops = gsap.utils.toArray<HTMLElement>('.marquee__track').map((track, i) =>
      gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40, ease: 'none', repeat: -1 }),
    )
    // Começa longe do zero para poder tocar de trás para frente sem encostar no início.
    loops.forEach((l) => l.totalTime(l.duration() * 50))
    let dir = 1
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        dir = self.direction
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6)
        loops.forEach((l) => gsap.to(l, { timeScale: dir * boost, duration: 0.2, overwrite: true }))
        gsap.to(loops, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' })
        gsap.to('.marquee__row', { skewX: Math.max(-8, Math.min(8, self.getVelocity() / -300)), duration: 0.4, overwrite: true })
      },
      onLeave: () => gsap.set('.marquee__row', { skewX: 0 }),
    })
  }, { scope: root })

  const words = [...marquee, ...marquee]
  return (
    <div className="marquee" ref={root} aria-label={`Tecnologias: ${marquee.join(', ')}`}>
      {[0, 1].map((row) => (
        <div className={`marquee__row marquee__row--${row}`} key={row} aria-hidden="true">
          <div className="marquee__track">
            {words.map((w, i) => (
              <span key={i} className={i % 3 === row ? 'is-serif' : ''}>{w}<b>✳</b></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
