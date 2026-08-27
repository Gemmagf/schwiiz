import React from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import './styles.css'

// Avís de versió nova.
// No recarreguem sols: si estiguessis a mitja tanda de repàs, et tallaríem.
function avisaDeVersioNova(aplica) {
  if (document.querySelector('.update-banner')) return
  const barra = document.createElement('div')
  barra.className = 'update-banner'
  const text = document.createElement('span')
  text.textContent = 'Hi ha una versió nova de l’app'
  const boto = document.createElement('button')
  boto.textContent = 'Actualitzar'
  boto.onclick = () => {
    boto.disabled = true
    boto.textContent = 'Actualitzant…'
    Promise.resolve(aplica(true)).catch(() => {})
    // aplica() recarrega quan el worker nou pren el control, però si la pestanya
    // encara no en tenia cap, aquell avís no arriba. Recarreguem nosaltres.
    setTimeout(() => location.reload(), 1500)
  }
  barra.append(text, boto)
  document.body.appendChild(barra)
}

const actualitza = registerSW({
  onNeedRefresh() { avisaDeVersioNova(actualitza) },
  onRegisteredSW(url, reg) {
    if (!reg) return
    // El registre de sèrie només mira si hi ha versió nova en carregar la pàgina.
    // A iOS, una PWA suspesa no torna a carregar mai, i et pots quedar setmanes
    // enrere. Ho comprovem també cada cop que tornes a l'app, i un cop per hora.
    const comprova = () => { if (!document.hidden) reg.update().catch(() => {}) }
    document.addEventListener('visibilitychange', comprova)
    window.addEventListener('focus', comprova)
    setInterval(comprova, 60 * 60 * 1000)
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
