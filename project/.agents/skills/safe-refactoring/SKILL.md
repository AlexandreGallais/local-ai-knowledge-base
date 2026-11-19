---
name: safe-refactoring
description: "Restructures code without changing behaviour, in small steps with tests green between each. Use when asked to refactor, extract, rename, move, split or inline code, to remove duplication, or before a change that the current structure makes hard."
metadata:
  id: DEV-05
  stars: "4"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Safe refactoring

**Core rule:** behaviour does not change: the same tests pass before, between and after each step, and no test is edited to make it pass.

## Procedure

1. Make sure tests cover the code you will move; add characterisation tests if not (`legacy-code` if present).
   - Check: the tests pass now and fail if you break the code on purpose once.
2. Pick one mechanical step: rename, extract function, move, inline, change signature.
   - Check: the step can be named in three words.
3. Do it with the safest tool: the language server's rename, or exact edits plus `grep` for every use.
   - Check: `grep -rn "<old name>"` finds no leftover use.
4. Run the tests and the type check.
   - Check: same results as in step 1.
5. Commit the step alone (`refactor: ...`).
   - Check: the commit has no behaviour change mixed in.
6. Repeat until the structure is right.
   - Check: each step was green.

## Stop and ask the human if

- A public API or a stored data format would change.
- The code has no tests and characterisation tests are not possible.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will fix this bug while refactoring." | Mixed changes hide which one broke things. Separate commits. |
| "The rename tool caught everything." | Strings, configs and reflection are missed. Grep. |

## Definition of done

- [ ] Same tests green before and after; no test changed to pass.
- [ ] One commit per refactoring step; no behaviour change.
