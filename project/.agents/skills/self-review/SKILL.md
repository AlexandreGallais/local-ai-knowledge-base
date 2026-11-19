---
name: self-review
description: "Reviews your own diff before delivering - debug output, TODO left, dead code, secrets, imports, out-of-scope files. Use when about to commit, push, open or update a merge request, or say done, after any code change."
metadata:
  id: REV-01
  stars: "5"
  nature: process
  mode: A
  wave: V1
  load: always
---

# Self-review

**Core rule:** read the whole diff yourself before anyone else sees it, and fix every finding of the checklist.

## Procedure

1. List what changed: `git status --short` and `git diff --stat` (add `--cached` for staged files).
   - Check: every file in the list belongs to the task.
2. Read the diff file by file: `git diff -- <file>`.
   - Check: you read every hunk, not only the first file.
3. Search for leftovers in the added lines: `git diff -U0 | grep -n -E '^\+.*(console\.log|print\(|debugger|dbg!|TODO|FIXME|XXX)'`.
   - Check: no match, or each match is intended and explained.
4. Search for secrets in the added lines: `git diff -U0 | grep -n -i -E '^\+.*(password|passwd|secret|token|api[_-]?key|BEGIN [A-Z ]*PRIVATE KEY)'`.
   - Check: no match; otherwise follow `secrets-hygiene`.
5. Check the checklist below on what you read.
   - Check: each item ticked or fixed.
6. Run the project's checks again after the fixes.
   - Check: tests, build and lint exit 0.

## Checklist

- [ ] No commented-out code, no unused import, variable or function added.
- [ ] Names follow the project's conventions (`repo-conventions` if present).
- [ ] Errors handled, not swallowed; no empty catch.
- [ ] Tests added or changed for the new behaviour.
- [ ] No file outside the task (lockfiles only if dependencies changed on purpose).
- [ ] No generated, binary or local file (`.env`, `node_modules`, build output).

## Stop and ask the human if

- The diff touches files you did not intend to change and you cannot tell why.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I wrote it, I know what is in it." | Leftovers hide in the parts you do not remember. Read the diff. |
| "The linter will catch it." | Linters miss debug prints, secrets and scope creep. |

## Definition of done

- [ ] Whole diff read; checklist ticked; searches for leftovers and secrets empty.
- [ ] Checks green after the fixes.
