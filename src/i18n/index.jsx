import { createContext, useContext } from 'react'
import { tr } from './ui.js'
import { EN, GRAM_EN } from './en.js'

export const LangContext = createContext('ca')

// t('clau', { vars }) dins de qualsevol component.
export function useT() {
  const lang = useContext(LangContext)
  const t = (clau, vars) => tr(clau, lang, vars)
  t.lang = lang
  // Camp traduït d'una entrada de contingut. Si no hi ha anglès, torna el català:
  // val més una paraula en català que un buit.
  // prefix: alguns identificadors es repeteixen entre col·leccions (p. ex. el tema
  // «salutacions» i l'etiqueta de frases «salutacions»), i cal poder-los distingir.
  t.nat = (obj, camp = 'ca', prefix = '') => {
    if (!obj) return undefined
    if (lang !== 'en') return obj[camp]
    return EN[prefix + obj.id] ?? EN[obj.id] ?? obj[camp + '_en'] ?? obj[camp]
  }
  // Camp traduït d'un tema de gramàtica: t.gram(g, 'summary')
  t.gram = (g, camp) => (lang === 'en' ? GRAM_EN[g.id]?.[camp] ?? g[camp] : g[camp])
  // Camp traduït d'un exercici: t.ex(g, ex, 'q')
  t.ex = (g, ex, camp) => (lang === 'en' ? GRAM_EN[g.id]?.ex?.[ex.id]?.[camp] ?? ex[camp] : ex[camp])
  return t
}

export { idiomaPerDefecte } from './ui.js'
