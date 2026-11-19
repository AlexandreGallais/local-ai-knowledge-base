---
name: incremental-steps
description: "Builds a change in thin verified slices - modify, run, verify, commit - never one large untested batch. Use when implementing a feature or a fix that touches several files or functions, when more than about 100 lines would change before the next test run, or when the build has been red for several edits."
license: MIT
metadata:
  id: MET-11
  stars: "4"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# Incremental steps

**Core rule:** after each small change, run the narrowest check that covers it, and keep it green before the next change.

## When to use

- Use when: implementing anything larger than one function; following a `PLAN.md`.
- Do not use when: renaming or formatting with a tool that changes many files at once and has its own check.

## Procedure

1. Pick the smallest slice that changes one behaviour (one function, one endpoint, one component state).
   - Check: you can say what the slice does in one sentence.
2. Make the change with exact edits (`surgical-editing`).
   - Check: `git diff --stat` shows only the slice's files.
3. Run the narrowest check: the one test file, the type check of the package, the one command.
   - Check: it passes; if it fails, fix it now, before anything else.
4. Run the wider check at each checkpoint: full tests and build.
   - Check: exit 0.
5. Commit the slice with a clear message (on a branch, see `git-safety`).
   - Check: `git status` is clean after the commit.
6. Repeat with the next slice.
   - Check: the build was never left red between two slices.

## Stop and ask the human if

- A slice cannot be made green without changing a design decision.
- The slices keep growing past about 150 lines: the plan needs a new breakdown.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will write it all and test at the end." | Ten errors at once are harder than one. |
| "The tests are slow, skip them for now." | Run the narrowest test; it takes seconds. |
| "I will fix this unrelated thing too." | Out of scope; note it (`scope-discipline`). |

## Definition of done

- [ ] Every slice ran its narrow check green before the next one.
- [ ] Full tests and build green at the end.
- [ ] One commit per verified slice.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
