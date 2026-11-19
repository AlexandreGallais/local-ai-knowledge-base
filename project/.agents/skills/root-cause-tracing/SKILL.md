---
name: root-cause-tracing
description: "Traces a wrong value backwards through the call stack to where it is first created, and fixes it there instead of at the symptom. Use when an error appears deep in the code, a value is null, empty or wrong far from where it was set, or a fix at the crash site would only hide the problem."
license: MIT
metadata:
  id: DBG-03
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: auto
---

# Root-cause tracing

**Core rule:** fix the place where the state first becomes wrong, never only the place where it crashes.

## When to use

- Use when: the crash site receives bad data from elsewhere; a guard at the crash site is tempting.
- Do not use when: the bug is inside the function that fails, with good inputs (`systematic-debugging`).

## Procedure

1. Write the wrong value and where it is observed (file, line, variable).
   - Check: one line with both.
2. Find the direct caller that passed it: the stack trace, or `grep` on the function name.
   - Check: you have the caller's file and line.
3. At the caller, decide: is the value already wrong when it arrives, or made wrong here?
   - Check: a log line or a test assertion shows the value at that point.
4. Repeat steps 2 and 3 upwards until the value is right on entry and wrong on exit.
   - Check: you can name the function where it turns wrong.
5. Fix there; then add a check at the entry of the crashing function only if inputs can come from outside.
   - Check: the original reproduction passes; the suite is green.
6. Remove the temporary logs.
   - Check: `git diff` holds no debug output.

## Stop and ask the human if

- The value comes from outside the code (database, user input, another service) and the expected format is not documented.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add `if (x == null) return;` at the crash." | The bad state flows on and fails later, silently. |
| "Trace by reading only." | Log or assert the value at each level; reading guesses. |

## Definition of done

- [ ] The function where the value turns wrong is named and fixed.
- [ ] Reproduction and suite green; temporary logs removed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
