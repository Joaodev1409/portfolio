import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './data'

type LangState = { lang: Lang; t: Content; setLang: (lang: Lang) => void }

const LangContext = createContext<LangState | null>(null)

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* sem armazenamento */ }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = t.locale
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [t])

  const setLang = (next: Lang) => {
    setLangState(next)
    try { localStorage.setItem('lang', next) } catch { /* sem armazenamento */ }
  }

  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang fora do LangProvider')
  return ctx
}

// Converte *trecho* em <em>trecho</em>.
export function rich(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}
