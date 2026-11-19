---
name: git-recovery
description: "Recovers lost Git work - reflog, revert versus reset, restoring a deleted branch, a dropped stash or an undone commit. Use when a commit, a branch or changes seem lost, after a bad reset, rebase or checkout, or when the user wants to undo a commit that is already pushed."
metadata:
  id: GIT-06
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Git recovery

**Core rule:** before any recovery command, run `git status` and `git reflog -20`, and recover by creating a new branch at the lost commit rather than by moving the current one.

## Procedure

1. Look: `git status`, `git reflog -20`, `git log --oneline --all -20`.
   - Check: you can point to the hash that holds the lost work.
2. Save it: `git branch rescue/<YYYYMMDD> <hash>`.
   - Check: `git log --oneline -3 rescue/<YYYYMMDD>` shows the work.
3. Bring the work back with the table below.
   - Check: the files hold the expected content; tests run.

| Situation | Command |
| --- | --- |
| Undo a pushed commit | `git revert <hash>` (new commit; history kept) |
| Undo the last local commit, keep the changes | `git reset --soft HEAD~1` |
| Branch deleted | `git branch <name> <hash from reflog>` |
| Bad rebase or reset | `git branch rescue/<date> <hash from reflog before it>` |
| Stash dropped | `git fsck --no-reflog \| grep 'dangling commit'`, then `git show <hash>` |
| One file broken | `git restore --source=<hash> -- <file>` |

## Stop and ask the human if

- Recovery needs `reset --hard` or a force push (`destructive-action-gate`).
- The lost work was never committed or stashed: it cannot be recovered by Git.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Reset the branch to fix it." | Create a rescue branch first; reset can lose more. |
| "Revert and reset are the same." | Revert adds a commit (safe on shared branches); reset rewrites history. |

## Definition of done

- [ ] Lost work saved on a rescue branch before any other change.
- [ ] Work restored and checked; no destructive command without a yes.
