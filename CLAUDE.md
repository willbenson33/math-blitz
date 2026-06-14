# Math Blitz

Single-file web app: the entire game lives in `index.html` (React via CDN + Babel standalone, all styles in one `<style>` block). There is no build step — open `index.html` in a browser to run it.

## Workflow

- Develop on the assigned feature branch, then commit and push.
- An auto-merge hook (`.claude/hooks/auto-merge.sh`) merges pushed branches into the default branch (`master`).

## End-of-turn merge confirmation (required)

At the end of **every** turn, after pushing, finish your reply with an explicit
line confirming the merge status of the work you just pushed. Check it by
fetching `master` and seeing whether your commit is on it:

```
git fetch origin master -q && git log --oneline origin/master -1
```

State one of these clearly as the final line:

- **Merged ✅** — `<short-sha>` is on `origin/master`.
- **Not merged ❌** — pushed to `<branch>` but not yet on `origin/master`.

Never imply something merged without verifying against `origin/master` first.
