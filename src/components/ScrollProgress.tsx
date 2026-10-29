import { useRef } from 'react'
import { gsap, useGSAP } from '../gsap'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
  })
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
