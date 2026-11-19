---
name: reproduce-first
description: "Requires a minimal reproduction or a failing test before any bug fix. Use when the user reports a bug, a crash, a wrong value or a regression, when an issue or a log shows a failure, and before changing code to fix anything."
metadata:
  id: DBG-02
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: auto
---

# Reproduce first

**Core rule:** before fixing a bug, run something that fails because of it: a failing test, a minimal script or a command with its wrong output.

## Procedure

1. Write the expected and the actual behaviour in one line each.
   - Check: both are concrete values or messages, not "it is broken".
2. Reproduce with the cheapest tool: a unit test first, else a small script or a CLI call with a fixture.
   - Check: you ran it and it shows the actual (wrong) behaviour.
3. Shrink it: remove inputs and steps that are not needed for the failure.
   - Check: after each removal the failure is still there.
4. Keep the reproduction as a test that will guard the fix.
   - Check: the test is in the test folder of the project and fails now.

## Example

Bad: "I think `parseDate` mishandles time zones; I changed it."

Good: `expect(parseDate('2026-03-29T02:30:00+01:00').getUTCHours()).toBe(1)` fails with `2`, then the fix makes it pass.

## Stop and ask the human if

- You cannot reproduce after two different approaches: ask for the input, the environment or the logs.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I can see the bug in the code." | Seeing is a hypothesis; the failing run is the proof. |
| "The reproduction is too slow to write." | The fix without it costs more when it is wrong. |

## Definition of done

- [ ] A reproduction failed before any fix.
- [ ] It is kept as a regression test.
