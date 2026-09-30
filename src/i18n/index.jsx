import { createContext, useContext } from 'react'
import { tr } from './ui.js'

export const LangContext = createContext('ca')

// t('clau', { vars }) dins de qualsevol component.
export function useT() {
  const lang = useContext(LangContext)
  const t = (clau, vars) => tr(clau, lang, vars)
  t.lang = lang
  // Tria el camp traduït d'una entrada de contingut: nat(v) → v.ca o v.en
  t.nat = (obj, camp = 'ca') => (lang === 'en' ? obj?.[camp + '_en'] ?? obj?.en ?? obj?.[camp] : obj?.[camp])
  return t
}

export { idiomaPerDefecte } from './ui.js'
