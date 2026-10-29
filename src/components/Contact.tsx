import { useRef, useState } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../gsap'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToTarget } from '../hooks/useLenis'
import { profile } from '../data'
import { useLang, rich } from '../i18n'

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const mail = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)
  const { t } = useLang()
  const c = t.contact
  useMagnetic(mail, 0.2)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const split = SplitText.create('.contact__big', { type: 'chars', mask: 'chars' })
    gsap.from(split.chars, {
      yPercent: 100,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.025,
      scrollTrigger: { trigger: '.contact__big', start: 'top 85%' },
    })
    gsap.from('.contact__row > *', {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: '.contact__row', start: 'top 90%' },
    })
  }, { scope: root })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer className="contact" id="contato" ref={root}>
      <div className="container">
        <p className="eyebrow mono"><span>05</span> {c.eyebrow}</p>
        <h2 className="contact__big">{rich(c.title)}</h2>
        <div className="contact__row">
          <button className="contact__mail" ref={mail} onClick={copy} data-cursor={copied ? c.cursorCopied : c.cursorCopy}>
            <span>{profile.email}</span>
            <small className="mono">{copied ? c.copied : c.copy}</small>
          </button>
          <nav className="contact__links mono" aria-label={c.social}>
            <a href={`mailto:${profile.email}`}>{c.email} ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </div>
        <div className="contact__foot mono">
          <span>© {new Date().getFullYear()} João Victor Guimarães</span>
          <span>{c.made}</span>
          <button onClick={() => scrollToTarget(0)}>{c.top}</button>
        </div>
      </div>
      <div className="toast mono" role="status" aria-live="polite" data-show={copied}>
        {copied ? c.toast : ''}
      </div>
    </footer>
  )
}
