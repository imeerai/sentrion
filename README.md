# Sentrion — website

The marketing + docs site for [Sentrion](https://github.com/imeerai/sentrion),
built to match the design 1:1.

**Stack:** Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 3 ·
zero runtime third-party scripts. Only one small client component (the install
command's copy button); everything else is static server-rendered HTML.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # outputs a fully static site to ./out
```

Deploy `./out` to any static host (Netlify, Cloudflare Pages, Vercel, GitHub
Pages). Security headers ship with it: `public/_headers` (Netlify/Cloudflare)
and `vercel.json` (Vercel).

## Pages & components

- `app/page.jsx` — Home · `app/docs` · `app/rules` · `app/faq`
- Reused components: `SiteNav`, `Masthead`, `Footer`, `CopyCmd`
- `app/sitemap.js`, `app/robots.js` — SEO

## Security

- Strict CSP (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`,
  `base-uri 'self'`) plus HSTS, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Permissions-Policy`.
- No inline event handlers, no `dangerouslySetInnerHTML`, all external links are
  `rel="noopener noreferrer"`, no secrets in the bundle, `0` dependency vulnerabilities.
- `script-src` allows `'unsafe-inline'` only for Next.js's hydration bootstrap
  (a static-export requirement). The site takes no user input, so the XSS surface
  is effectively nil; tighten to per-build hashes if your host supports it.

Built by Imeer.ai · imeerai · MIT.
