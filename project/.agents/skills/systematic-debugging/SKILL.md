---
name: systematic-debugging
description: "Finds the root cause of a bug before any fix - reproduce, localise, reduce, one hypothesis, one fix, one guard test. Use when a test fails, the build breaks, behaviour is unexpected, an exception or stack trace appears, the user says 'it does not work', or a previous fix did not work."
license: MIT
metadata:
  id: DBG-01
  stars: "5"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# Systematic debugging

**Core rule:** no fix before the root cause is found and a command reproduces the failure on demand.

## When to use

- Use when: any bug, failing test, build or runtime error, wrong output, slowness, flaky behaviour.
- Do not use when: the cause is already proven by a failing test you wrote; go to the fix (step 6).

## Procedure

1. Read the whole error: message, code, file and line, the first frame in project code (`stack-trace-reading` if present).
   - Check: you can quote the exact error line and its location.
2. Build a red loop: one command that shows the failure, ideally a failing test (`reproduce-first`).
   - Check: you ran it and it failed with the user's exact symptom, not a nearby one.
3. Reduce: cut inputs, steps, config and code until the loop barely still fails.
   - Check: each cut was followed by a run; the loop still fails.
4. Localise: compare with working code or the last good commit (`git log -p`, `git bisect`); trace the bad value back to where it is created.
   - Check: you can name the line where correct state becomes wrong state.
5. Write one hypothesis: "X is wrong because Y". Test it with one change or one log line.
   - Check: the result confirms or kills the hypothesis. Killed: go back to step 4, not to a new guess.
6. Fix the root cause with the smallest change, at the origin, not at the symptom.
   - Check: the loop from step 2 now passes.
7. Keep the loop as a regression test and run the whole suite.
   - Check: the new test fails without the fix and passes with it; the suite is green.
8. Remove every temporary log and debug line.
   - Check: `git diff` holds no debug output.

## Stop and ask the human if

- You cannot build a loop that reproduces the symptom: say what you tried and ask for logs, data or access.
- Three hypotheses failed (`loop-breaker`): stop and report the evidence.
- The fix needs a change of design or of a public API.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The fix is obvious, skip the loop." | Without a red loop you cannot tell the fix works. |
| "Let me try a few changes." | Random changes hide the cause and add bugs. One hypothesis at a time. |
| "I will catch the exception here." | That hides the symptom; the bad state stays. Fix where it starts. |
| "The test passes now, so it is fixed." | Check that it failed before the fix. |
| "It is flaky, rerun it." | Flaky is a bug: timing, order or shared state (`flaky-tests` if present). |

## Definition of done

- [ ] Root cause named, with the line where state goes wrong.
- [ ] A regression test that failed before the fix and passes after.
- [ ] Whole suite green; no debug code left.
- [ ] No fix was applied before the root cause was found.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
