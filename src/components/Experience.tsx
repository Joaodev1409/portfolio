import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap'
import { experience } from '../data'

export default function Experience() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    // A linha da trajetória se desenha com a rolagem; cada marco acende quando a linha chega nele.
    gsap.fromTo('.timeline__fill', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: true },
    })
    gsap.utils.toArray<HTMLElement>('.timeline__item').forEach((item) => {
      gsap.from(item.querySelectorAll('.timeline__period, h3, .timeline__org, p'), {
        y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: item, start: 'top 80%' },
      })
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        onEnter: () => item.classList.add('is-lit'),
        onLeaveBack: () => item.classList.remove('is-lit'),
      })
    })
  }, { scope: root })

  return (
    <section className="section container" id="trajetoria" ref={root}>
      <div className="section__head">
        <p className="eyebrow mono"><span>04</span> Trajetória</p>
        <h2 className="title">Onde eu <em>aprendi fazendo</em></h2>
      </div>
      <div className="timeline">
        <span className="timeline__rail" aria-hidden="true"><i className="timeline__fill" /></span>
        <ol>
          {experience.map((e) => (
            <li className="timeline__item" key={e.role}>
              <span className="timeline__period mono">{e.period}</span>
              <div>
                <h3>{e.role}</h3>
                <span className="timeline__org">{e.org}</span>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
