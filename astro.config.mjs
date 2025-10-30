// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro/transitions']
          }
        }
      }
    }
  },
  compressHTML: true,
  site: 'https://westerncode.com',
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    remotePatterns: [{ protocol: "https" }]
  }
});