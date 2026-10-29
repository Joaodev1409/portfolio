import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
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

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Experience />
      </main>
      <Contact />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
