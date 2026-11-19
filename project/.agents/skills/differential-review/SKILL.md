---
name: differential-review
description: "Manual: run only when the user explicitly asks for /differential-review. Reviews the diff between two versions for risk - security, regressions, blast radius, untested changes - and writes a short report."
license: CC-BY-SA-4.0
metadata:
  id: REV-05
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Differential review

**Core rule:** review what changed between two versions by risk: who calls the changed code, what tests cover it, and whether an old fix comes back.

## Procedure

1. Get the diff and its size: `git diff --stat <old>..<new>` and `git diff <old>..<new>`.
   - Check: you know the files and the line count.
2. For each changed function, count its callers (`grep` the name).
   - Check: a blast-radius number per function.
3. Find the tests that cover each changed function; list the changes without tests.
   - Check: untested changes are listed.
4. Look for regressions of earlier fixes: `git log -S '<removed line>' --oneline` on removed or changed checks.
   - Check: any removed check that was a fix is flagged.
5. Check the security-sensitive areas touched: input handling, auth, crypto, file and process calls (`secure-coding`).
   - Check: each one reviewed with a finding or "none".
6. Write the report: summary, findings by severity with file and line, untested changes, blast radius.
   - Check: the report is saved or posted.

## Stop and ask the human if

- The diff is too large to review by risk in one pass: agree on the areas to cover.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Review line by line in order." | Order by risk: wide blast radius and untested changes first. |
| "Removed code is safe." | Removed checks are where old bugs come back. |

## Definition of done

- [ ] Blast radius, test coverage, removed fixes and security areas reported with locations.

## References

- `references/SOURCE.md`: upstream and licence of this skill (CC-BY-SA-4.0: this adaptation keeps that licence).
