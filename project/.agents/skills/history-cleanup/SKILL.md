---
name: history-cleanup
description: "Cleans a branch's history before a merge request with a non-interactive rebase - fixup! commits and --autosquash, squash, reword. Use when the branch has 'wip', 'fix typo' or 'oops' commits, when the user asks to squash or tidy commits, or before marking an MR ready; never on a shared branch."
metadata:
  id: GIT-05
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# History cleanup

**Core rule:** rewrite only your own unshared branch, with a backup branch first, and never with an interactive editor.

## Procedure

1. Check the branch is yours and not shared: `git log --format='%an' origin/<target>..HEAD | sort -u`.
   - Check: only you appear; otherwise stop.
2. Save a backup: `git branch backup/<branch>-<YYYYMMDD>`.
   - Check: `git branch --list 'backup/*'` shows it.
3. For a fix that belongs to an earlier commit, commit it as a fixup: `git commit --fixup=<hash>`.
   - Check: `git log --oneline` shows `fixup! <subject>`.
4. Squash the fixups without an editor: `GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash origin/<target>`.
   - Check: the fixup commits are gone; `git log --oneline origin/<target>..HEAD` is clean.
5. To squash the whole branch into one commit: `git reset --soft origin/<target>` then `git commit` with a full message.
   - Check: one commit; `git diff backup/<branch>-<YYYYMMDD>` is empty.
6. Run the tests, then push with `git push --force-with-lease`, after the human's yes (`destructive-action-gate`).
   - Check: tests green; push accepted.

## Stop and ask the human if

- The branch was already reviewed: rewriting it breaks the reviewers' comments; ask first.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`git rebase -i` and edit the list." | No editor is available to you. Use fixups and autosquash. |
| "`--force` is the same." | `--force-with-lease` refuses to overwrite commits you did not see. |

## Definition of done

- [ ] Backup branch made; content identical to the backup (`git diff` empty).
- [ ] History clean; tests green; push only after a yes.
