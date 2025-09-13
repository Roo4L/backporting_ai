# Backporting.ai website

A minimal Astro + Tailwind site for assembling information about patch backporting automation, with two sections: Articles and Digests.

## Prerequisites

- Node.js >= 18.14
- npm

## Install & run locally

```bash
npm install
npm run dev
```

This starts the dev server at the URL printed in the terminal (typically http://localhost:4321).

## Build & preview

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/` – site pages (`/`, `/articles`, `/digests`)
- `src/layouts/` – base layout and shared styles
- `public/` – static assets (e.g., `favicon.svg`)
- `astro.config.mjs` – Astro configuration
- `tailwind.config.mjs` / `postcss.config.cjs` – Tailwind setup

## VS Code debug

A launch configuration is provided under `.vscode/launch.json` to run the Astro dev server.

## Next steps (see `TECHNOLOGY.md` / `DESIGN.md`)

- Add content sources: `data/resources.json`, `content/digests/`
- Add search (Pagefind) and Giscus for comments on digests
- Add submission flow via GitHub Issues or a simple form
