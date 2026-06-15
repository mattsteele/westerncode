// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  output: 'static',
  vite: {
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
