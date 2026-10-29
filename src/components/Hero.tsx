import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../gsap'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToTarget } from '../hooks/useLenis'
import DotField from './DotField'
import { profile } from '../data'

function Clock() {
  const fmt = () => new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Fortaleza' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000)
    return () => clearInterval(id)
  }, [])
  return <time>{time}</time>
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const cv = useRef<HTMLAnchorElement>(null)
  useMagnetic(cta)
  useMagnetic(cv)

  useGSAP(() => {
    if (!ready) return
    if (prefersReducedMotion()) {
      gsap.set('.hero [data-reveal]', { autoAlpha: 1 })
      return
    }
    const split = SplitText.create('.hero__name-line', { type: 'chars', mask: 'chars' })
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.set('.hero [data-reveal]', { autoAlpha: 1 })
      .from(split.chars, { yPercent: 110, rotate: 6, duration: 1.3, stagger: 0.03 })
      .from('.hero__tag', { yPercent: 100, opacity: 0, duration: 1, stagger: 0.08 }, 0.3)
      .from('.hero__lede', { y: 30, opacity: 0, duration: 1.1 }, 0.6)
      .from('.hero__ctas > *', { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.75)
      .from('.hero__scroll', { opacity: 0, duration: 1 }, 1)
      .from('.dotfield', { opacity: 0, duration: 2, ease: 'power2.out' }, 0)

    // Ao rolar, o bloco do nome sobe mais devagar e some: um parallax leve.
    gsap.to('.hero__inner', {
      yPercent: -18,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, { dependencies: [ready], scope: root })

  return (
    <section className="hero" id="topo" ref={root}>
      <DotField />
      <div className="hero__inner container">
        <div className="hero__meta mono" data-reveal>
          <span className="hero__tag"><i className="pulse" /> Aberto a estágio em back-end e dados</span>
          <span className="hero__tag">{profile.city} · <Clock /></span>
        </div>

        <h1 className="hero__name" data-reveal aria-label={`${profile.name} ${profile.surname}`}>
          <span className="hero__name-line">{profile.name}</span>
          <span className="hero__name-line hero__name-line--serif">{profile.surname}</span>
        </h1>

        <div className="hero__bottom" data-reveal>
          <p className="hero__lede">
            Desenvolvo <em>back-ends</em>, pipelines de <em>dados</em> e as interfaces em cima deles.
            Java, Spring Boot, Python e SQL no dia a dia, React quando o usuário precisa ver o resultado.
          </p>
          <div className="hero__ctas">
            <a href="#projetos" className="btn btn--solid" ref={cta} data-cursor="Ir" onClick={(e) => { e.preventDefault(); scrollToTarget('#projetos') }}>
              Ver projetos <span aria-hidden="true">↓</span>
            </a>
            <a href="/curriculo-joao-victor.pdf" className="btn btn--ghost" ref={cv} target="_blank" rel="noreferrer" data-cursor="PDF">
              Currículo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll mono" aria-hidden="true">
        <span>role</span><i />
      </div>
    </section>
  )
}
