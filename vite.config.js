import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA offline-first: precache l'app shell, funciona sense connexió i és instal·lable.
//
// base: a GitHub Pages l'app penja de /schwiiz/, no de l'arrel, i el service worker
// necessita rutes correctes per al navigateFallback. En desenvolupament, a l'arrel.
export default defineConfig(({ command }) => ({
  define: { __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')) },
  base: command === 'build' ? '/schwiiz/' : '/',
  plugins: [
    react(),
    VitePWA({
      // 'prompt' + registre manual a main.jsx: així podem comprovar si hi ha versió
      // nova cada cop que tornes a l'app, i avisar-te sense tallar-te una sessió.
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Schwiiz · Züridütsch',
        short_name: 'Schwiiz',
        description: 'Aprèn suís-alemany offline — flashcards, gramàtica i frases',
        theme_color: '#a8323b',
        background_color: '#f6f4f1',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'ca',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
        navigateFallback: 'index.html',
        // Que el service worker prengui el control ja des de la primera visita.
        // Sense això la primera càrrega queda sense controlador i el flux
        // d'actualització no s'acaba de tancar.
        clientsClaim: true
      }
    })
  ]
}))
