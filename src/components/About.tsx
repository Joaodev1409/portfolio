import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../gsap'
import { useLang } from '../i18n'

export default function About() {
  const root = useRef<HTMLElement>(null)
  const { t } = useLang()
  const stats = t.stats

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
          onUpdate: () => { num.textContent = Math.round(obj.v).toLocaleString(t.locale) },
        }, '<0.1')
        .from(el.querySelector('.stat__line'), { scaleX: 0, duration: 1.4, ease: 'expo.out' }, '<')
    })
  }, { scope: root })

  return (
    <section className="section about container" id="sobre" ref={root}>
      <p className="eyebrow mono"><span>01</span> {t.about.eyebrow}</p>
      <p className="about__statement">{t.about.statement}</p>
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">
              <span>{s.prefix}</span><span className="stat__num">{s.value.toLocaleString(t.locale)}</span><span>{s.suffix}</span>
            </div>
            <i className="stat__line" />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
