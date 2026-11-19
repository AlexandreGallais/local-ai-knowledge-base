---
name: loop-breaker
description: "Detects a loop and stops it - the same error, the same command or the same edit three times without progress. Use when a command or test fails again with the same message, when you are about to retry something that already failed twice, or when several attempts produced no new information."
metadata:
  id: MET-04
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: always
---

# Loop breaker

**Core rule:** the third identical failure ends the attempt: stop, change the hypothesis, or hand back to the human with the evidence.

## Signs of a loop

| Sign | Example |
| --- | --- |
| Same error text after a change | `TS2345` on the same line, three runs in a row |
| Same command run again with no change in between | `npm install` three times |
| Edit, undo, redo | the same lines changed back and forth |
| No new information from the last two steps | outputs identical apart from timestamps |

## Procedure

1. Count: keep a short tally of attempts per error in your reply (`attempt 2/3 on <error>`).
   - Check: the tally is visible before each retry.
2. At the third identical failure, stop acting on that path.
   - Check: no fourth retry of the same command or edit.
3. Write what you know: the error, what you tried, what each try showed.
   - Check: three lines at least, with the exact error text.
4. Choose one: a new hypothesis with a different test (`systematic-debugging`), or hand back to the human.
   - Check: the new hypothesis differs from the three tried; otherwise ask with the `question` tool.

## Stop and ask the human if

- Two different hypotheses failed after the loop was detected.
- The fix seems to need an install, a network access or a change of configuration you cannot verify.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One more try might work." | Same input, same result. Change something real or stop. |
| "I will try a slightly different flag." | Read the docs for the flag first (`api-existence-check`). |

## Definition of done

- [ ] No command or edit was repeated a third time without a new hypothesis.
- [ ] A detected loop ended with a written summary and a new plan or a question.
