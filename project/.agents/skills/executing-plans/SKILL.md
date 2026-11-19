---
name: executing-plans
description: "Carries out PLAN.md one task at a time with a checkpoint after each, ticking tasks and stopping when a step fails. Use when a PLAN.md or a numbered plan exists and the user says go, continue, implement the plan, or resume after an interruption."
license: MIT
metadata:
  id: PLN-04
  stars: "4"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# Executing plans

**Core rule:** the file `PLAN.md` is your memory: read the next unticked task from it, prove it done with its verify command, tick it, then take the next.

## When to use

- Use when: `PLAN.md` exists; you resume work after a pause or a context compaction.
- Do not use when: there is no plan and the work is more than 3 tasks; write one with `task-breakdown`.

## Procedure

1. Read `PLAN.md` and `git log --oneline -10`. Trust the file and the log over your memory.
   - Check: you can name the first task whose status is not `done`.
2. Read that task in full again, even if you remember it.
   - Check: you have its files, acceptance and verify command in context.
3. Implement it in slices (`incremental-steps`).
   - Check: the narrow checks are green.
4. Run its verify command and compare with the expected result.
   - Check: the output matches. If not and the code is wrong, use `systematic-debugging`. If the plan is wrong, see step 5.
5. When the plan is wrong, make the smallest change that meets the goal and record it under the task: `Ruling: <what> - <why>`.
   - Check: the ruling line is in `PLAN.md`.
6. Commit, then set the task's status to `done` with the verify result.
   - Check: `PLAN.md` shows `Status: done (<command> -> <result>)`.
7. At each checkpoint line, run the full suite and the build.
   - Check: both exit 0 before the next task.
8. After the last task, run `self-review` and `final-report`.
   - Check: the report lists every ruling.

## Stop and ask the human if

- A step is irreversible or destructive (`destructive-action-gate`).
- A task's verify command fails 3 times (`loop-breaker`).
- The plan contradicts the user's request in a way a ruling cannot settle.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I remember task 4." | You remember a summary. Read it again. |
| "I will tick tasks at the end." | Compaction erases your memory. Tick each one when done. |
| "Should I continue?" after each task | Continue; stop only for the reasons above. |

## Definition of done

- [ ] Every task `done` with its verify result, or stopped with the reason.
- [ ] Every deviation recorded as a ruling.
- [ ] Full suite and build green at the end.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
