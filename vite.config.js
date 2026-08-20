import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA offline-first: precache l'app shell, funciona sense connexió i és instal·lable.
// base './' perquè funcioni també servida des d'una subcarpeta (GitHub Pages).
export default defineConfig({
  base: './',
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
})
