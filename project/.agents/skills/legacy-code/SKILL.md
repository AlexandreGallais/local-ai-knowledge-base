---
name: legacy-code
description: "Changes code that has no tests safely - characterization tests that pin current behaviour, seams to break dependencies, minimal edits. Use when modifying code without tests, old code nobody understands, or a large function with many responsibilities."
metadata:
  id: EXP-07
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Legacy code

**Core rule:** before changing untested code, pin its current behaviour with characterization tests, even where that behaviour looks wrong.

## Procedure

1. Find the change point and what reaches it.
   - Check: the function to change and its callers are listed.
2. Write characterization tests: call the code with real-looking inputs and assert what it returns today.
   - Check: the tests pass on the unchanged code.
3. If dependencies block testing (database, clock, network), add a seam: parameter, interface, or a small wrapper, with the minimum change.
   - Check: the seam does not change behaviour (tests still pass).
4. Make the change.
   - Check: characterization tests still pass, except those you meant to change, which you update knowingly.
5. Add tests for the new behaviour.
   - Check: green.

## Stop and ask the human if

- The current behaviour looks like a bug: ask whether to keep it or fix it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Rewrite it cleanly first." | Without tests, the rewrite changes behaviour silently. |
| "Tests should assert the correct behaviour." | Characterization tests pin what it does now; correctness comes after. |

## Definition of done

- [ ] Characterization tests green before and after; behaviour changes only where intended and tested.
