import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'favicon.svg'],
      manifest: {
        name: 'Pouilles 2026',
        short_name: 'Pouilles',
        description: 'Suivi des dépenses et carnet de route du voyage dans les Pouilles',
        lang: 'fr',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#faf7f2',
        theme_color: '#c2410c',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Tout est statique : on précharge l'intégralité du bundle pour un
        // fonctionnement 100 % hors-ligne dès la première visite.
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,woff2}'],
        // Doublon lourd de la carte (982 ko) et visuel non utilisé : inutile de
        // les embarquer dans le cache hors-ligne.
        globIgnores: ['**/carte-toursitique-pouilles.png', '**/italie.png'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
