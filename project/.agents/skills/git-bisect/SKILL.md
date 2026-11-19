---
name: git-bisect
description: "Finds the commit that introduced a regression with an automated git bisect run. Use when something worked before and fails now, when the user says 'it worked last week' or 'since the last release', or when the faulty change is unknown among many commits."
metadata:
  id: DBG-07
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Git bisect

**Core rule:** bisect with a script that exits 0 on good and 1 on bad, never by judging each step by hand.

## Procedure

1. Find a good commit and a bad one: `git log --oneline` and a tag or date that worked.
   - Check: the test script passes on the good commit and fails on the bad one.
2. Write the check script `/tmp/bisect-check.sh`: build if needed, run the narrowest test, exit 0 good, 1 bad, 125 to skip an unbuildable commit.
   - Check: `bash /tmp/bisect-check.sh; echo $?` gives the expected codes on both ends.
3. Make sure the tree is clean: `git status`.
   - Check: nothing to commit; stash or commit first if needed.
4. Run: `git bisect start <bad> <good>`, then `git bisect run bash /tmp/bisect-check.sh`.
   - Check: git prints `<hash> is the first bad commit`.
5. Read that commit: `git show --stat <hash>`.
   - Check: the change explains the regression.
6. End: `git bisect reset`.
   - Check: `git status` shows your original branch.

## Stop and ask the human if

- No known good commit exists, or most commits do not build.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will judge each step myself." | Manual bisects make mistakes; script it. |
| "Forget `bisect reset`." | You stay on a detached commit. Reset at the end. |

## Definition of done

- [ ] First bad commit identified by `git bisect run`.
- [ ] `git bisect reset` done; original branch back.
