# Portfolio — CLAUDE.md

## Project Overview
Khitab Anand's personal portfolio. React 19 + TypeScript + Vite, deployed to GitHub Pages.

## Commands
```bash
# Use the full node path to bypass broken asdf shims
NODE=/usr/local/Cellar/node/23.11.0/bin/node
NPM=/usr/local/Cellar/node/23.11.0/bin/npm

env -i PATH=/usr/local/Cellar/node/23.11.0/bin:/usr/bin:/bin HOME=/Users/khitabanand $NPM run dev
env -i PATH=/usr/local/Cellar/node/23.11.0/bin:/usr/bin:/bin HOME=/Users/khitabanand $NPM run build
env -i PATH=/usr/local/Cellar/node/23.11.0/bin:/usr/bin:/bin HOME=/Users/khitabanand $NPM run deploy
```

## Architecture
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/styles/globals.css`, no `tailwind.config.js`)
- **Animations:** Framer Motion for scroll reveals / stagger; GSAP for magnetic button hover
- **Particles:** tsParticles v3 — init via `initParticlesEngine()` in a `useEffect`, not via an `init` prop
- **Smooth scroll:** Lenis, initialized in `App.tsx` via `useLenis()` hook
- **3D card tilt:** `vanilla-tilt` (not `react-tilt` — peer dep conflict with React 19), dynamically imported in `useEffect`
- **Custom cursor:** Two-div (dot + ring) approach using `requestAnimationFrame`, hidden on touch devices

## Key Conventions
- All section components wrapped in `<SectionWrapper id="section-id">` for scroll-reveal and anchor linking
- No React Router — anchor-link SPA navigation only (avoids GitHub Pages SPA routing issues)
- Reduced motion: all animations gated by `useReducedMotion()` hook
- Data lives in `src/data/` as typed TS arrays; update content there only
- `font-heading` Tailwind utility → Space Grotesk; `font-body` → Inter
- `glass` CSS class → glassmorphism card base; `gradient-text` → purple gradient text

## Content Updates
To update portfolio content, edit only these files:
- `src/data/projects.ts` — projects list
- `src/data/experience.ts` — work history
- `src/data/skills.ts` — skill categories
- `src/data/certifications.ts` — certifications

## Deployment
GitHub Pages user page repo (`Khitab90.github.io`). `vite.config.ts` uses `base: '/'`.
```bash
npm run deploy   # builds + pushes dist/ to gh-pages branch
```

## Known Issues / Notes
- asdf version manager is broken (`/usr/local/Cellar/asdf/0.9.0` missing). Always invoke node/npm via full cellar path.
- Resume link points to Google Drive: `https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing`
