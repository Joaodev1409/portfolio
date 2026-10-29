import { useRef, type PointerEvent } from 'react'
import { gsap, useGSAP, finePointer, prefersReducedMotion } from '../gsap'
import { stack, type StackGroup } from '../data'

// Marcas pretas ou quase pretas (Flask, Vercel, GitHub...) somem no fundo escuro: ficam com a cor do texto.
const isVisibleBrand = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.18
}

function StackCard({ group, index }: { group: StackGroup; index: number }) {
  const card = useRef<HTMLElement>(null)

  // Luz que segue o cursor (variáveis CSS) e uma inclinação 3D leve.
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = card.current
    if (!el || !finePointer() || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    gsap.to(el, { rotateY: (px - 0.5) * 8, rotateX: (0.5 - py) * 8, duration: 0.5, ease: 'power3.out' })
  }
  const leave = () => gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })

  return (
    <article className={`stack-card stack-card--${group.id}`} ref={card} onPointerMove={move} onPointerLeave={leave}>
      <header>
        <span className="mono">{String(index + 1).padStart(2, '0')}</span>
        <h3>{group.title}</h3>
      </header>
      <p>{group.blurb}</p>
      <ul>
        {group.items.map((item) => (
          <li key={item.name} style={item.icon && isVisibleBrand(item.icon.hex) ? { ['--brand' as string]: `#${item.icon.hex}` } : undefined}>
            {item.icon && (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon.path} /></svg>
            )}
            {item.name}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Stack() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.from('.stack-card', {
      y: 80,
      opacity: 0,
      clipPath: 'inset(20% 0% 0% 0% round 24px)',
      duration: 1.2,
      ease: 'expo.out',
      stagger: { each: 0.08, from: 'start' },
      scrollTrigger: { trigger: '.stack-grid', start: 'top 80%' },
    })
    gsap.from('.stack-card li', {
      scale: 0.6,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      stagger: 0.02,
      scrollTrigger: { trigger: '.stack-grid', start: 'top 65%' },
    })
  }, { scope: root })

  return (
    <section className="section container" id="stack" ref={root}>
      <div className="section__head">
        <p className="eyebrow mono"><span>02</span> Stack</p>
        <h2 className="title">Ferramentas que eu <em>coloco em produção</em></h2>
      </div>
      <div className="stack-grid">
        {stack.map((g, i) => <StackCard group={g} index={i} key={g.id} />)}
      </div>
    </section>
  )
}
