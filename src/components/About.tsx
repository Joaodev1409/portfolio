import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../gsap'
import { stats } from '../data'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    // Cada palavra acende conforme a leitura avança com a rolagem.
    const split = SplitText.create('.about__statement', { type: 'words' })
    gsap.fromTo(split.words, { opacity: 0.14 }, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
    })

    gsap.utils.toArray<HTMLElement>('.stat').forEach((el, i) => {
      const num = el.querySelector<HTMLElement>('.stat__num')!
      const target = stats[i].value
      const obj = { v: 0 }
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        .from(el, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', delay: i * 0.1 })
        .to(obj, {
          v: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => { num.textContent = Math.round(obj.v).toLocaleString('pt-BR') },
        }, '<0.1')
        .from(el.querySelector('.stat__line'), { scaleX: 0, duration: 1.4, ease: 'expo.out' }, '<')
    })
  }, { scope: root })

  return (
    <section className="section about container" id="sobre" ref={root}>
      <p className="eyebrow mono"><span>01</span> Sobre</p>
      <p className="about__statement">
        Estudo Ciência da Computação na UEPB e gosto do código que resolve um problema de verdade.
        Já tirei uma secretaria inteira da fila com matrícula online, cortei 73% da latência de um back-end
        com paralelismo e SQL bem escrito, e hoje ensino padrões de projeto como monitor.
        Uso IA no desenvolvimento, sem deixar de entender cada linha que vai para produção.
      </p>
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">
              <span>{s.prefix}</span><span className="stat__num">{s.value.toLocaleString('pt-BR')}</span><span>{s.suffix}</span>
            </div>
            <i className="stat__line" />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
