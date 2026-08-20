// Pronunciació amb la veu del dispositiu (Web Speech API).
//
// ⚠️ Realitat: NO existeix cap veu de suís-alemany als mòbils. El que fem és
//    fer-ho llegir per una veu alemanya (de-CH si n'hi ha, si no de-DE) una mica
//    més lenta. Sona a alemany estàndard llegint text dialectal — serveix per
//    fixar paraules, però la pronúncia bona te la dona la classe, no això.

let cache = null

export function voices() {
  if (cache && cache.length) return cache
  const all = window.speechSynthesis?.getVoices?.() || []
  cache = all.filter((v) => v.lang?.toLowerCase().startsWith('de'))
  return cache
}

// Espera que el navegador carregui la llista (a iOS arriba tard).
export function onVoicesReady(cb) {
  if (!window.speechSynthesis) return () => {}
  const fire = () => { cache = null; cb(voices()) }
  if (window.speechSynthesis.getVoices().length) fire()
  window.speechSynthesis.addEventListener('voiceschanged', fire)
  return () => window.speechSynthesis.removeEventListener('voiceschanged', fire)
}

export function bestVoice(preferredURI) {
  const list = voices()
  if (!list.length) return null
  if (preferredURI) {
    const found = list.find((v) => v.voiceURI === preferredURI)
    if (found) return found
  }
  return list.find((v) => v.lang.toLowerCase() === 'de-ch') || list[0]
}

export function speak(text, { rate = 0.85, voiceURI } = {}) {
  if (!window.speechSynthesis || !text) return false
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const v = bestVoice(voiceURI)
  if (v) { u.voice = v; u.lang = v.lang }
  else u.lang = 'de-CH'
  u.rate = rate
  window.speechSynthesis.speak(u)
  return true
}

export const ttsAvailable = () => Boolean(window.speechSynthesis)
