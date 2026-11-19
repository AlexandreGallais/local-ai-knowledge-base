---
name: code-simplification
description: "Manual: run only when the user explicitly asks for /code-simplification. Reduces the complexity of code that works but is hard to maintain - nesting, duplication, dead branches, needless abstractions - without changing its behaviour."
license: MIT
metadata:
  id: DEV-06
  stars: "3"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Code simplification

**Core rule:** behaviour stays identical, proven by the same tests before and after; simpler means fewer concepts for the reader, not fewer characters.

## Procedure

1. Make sure tests cover the code; add characterisation tests if needed (`legacy-code`).
   - Check: tests pass and fail when the code is broken on purpose.
2. List the complexity: deep nesting, long functions, duplication, flags, dead code, abstractions with one user.
   - Check: each item has its location.
3. Simplify one item at a time: early returns, extract or inline, merge duplicates, remove dead code (after `git-archaeology`).
   - Check: tests green after each item.
4. Compare before and after for the reader: fewer branches, shorter functions, clearer names.
   - Check: the diff removes more concepts than it adds.

## Stop and ask the human if

- Simplifying needs a change of behaviour or of a public interface.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One-liners are simpler." | Dense code is harder to read. Aim for clarity. |
| "This code is dead." | Prove it with a search and the history before deleting. |

## Definition of done

- [ ] Same tests green before and after; no behaviour change.
- [ ] Each simplification made in its own step.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
