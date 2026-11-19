---
name: defense-in-depth
description: "Adds validation at each layer the data crosses after a fix, so the bug becomes structurally impossible. Use when you fixed a bug caused by invalid input or state, when a value can reach code by several paths, or when one check at one place feels fragile."
license: MIT
metadata:
  id: DBG-14
  stars: "2"
  nature: reference
  mode: R
  wave: V3
  load: auto
---

# Defense in depth

**Core rule:** after the root fix, check the same invariant at each boundary the data crosses, so another path cannot bring the bug back.

## Procedure

1. Name the invariant that was broken (for example "the working directory is never empty").
   - Check: one sentence, testable.
2. List the layers the value crosses: entry point, business logic, storage or environment, output.
   - Check: each layer has a file and a function.
3. Add a check at each layer where the value can arrive by another path.
   - Check: each check fails loudly with a clear message.
4. Add one test per layer that sends the bad value through that path.
   - Check: each test fails without its check and passes with it.

| Layer | Check |
| --- | --- |
| Entry (API, CLI, file read) | validate and reject |
| Business logic | assert the invariant before acting |
| Environment or storage | guard dangerous operations (paths, deletes) |
| Diagnostics | log the rejected value with context |

## Stop and ask the human if

- A check would change the behaviour of a public interface.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The entry check is enough." | Other callers, refactors and mocks bypass it. |
| "Checks everywhere slow the code." | One comparison per layer; measure if in doubt. |

## Definition of done

- [ ] Invariant checked at each crossing layer, each with its test.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
