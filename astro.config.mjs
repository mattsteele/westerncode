// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss'
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