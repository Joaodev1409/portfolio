import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../gsap'

type Dot = { x: number; y: number; ox: number; oy: number; vx: number; vy: number }

// Grade de pontos em canvas: o cursor (ou o dedo) empurra os pontos, que voltam com uma mola.
export default function DotField() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current!
    const ctx = el.getContext('2d')!
    const still = prefersReducedMotion()
    let dots: Dot[] = []
    let w = 0, h = 0, raf = 0, visible = true, t = 0
    const mouse = { x: -9999, y: -9999 }
    let color = '', accent = ''

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      color = s.getPropertyValue('--dot').trim()
      accent = s.getPropertyValue('--accent').trim()
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = el.clientWidth
      h = el.clientHeight
      el.width = w * dpr
      el.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = w < 640 ? 22 : 30
      dots = []
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
    }

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, w, h)
      const radius = w < 640 ? 90 : 150
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < radius && !still) {
          const f = (1 - dist / radius) * 2.4
          d.vx += (dx / (dist || 1)) * f
          d.vy += (dy / (dist || 1)) * f
        }
        const wave = still ? 0 : Math.sin(d.ox * 0.012 + t) * Math.cos(d.oy * 0.012 + t * 0.8) * 3
        d.vx += (d.ox - d.x) * 0.06
        d.vy += (d.oy + wave - d.y) * 0.06
        d.vx *= 0.82
        d.vy *= 0.82
        d.x += d.vx
        d.y += d.vy
        const energy = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy) / 14, 1)
        ctx.fillStyle = energy > 0.15 ? accent : color
        ctx.globalAlpha = 0.35 + energy * 0.65
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.1 + energy * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (visible && !still) raf = requestAnimationFrame(draw)
    }

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const out = () => { mouse.x = mouse.y = -9999 }

    readColors()
    resize()
    draw()

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) draw()
    })
    io.observe(el)
    const mo = new MutationObserver(() => { readColors(); if (still) draw() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const ro = new ResizeObserver(() => { resize(); if (still) draw() })
    ro.observe(el)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', out)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect(); mo.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', out)
    }
  }, [])

  return <canvas className="dotfield" ref={canvas} aria-hidden="true" />
}
