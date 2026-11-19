---
name: git-safety
description: "Keeps Git work recoverable. Use when about to run any git command that changes history or the working tree (commit, reset, rebase, checkout, switch, stash, push), when on main or master, or when you see 'rejected', 'non-fast-forward', 'detached HEAD' or 'Your branch has diverged'."
metadata:
  id: GIT-01
  stars: "5"
  nature: guardrail
  mode: A
  wave: V0
  load: always
---

# Git safety

**Core rule:** never commit on `main` (or `master`), never force-push a shared branch, and run `git status` before any command that changes history or files.

## Rules

1. Run `git status` and `git branch --show-current` before commit, reset, rebase, checkout, switch, stash or push.
   - Check: you know the branch and whether the tree is clean.
2. On `main` or `master`, create a branch before the first commit: `git switch -c <type>/<short-topic>`.
   - Check: `git branch --show-current` no longer prints `main` or `master`.
3. Before `reset`, `rebase` or any risky step, save a pointer: `git branch backup/<topic>-<YYYYMMDD>`.
   - Check: `git branch --list 'backup/*'` shows it.
4. Push with `git push -u origin <branch>`. On "rejected" or "non-fast-forward", fetch and rebase your own branch; never `--force` a branch others use.
   - Check: the push output ends without `rejected`.
5. Stage files by name (`git add <path>`), then read `git diff --cached --stat` before committing.
   - Check: only the files of the task are staged.
6. Destructive Git commands go through `destructive-action-gate`.
   - Check: the human approved the exact command.

## Stop and ask the human if

- The branch has diverged from its remote and the rebase has conflicts you cannot explain.
- A force push seems needed: on your own unshared branch use `--force-with-lease`, only after a yes.
- `git status` shows changes you did not make.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "A quick commit on main is harmless." | It bypasses review. Branch first. |
| "`git add -A` is faster." | It stages secrets, build output and other people's work. |
| "Detached HEAD is fine." | Commits there get lost. Create a branch. |

## Definition of done

- [ ] No commit on `main` or `master`; no force push on a shared branch.
- [ ] `git status` ran before each history-changing command.
