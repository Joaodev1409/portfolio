import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../gsap'
import { profile, type Project } from '../data'
import { useLang, rich } from '../i18n'

function CodeWindow({ lines }: { lines: readonly string[] }) {
  return (
    <div className="code" aria-hidden="true">
      <div className="code__bar"><i /><i /><i /></div>
      <pre>
        {lines.map((l, i) => (
          <span className="code__line" key={i}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <span className="code__text">{l}</span>
          </span>
        ))}
      </pre>
    </div>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const { t } = useLang()
  return (
    <article className="project">
      <div className="project__top">
        <span className="project__index">{p.index}</span>
        <span className="mono">{p.context}</span>
      </div>
      <h3 className="project__title">{p.title}</h3>
      {p.metric && <p className="project__metric">{p.metric}</p>}
      <CodeWindow lines={p.code} />
      <p className="project__summary">{p.summary}</p>
      <ul className="project__tags mono">
        {p.tags.map((t) => <li key={t}>{t}</li>)}
      </ul>
      {p.link && (
        <a className="project__link" href={p.link.href} target="_blank" rel="noreferrer" data-cursor={t.projects.open}>
          {p.link.label} <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  )
}

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()

    // Telas largas: a seção fica presa e os cards correm na horizontal com a rolagem.
    mm.add('(min-width: 900px)', () => {
      const el = track.current!
      const distance = () => el.scrollWidth - window.innerWidth
      const scroll = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects__pin',
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true, // o Lenis já suaviza a rolagem
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.projects__progress i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.projects__pin', start: 'top top', end: () => `+=${distance()}`, scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.project').forEach((card) => {
        gsap.from(card.querySelectorAll('.code__line'), {
          opacity: 0, x: -12, stagger: 0.08, duration: 0.5,
          scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left 85%' },
        })
        gsap.fromTo(card, { rotate: 2, y: 30 }, {
          rotate: -1, y: -10, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })

    // Telas estreitas: cards empilhados que entram um a um.
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray<HTMLElement>('.project').forEach((card) => {
        gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%' } })
          .from(card, { y: 60, opacity: 0, duration: 1, ease: 'expo.out' })
          .from(card.querySelectorAll('.code__line'), { opacity: 0, x: -12, stagger: 0.08, duration: 0.5 }, '-=0.6')
      })
    })
  }, { scope: root })

  return (
    <section className="projects" id="projetos" ref={root}>
      <div className="projects__pin">
        <div className="projects__head container">
          <p className="eyebrow mono"><span>03</span> {t.projects.eyebrow}</p>
          <h2 className="title">{rich(t.projects.title)}</h2>
          <div className="projects__progress" aria-hidden="true"><i /></div>
        </div>
        <div className="projects__track" ref={track}>
          {t.projectList.map((p) => <ProjectCard p={p} key={p.id} />)}
          <a className="project project--more" href={profile.github} target="_blank" rel="noreferrer" data-cursor="GitHub">
            <span className="mono">{t.projects.more}</span>
            <strong>{t.projects.moreTitle} <span aria-hidden="true">↗</span></strong>
          </a>
        </div>
      </div>
    </section>
  )
}
