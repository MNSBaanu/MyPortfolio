import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

function asyncCss(): Plugin {
  return {
    name: 'async-css',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
          '<link rel="preload" href="$1" as="style" crossorigin onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
        )
      },
    },
  }
}

function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html

        const fontPreloads = Object.keys(ctx.bundle)
          .filter((file) => file.endsWith('.woff2') && file.includes('inter-latin-wght'))
          .slice(0, 1)
          .map(
            (file) =>
              `<link rel="preload" href="/assets/${file.split('/').pop()}" as="font" type="font/woff2" crossorigin>`
          )

        if (fontPreloads.length === 0) return html
        return html.replace('</head>', `    ${fontPreloads.join('\n    ')}\n  </head>`)
      },
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    asyncCss(),
    preloadFonts(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/**/*', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'MNSBaanu Portfolio',
        short_name: 'MNSBaanu',
        description: 'Full Stack Developer Portfolio - MNSBaanu',
        theme_color: '#080808',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/assets/Logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/Logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.flaticon\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'icon-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2022',
    supported: {
      destructuring: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
        },
      },
    },
  },
})
