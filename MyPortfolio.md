---
title: MyPortfolio
aliases: [MNSBaanu Portfolio]
tags: [project, portfolio, react, vite]
status: active
version: 1.0.0
created: 2026-09-27
updated: 2026-09-27
repo: https://github.com/MNSBaanu/MyPortfolio
author: MNS Baanu
---

> [!summary]
> Single-page personal portfolio (React + Vite + Tailwind) deployed on Vercel, with a PWA service worker, EmailJS contact form, CV viewer/PDF export and a Gemini-backed chat assistant served from `api/chat.ts`.

## Quick links
- [[README]]
- Live: https://mnsbaanu-portfolio.vercel.app

## Tech stack
React 18, TypeScript, Tailwind CSS 3, Framer Motion, Vite 8, vite-plugin-pwa, EmailJS, html2pdf.js, react-helmet-async, react-hot-toast, Vercel serverless function (Gemini API).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run typecheck`: checks `src`, `vite.config.ts` and `api/` (via `tsconfig.api.json`)
- `npm run security-check`: runs `scripts/security-check.js`
- `npm run audit`: runs `npm audit && npm outdated`

## Folder structure
- `api/chat.ts`: Vercel function for the chat assistant
- `src/components/layout/`: Header, Footer, SocialSidebar, LoadingScreen, SEO
- `src/components/sections/`: page sections; `sections/projects/` holds the project panel, detail page and modals
- `src/components/overlays/`: CVViewer, ChatAssistant
- `src/data/portfolio.ts`: all portfolio content
- `src/context/ThemeContext.tsx`, `src/hooks/useDialog.ts`
- `src/registerSW.ts`: PWA registration
- `public/assets/brand/`: logo, favicon, PWA icons, profile photo, OG image
- `public/assets/projects/`: project screenshots (WebP, kebab-case)
- `scripts/security-check.js`

## How it works
`App.tsx` shows a loading screen, then renders stacked sticky sections that are lazy-loaded from `src/components`. Content comes from `src/data/portfolio.ts`. The chat assistant POSTs to `/api/chat`, which sends the portfolio data as context to Gemini and falls back to local keyword answers on failure.

## Environment
- Client: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- Server: `GEMINI_API_KEY`, optional `GEMINI_MODEL`

## Deployment
Vercel (`vercel.json`): SPA rewrite, long cache on `/assets`, and security headers including a CSP.

## Open issues
- [ ] 10 projects reference screenshots that do not exist (5-min-forecast, lak-seva, talk-with-emo, gather, restaurant, kapruka-asa, hush-lines, transit-lk, smart-med, echo-sphere); they show placehold.co fallbacks
- [ ] html2pdf chunk is about 936 KB (lazy-loaded, but still precached by the service worker)
- [ ] No ESLint setup

## Log
- 2026-09-27: Cleanup from the audit. Removed Jules notes, duplicate manifest, unused CSS, `@vercel/analytics`, unused certificate images and custom PWA types. Converted images to WebP in `brand/` and `projects/` (22 MB to 1.5 MB); the service worker no longer precaches every image. Added the missing OG image. Fixed a syntax error in `api/chat.ts` (the chat endpoint could not run), typed it, and added `typecheck`. Removed `'unsafe-eval'` and the analytics hosts from the CSP. Split `Projects.tsx` and grouped components into folders. Added `.env.example` and updated the README.
- 2026-09-27: Created the note. Audited the project for unused files, unused code and structure problems.
