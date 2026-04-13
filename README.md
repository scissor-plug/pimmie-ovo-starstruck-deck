# MIKH 2026 proposal deck

Standalone slide deck for the **Mikhail Agency website overhaul** development engagement. It presents **application stack**, **timeline**, and **budget** in a simple viewer with a fullscreen **Present** mode (arrow keys, space, escape).

Built with SvelteKit and `@sveltejs/adapter-static`, reusing the slide layout components from your syncdeck project (no database, auth, or AI).

## Edit the content

All copy and slide order live in:

[`src/lib/data/mikh-deck.json`](src/lib/data/mikh-deck.json)

Each slide has a `layout` (`header-body`, `grid-3`, `data-table`, `split`, etc.) and a `content` object (`title`, `subtitle`, `body`, `gridItems`, `tableRows`, …). Adjust budgets, dates, and stack wording there before sharing externally.

## Develop

```sh
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build and preview

Static files are emitted to `build/`:

```sh
npm run build
npm run preview
```

Deploy `build/` to any static host (Netlify, Vercel, S3, etc.).

**Railway (Railpack):** `railway.json` + `railpack.json` pin the build (`npm ci && npm run build`) and runtime (`serve` on `PORT`). Dependencies are listed under `dependencies` so production installs include Vite/SvelteKit.

## Typecheck

```sh
npm run check
```

## Push to GitHub

Remote: `https://github.com/scissor-plug/pimmie-ovo-starstruck-deck.git`

If **Push** fails in the editor (authentication, permission denied, or “failed to push”):

1. Log in to GitHub CLI: `gh auth login`
2. Point Git at the CLI for `github.com` credentials: `gh auth setup-git --hostname github.com`
3. Commit any changes, then from this folder: `git push origin main`

Only **committed** changes can be pushed. Use Terminal in the project root if the Source Control UI keeps failing after step 2.
