---
name: patch-and-backport
description: "Moves a fix to another branch - cherry-pick, format-patch and am, backport to a maintenance branch - with conflicts resolved and tests run there. Use when a fix must also go to a release or maintenance branch, when applying a patch file, or when asked to backport."
metadata:
  id: GIT-13
  stars: "1"
  nature: reference
  mode: A
  wave: V4
  load: auto
---

# Patch and backport

**Core rule:** backport from a commit that is already merged and tested, with `-x` to keep its origin, and run the tests on the target branch.

## Procedure

1. Identify the commit(s) of the fix on the main branch.
   - Check: `git show --stat <hash>` shows only the fix.
2. Branch from the target: `git switch -c backport/<topic>-<version> origin/<maintenance-branch>`.
   - Check: the branch starts at the maintenance branch.
3. Cherry-pick with origin: `git cherry-pick -x <hash>`; resolve conflicts (`merge-conflicts`).
   - Check: the commit message holds `(cherry picked from commit <hash>)`.
4. For a patch file: `git am --3way < fix.patch` (made with `git format-patch -1 <hash>`).
   - Check: `git log -1` shows the patch's author and message.
5. Run the tests on the target branch, then open a merge request to it.
   - Check: tests green; MR targets the maintenance branch.

## Stop and ask the human if

- The fix depends on changes absent from the maintenance branch.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Copy the code by hand." | The link to the original fix is lost. Use cherry-pick -x. |
| "Tests passed on main." | The target branch differs. Run them there. |

## Definition of done

- [ ] Fix cherry-picked with -x on a backport branch; tests green there; MR to the target.
