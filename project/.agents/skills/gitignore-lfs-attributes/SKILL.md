---
name: gitignore-lfs-attributes
description: "Sets up .gitignore, Git LFS and .gitattributes - ignored build output and secrets, large binaries in LFS, line endings. Use when a generated or local file shows in git status, when adding large binary files, when line endings flip between systems, or when git lfs is mentioned."
metadata:
  id: GIT-10
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# .gitignore, LFS and attributes

**Core rule:** ignore what is generated or local, track large binaries with LFS before their first commit, and fix line endings in `.gitattributes`, not per machine.

## Procedure

1. For a file that should not be tracked, add a pattern to `.gitignore` and check it: `git check-ignore -v <file>`.
   - Check: the command prints the matching rule.
2. If it was already tracked, untrack it without deleting it: `git rm --cached <file>`.
   - Check: `git status` shows it deleted from the index only.
3. For large binaries, track the pattern before adding files: `git lfs track "*.bin"`, then commit `.gitattributes`.
   - Check: `git lfs ls-files` lists the new files after `git add`.
4. Normalise line endings: `* text=auto`, and explicit rules for scripts (`*.sh text eol=lf`) and Windows files (`*.bat text eol=crlf`).
   - Check: `git ls-files --eol <file>` shows the expected endings.

## Stop and ask the human if

- A large binary is already in history: removing it needs history rewriting (`destructive-action-gate`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add it to .gitignore and it disappears." | Tracked files stay tracked; use `git rm --cached`. |
| "Track with LFS after committing." | The binary is already in history. Track first. |

## Definition of done

- [ ] Ignored files checked with check-ignore; binaries in LFS; line endings set in .gitattributes.
