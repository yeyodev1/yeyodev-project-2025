# AGENTS.md — personal-portfolio (yeyo.dev)

## Stack

Vue 3 + TypeScript + Vite · Pinia · vue-router (SPA) · vue-i18n (es/es) · Tailwind CSS v4 + SCSS · Prettier · Deployed on **Netlify**

## Commands (pnpm)

| Command | What |
|---|---|
| `pnpm dev` | Dev server (Vite) |
| `pnpm type-check` | `vue-tsc --build` — run this before committing |
| `pnpm build` | `run-p type-check "build-only"` — must pass both |
| `pnpm format` | `prettier --write src/` |
| `pnpm preview` | Vite preview of production build |

## Architecture

- **`@/`** → `./src/` (Vite alias)
- **main entry**: `src/main.ts` — bootstraps Vue app with Pinia, router, i18n
- **Router** (3 routes): `/` (home), `/blog`, `/blog/:slug` — all lazy-loaded
- **i18n**: All translations live in `src/i18n/index.ts` (es + en inline, no separate locale files). Language persisted in `localStorage` key `lang`
- **SCSS**: Variables/mixins from `src/styles/index.scss` are auto-injected into every component via `vite.config.ts` `additionalData` — no `@use` needed in components. The file must only contain variables/forward/mixins — no CSS rules
- **Global styles**: `src/styles/global.scss` imports Tailwind + SCSS variables
- **Blog**: Mock data in `useBlog` composable — not yet connected to a real API
- **GitHub section**: Client-side fetches from public GitHub API (`VITE_GITHUB_TOKEN` env var optional for higher rate limit). Module-level singleton cache pattern in `useGithub`
- **No tests**, no CI/CD, no lint config beyond Prettier

## Conventions

- **Vue**: `<script setup lang="ts">` + Composition API
- **SCSS**: BEM-like naming (`.block__element--modifier`), scoped `<style lang="scss">` per component
- **Format**: No semicolons, single quotes, 100 char print width (`.prettierrc.json`)

## Netlify

SPA fallback via `public/_redirects` (`/* /index.html 200`). The `public/` dir is Vite's public dir — any file there is served as-is.

## Env

- `VITE_GITHUB_TOKEN` — optional, bump unauthenticated 60 req/hr to 5,000 req/hr
- `VITE_CONTACT_WEBHOOK` — LeadConnectorHQ webhook for lead registration (POST JSON)
- `VITE_QUALIFICATION_WEBHOOK` — LeadConnectorHQ webhook for lead qualification data (POST JSON with notes + tags). Copy `.env.example` → `.env.local`.
