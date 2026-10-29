import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap'
import { scrollToTarget, setScrollLocked } from '../hooks/useLenis'
import { profile } from '../data'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#stack', label: 'Stack' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#contato', label: 'Contato' },
]

type Theme = 'dark' | 'light'

const currentTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme) ??
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

export default function Nav() {
  const header = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Some ao rolar para baixo, volta ao rolar para cima.
  useGSAP(() => {
    const show = gsap.quickTo(header.current, 'yPercent', { duration: 0.4, ease: 'power3' })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        header.current?.classList.toggle('is-scrolled', self.scroll() > 40)
        show(self.direction === 1 && self.scroll() > 400 ? -110 : 0)
      },
    })
    links.forEach(({ href }) => {
      ScrollTrigger.create({
        trigger: href,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => setActive((a) => (self.isActive ? href : a === href ? '' : a)),
      })
    })
  })

  useGSAP(() => {
    if (!menu.current) return
    if (open) {
      gsap.timeline()
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .fromTo('.menu__link', { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 0.7, ease: 'expo.out' }, '-=0.35')
    } else {
      gsap.to(menu.current, { clipPath: 'circle(0% at 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => { gsap.set(menu.current, { visibility: 'hidden' }) } })
    }
  }, { dependencies: [open], scope: menu })

  useEffect(() => {
    setScrollLocked(open)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const go = (e: MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToTarget(href), open ? 350 : 0)
  }

  // Troca de tema com um círculo que se expande a partir do botão (View Transitions API).
  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      setTheme(next)
      try { localStorage.setItem('theme', next) } catch { /* sem armazenamento */ }
    }
    if (!document.startViewTransition || prefersReducedMotion()) return apply()
    const { clientX: x, clientY: y } = e
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <>
      <header className={`nav${open ? ' is-menu-open' : ''}`} ref={header}>
        <a href="#topo" className="nav__logo" onClick={(e) => go(e, '#topo')} aria-label="Voltar ao topo">
          jv<span>.</span>
        </a>
        <nav className="nav__links" aria-label="Seções">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className={active === l.href ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}>
            <span className={`theme-toggle__icon is-${theme}`} />
          </button>
          <button className={`burger${open ? ' is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </header>

      <div className="menu" id="menu" ref={menu} aria-hidden={!open}>
        <nav>
          {links.map((l, i) => (
            <div className="menu__row" key={l.href}>
              <a className="menu__link" href={l.href} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
                <small className="mono">0{i + 1}</small>{l.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="menu__foot mono">
          <a href={profile.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>LinkedIn ↗</a>
        </div>
      </div>
    </>
  )
}
