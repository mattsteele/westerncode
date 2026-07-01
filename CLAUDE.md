# Western Code — Project Steering

## Stack

- **Astro** (always latest stable) — static site generator
- **Tailwind CSS v4** (always latest stable) — via `@tailwindcss/vite` Vite plugin
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **Cloudflare Pages** — static deployment, no SSR adapter needed

## Commands

```sh
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview production build locally
npm run check      # Astro + TypeScript type checking
```

## Package Management

- All packages belong in `devDependencies` — this is a static site with no runtime dependencies
- Always use the latest stable versions of all packages
- Use `@tailwindcss/vite` (NOT `@tailwindcss/postcss`) — it is the recommended Tailwind v4 approach for Vite-based frameworks
- When `@tailwindcss/vite` and Astro resolve to different Vite majors, add `"overrides": { "vite": "^X" }` to align them. Check with `npm ls vite` after installing
- `allowScripts` in `package.json` is required for `esbuild`, `fsevents`, and `sharp`

## File Structure

```
src/
  assets/
    images/       # source images (processed by Astro image pipeline)
    styles/       # globals.css (Tailwind entry point)
    svgs/         # SVG files imported as Astro components
  components/     # reusable Astro components
  layouts/        # Layout.astro (wraps all pages)
  pages/          # index.astro, 404.astro
  utils/          # theme.ts and other utilities
public/
  _headers        # Cloudflare Pages response headers (CSP, cache, security)
  _redirects      # Cloudflare Pages redirects (www → non-www)
  robots.txt
  favicon/
```

## Astro Configuration

- `output: 'static'` — fully static build
- `compressHTML: true` — minifies HTML output
- `build.inlineStylesheets: 'auto'` — inlines small stylesheets
- `vite.build.cssMinify: 'lightningcss'` — minifies CSS with LightningCSS
- `image.remotePatterns` — only https remote images allowed
- Sitemap auto-generated via `@astrojs/sitemap`

## Tailwind CSS v4

- Entry point: `src/assets/styles/globals.css`
- Use `@import "tailwindcss"` (v4 syntax — no config file needed)
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — class-based, toggled via ThemeToggle component
- Custom utilities use `@utility` directive

## Cloudflare Pages

- `public/_redirects` — handles www → non-www (301)
- `public/_headers` — security headers and cache rules applied to all routes
- HTML pages served with `Cache-Control: no-cache` so deployments propagate immediately
- Versioned assets (`/_astro/*`) served with `Cache-Control: public, max-age=31536000, immutable`
- Cloudflare Web Analytics loads from `static.cloudflareinsights.com` — this is allowed in the CSP

## Content Security Policy

The CSP in `public/_headers` uses SHA-256 hashes for inline scripts instead of `'unsafe-inline'`.

There are two inline scripts in the built HTML:

1. **Theme detection** (`is:inline` in `Layout.astro`) — hash is stable; only changes if that script block is edited
2. **Bundled module script** (ThemeToggle + theme utility, inlined by Vite) — hash changes whenever `ThemeToggle.astro` or `theme.ts` is modified

After modifying either of those files, regenerate the hashes:

```sh
npm run build
node -e "
const fs = require('fs'), crypto = require('crypto');
const html = fs.readFileSync('dist/index.html', 'utf8');
[...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].forEach(m => {
  const attrs = m[1].trim();
  if (attrs.includes('src=') || attrs.includes('application/ld+json')) return;
  const hash = crypto.createHash('sha256').update(m[2], 'utf8').digest('base64');
  console.log(attrs || '(inline)', '=>', 'sha256-' + hash);
});
"
```

Then update the `script-src` directive in `public/_headers` with the new hashes.
