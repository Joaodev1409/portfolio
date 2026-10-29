import { useLayoutEffect, useState } from 'react'
import { useLenis, restoreScroll } from './hooks/useLenis'
import { LangProvider, useLang } from './i18n'
import { ScrollTrigger } from './gsap'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'

function Site() {
  const [ready, setReady] = useState(false)
  const { lang } = useLang()
  useLenis()

  // As seções remontam ao trocar o idioma (key={lang}), porque o SplitText reescreve o DOM do texto.
  // Depois de remontar, recalcula os gatilhos e volta para onde a pessoa estava.
  useLayoutEffect(() => {
    ScrollTrigger.refresh()
    restoreScroll()
  }, [lang])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main key={`main-${lang}`}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Experience />
      </main>
      <Contact key={`contact-${lang}`} />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
