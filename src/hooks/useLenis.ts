import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../gsap'

let instance: Lenis | null = null

export const scrollToTarget = (target: string | number) => {
  if (instance) instance.scrollTo(target, { offset: 0, duration: 1.4 })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

// Guarda a posição antes de remontar a página (troca de idioma) e volta para ela depois.
let savedScroll: number | null = null
export const rememberScroll = () => { savedScroll = window.scrollY }
export const restoreScroll = () => {
  if (savedScroll === null) return
  const y = savedScroll
  savedScroll = null
  // O ScrollTrigger rola até o topo para medir ao recriar os gatilhos; voltamos no quadro seguinte.
  requestAnimationFrame(() => {
    window.scrollTo({ top: y })
    instance?.scrollTo(y, { immediate: true, force: true })
    ScrollTrigger.refresh()
  })
}

export const setScrollLocked =(locked: boolean) => {
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
