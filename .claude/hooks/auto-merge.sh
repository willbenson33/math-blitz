#!/usr/bin/env bash
# Stop hook: after a turn that changed files, commit, push the branch,
# and merge it into master — but only if a lightweight sanity check passes.
set -u

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

branch=$(git rev-parse --abbrev-ref HEAD)
[ "$branch" = "HEAD" ] && exit 0   # detached HEAD — nothing sensible to push

# 1. Commit any pending changes from this turn.
changed=0
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "Auto-commit from Claude Code session" || true
  changed=1
fi

# Refresh master and rebase onto it so the merge below can always fast-forward.
# (Without this, a branch whose base is older than master diverges and the
#  fast-forward push silently fails.)
git fetch origin master >/dev/null 2>&1
if ! git rebase origin/master >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1
  printf '{"systemMessage":"Auto-merge hook: branch conflicts with master — rebase aborted, resolve and merge manually."}'
  exit 0
fi

# Skip the rest if nothing new and the branch isn't ahead of master.
ahead=$(git rev-list --count origin/master..HEAD 2>/dev/null || echo 0)
if [ "$changed" = "0" ] && [ "$ahead" = "0" ]; then
  exit 0
fi

# 2. "Confirm it works": lightweight gate for this static site.
#    A real build/test step would go here for a non-static project.
if ! grep -q "</html>" index.html 2>/dev/null; then
  printf '{"systemMessage":"Auto-merge hook: index.html sanity check failed — committed but did NOT merge to master."}'
  exit 0
fi

# 3. Push the branch, then merge into master (fast-forward push).
git push -f -u origin "$branch" >/dev/null 2>&1
if git push origin "HEAD:master" >/dev/null 2>&1; then
  printf '{"systemMessage":"Auto-merge hook: committed, pushed %s, and merged into master."}' "$branch"
else
  printf '{"systemMessage":"Auto-merge hook: pushed %s, but master merge was non-fast-forward — merge it manually."}' "$branch"
fi
exit 0
