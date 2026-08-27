import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA offline-first: precache l'app shell, funciona sense connexió i és instal·lable.
//
// base: a GitHub Pages l'app penja de /schwiiz/, no de l'arrel. El service worker
// necessita rutes absolutes correctes per al navigateFallback, així que en build
// s'hi posa la subcarpeta. En desenvolupament es queda a l'arrel.
// Si algun dia la mous a un domini propi o a l'arrel, canvia-ho aquí.
export default defineConfig(({ command }) => ({
  define: { __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')) },
  base: command === 'build' ? '/schwiiz/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
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
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
        navigateFallback: 'index.html'
      }
    })
  ]
}))
