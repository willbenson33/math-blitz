# Math Blitz

Single-file web app: the entire game lives in `index.html` (React + Babel standalone, vendored under `vendor/`, all styles in one `<style>` block). There is no build step — open `index.html` in a browser to run it.

## Build & deploy

- Local dev needs no build: just open `index.html` (it transpiles its inline JSX in the browser via vendored Babel).
- `node build.mjs` pre-compiles the JSX into `dist/` (compiled `index.html` + React runtime, no Babel) for production. `dist/` is gitignored.
- CI (`.github/workflows/deploy-pages.yml`) runs the build and publishes `dist/` to GitHub Pages on every push to `master`.

## Workflow

- Develop on the assigned feature branch, then commit and push.
- An auto-merge hook (`.claude/hooks/auto-merge.sh`) runs `node build.mjs` as a gate, then merges pushed branches into the default branch (`master`).
