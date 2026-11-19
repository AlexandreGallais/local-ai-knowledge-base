---
name: git-worktrees
description: "Works on several branches at once with git worktree instead of stashing - create, list, remove. Use when you must switch to another branch while work in progress cannot be committed, when comparing two branches side by side, or when a hotfix interrupts feature work."
license: MIT
metadata:
  id: GIT-07
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Git worktrees

**Core rule:** one worktree per branch, in a folder outside the main checkout, removed with `git worktree remove` when done.

## Procedure

1. Check the main checkout: `git status` and `git worktree list`.
   - Check: you know the existing worktrees.
2. Create a worktree for the other branch next to the project: `git worktree add ../<project>-<branch> <branch>` (add `-b <branch>` for a new branch).
   - Check: `git worktree list` shows it.
3. Work and run commands inside that folder; install its dependencies there.
   - Check: `git -C ../<project>-<branch> status` shows its branch.
4. When done, commit or push there, then remove it: `git worktree remove ../<project>-<branch>`.
   - Check: `git worktree list` no longer shows it.

## Stop and ask the human if

- The worktree has uncommitted changes and must be removed (`--force` deletes them).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Create the worktree inside the repository." | It confuses tools and may get committed. Put it beside. |
| "Delete the folder by hand." | Git keeps a stale entry; use `git worktree remove` (or `git worktree prune`). |

## Definition of done

- [ ] Worktree created outside the checkout, used, then removed cleanly.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
