---
name: git-submodules
description: "Works with Git submodules - init, update, sync, change the pinned commit, and the usual traps. Use when a repository has a .gitmodules file, when a submodule folder is empty or shows 'modified content', after cloning a repository with submodules, or when a submodule must point to a new commit."
metadata:
  id: GIT-11
  stars: "2"
  nature: reference
  mode: B
  wave: V3
  load: auto
---

# Git submodules

**Core rule:** the parent repository pins one commit of each submodule; change it on purpose, commit the new pointer, and never leave work only inside a detached submodule.

## Procedure

1. Initialise after a clone: `git submodule update --init --recursive`.
   - Check: `git submodule status` shows no leading `-`.
2. To move a submodule to a new commit: `git -C <path> fetch`, `git -C <path> switch <branch>` or `checkout <commit>`, then in the parent `git add <path>` and commit.
   - Check: `git diff --cached --submodule` shows the old and new commits.
3. To work inside a submodule: switch to a branch there first, commit and push there, then update the pointer in the parent.
   - Check: `git -C <path> status` shows a branch, not a detached HEAD.
4. After a URL change in `.gitmodules`: `git submodule sync --recursive`.
   - Check: `git -C <path> remote -v` shows the new URL.

## This installation

<!-- FILL: what=submodules of the project and their internal URLs; find=cat .gitmodules; verify=git submodule update --init succeeds without network outside the internal host -->

<!-- FILL: what=whether CI clones submodules (GIT_SUBMODULE_STRATEGY); find=grep -n GIT_SUBMODULE .gitlab-ci.yml; verify=the CI job log shows the submodules checked out -->

## Stop and ask the human if

- A submodule must be removed or its URL changed for everyone.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I committed inside the submodule, done." | The parent still points to the old commit. Commit the pointer. |
| "Detached HEAD is harmless." | Commits there are easy to lose. Use a branch. |

## Definition of done

- [ ] Submodules initialised; pointer changes committed in the parent; no work left on a detached HEAD.

## Local completion checklist

- [ ] Project submodules and URLs
- [ ] CI submodule strategy
