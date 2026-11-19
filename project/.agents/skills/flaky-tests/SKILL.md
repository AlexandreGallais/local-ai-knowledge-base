---
name: flaky-tests
description: "Finds why a test passes and fails without code changes - repetition, order, timing, shared state - and replaces sleeps with waits on a condition. Use when a test fails sometimes, fails only in CI or only in the full suite, passes on retry, or contains sleep, setTimeout or fixed delays."
license: MIT
metadata:
  id: DBG-08
  stars: "3"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Flaky tests

**Core rule:** a flaky test is a bug in the test or the code; find the cause and fix it, never mark it as retry-until-green.

## Procedure

1. Reproduce the flakiness: run the test alone 20 times, then with the suite, then in a random order if the runner allows.
   - Check: you have a failure rate (for example 3 of 20) and the conditions that raise it.
2. Classify with the table.
   - Check: one class, with the evidence that points to it.
3. Fix the cause: wait on the real condition, isolate state, control time and randomness.
   - Check: 50 runs in the failing conditions all pass.
4. Remove every fixed sleep the fix made useless.
   - Check: `grep -n -E 'sleep|setTimeout|waitForTimeout' <test file>` finds none, or each has a comment explaining why time itself is tested.

| Class | Signs | Fix |
| --- | --- | --- |
| Timing | fixed sleeps, async not awaited, fails under load | wait for the condition with a timeout; await every promise |
| Order | fails only after another test | reset shared state; each test sets up its data |
| Shared resource | ports, files, database rows reused | unique names, temporary folders, random free ports |
| Time and randomness | dates, time zones, random values | inject a clock and a seed |
| Environment | CI only | compare environments (`works-on-my-machine`) |

## Stop and ask the human if

- The cause is in shared CI infrastructure.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Increase the sleep." | It slows the suite and still fails under load. |
| "Add a retry." | It hides a real race that users may hit. |

## Definition of done

- [ ] Cause classified with evidence; fixed; 50 runs green in failing conditions.
- [ ] No fixed sleep left without a reason.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
