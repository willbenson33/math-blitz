# Math Blitz

Single-file web app: the entire game lives in `index.html` (React via CDN + Babel standalone, all styles in one `<style>` block). There is no build step — open `index.html` in a browser to run it.

## Workflow

- Develop on the assigned feature branch, then commit and push.
- An auto-merge hook (`.claude/hooks/auto-merge.sh`) merges pushed branches into the default branch (`master`).
