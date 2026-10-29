import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../gsap'

let instance: Lenis | null = null

export const scrollToTarget = (target: string | number) => {
  if (instance) instance.scrollTo(target, { offset: 0, duration: 1.4 })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

export const setScrollLocked = (locked: boolean) => {
  if (locked) instance?.stop()
  else instance?.start()
  document.documentElement.classList.toggle('is-locked', locked)
}

// Rolagem suave sincronizada com o relógio do GSAP, para o ScrollTrigger ler a mesma posição.
export function useLenis() {
  useEffect(() => {
    // As fontes mudam a altura das seções: recalcula os gatilhos quando elas chegam.
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
