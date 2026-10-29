import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../gsap'
import { setScrollLocked } from '../hooks/useLenis'
import { useLang } from '../i18n'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(root.current, { display: 'none' })
      onDone()
      return
    }
    setScrollLocked(true)
    const counter = { v: 0 }
    gsap.timeline({
      onComplete: () => {
        gsap.set(root.current, { display: 'none' })
        setScrollLocked(false)
      },
    })
      .to(counter, {
        v: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
      .to('.preloader__bar span', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
      .to('.preloader__meta', { yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.in' })
      .to('.preloader__panel', {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
        stagger: 0.07,
        onStart: onDone,
      }, '-=0.15')
  }, { scope: root })

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <div key={i} className="preloader__panel" />)}
      <div className="preloader__meta">
        <span className="mono">{t.preloader}</span>
        <span className="preloader__count" ref={count}>000</span>
        <div className="preloader__bar"><span /></div>
      </div>
    </div>
  )
}
