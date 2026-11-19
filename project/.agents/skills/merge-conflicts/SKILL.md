---
name: merge-conflicts
description: "Resolves Git merge and rebase conflicts hunk by hunk by understanding both intents, then reruns the checks before finishing. Use when git stops with CONFLICT, when files contain <<<<<<< markers, during a merge, a rebase or a cherry-pick, or when the user asks to resolve conflicts."
license: MIT
metadata:
  id: GIT-04
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: auto
---

# Merge conflicts

**Core rule:** resolve each conflict by keeping both intents where they are compatible; never pick `--ours` or `--theirs` for a whole file without reading why each side changed.

## Procedure

1. List the conflicted files: `git status --short | grep -E '^(UU|AA|DU|UD) '`.
   - Check: you have the full list.
2. For each side, read why it changed: `git log --oneline --merge -- <file>`, then `git show <commit>` for the commits that touch the hunk.
   - Check: you can state the intent of each side in one sentence.
3. Edit each hunk: combine both changes when compatible; when not, keep the side that matches the goal of this merge and note what you dropped.
   - Check: `grep -n -E '^(<<<<<<<|=======|>>>>>>>)' <file>` finds nothing.
4. Mark resolved: `git add <file>`.
   - Check: the file leaves the conflict list.
5. Run the project's checks: type check, tests, lint.
   - Check: all exit 0 before continuing.
6. Finish: `git rebase --continue`, or `git commit` for a merge (`git cherry-pick --continue` for a cherry-pick).
   - Check: `git status` shows no operation in progress.

## Stop and ask the human if

- The two intents contradict and the goal of the merge does not say which wins.
- The conflict is in generated files or lockfiles: regenerate them with their tool instead, and say so.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Take theirs, it is newer." | Newer is not right; you may drop a fix. |
| "Markers gone, done." | A merge often compiles and still breaks tests. Run them. |
| "Abort and start over." | Aborting loses the resolution work; ask before aborting. |

## Definition of done

- [ ] Every hunk resolved with both intents kept or a stated drop.
- [ ] No marker left; checks green; operation finished.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
