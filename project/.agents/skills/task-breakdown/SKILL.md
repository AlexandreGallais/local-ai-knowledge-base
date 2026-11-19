---
name: task-breakdown
description: "Splits a request into small, ordered, verifiable tasks with acceptance criteria, saved in PLAN.md. Use when a request touches more than one file or step, feels too big to start, needs an order of work, or the user asks for a plan, a breakdown or the steps before coding."
license: MIT
metadata:
  id: PLN-03
  stars: "5"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# Task breakdown

**Core rule:** every task is small enough to finish and verify in one go, and names the command that proves it is done.

## When to use

- Use when: the work spans several files, layers or steps; the order is not obvious; the user wants a plan.
- Do not use when: it is a one-file change with an obvious check. Just do it.

## Procedure

1. Read the request, the spec if any, and the code areas involved, without writing code.
   - Check: you can list the files and modules the work touches.
2. Write the dependency order: what must exist before what (types before API, API before UI).
   - Check: no task depends on a later task.
3. Slice vertically: each task delivers one testable behaviour end to end, not one layer.
   - Check: each task can be demonstrated alone.
4. Write each task in `PLAN.md` with the template below. Size: 1 to 3 files, under about 150 changed lines.
   - Check: every task has acceptance criteria and a verification command.
5. Mark checkpoints: after every 2 or 3 tasks, the full test suite and build.
   - Check: `PLAN.md` holds checkpoint lines.
6. Show the plan to the user before coding when the work is larger than 3 tasks.
   - Check: the user approved, or the plan is 3 tasks or fewer.

## Task template

```markdown
## Task <N>: <short title>
- [ ] Status: todo
- Goal: <one sentence of behaviour>
- Files: `<path>`, `<path>`
- Acceptance: <testable condition>; <testable condition>
- Verify: `<exact test or build command>` -> <expected result>
- Depends on: <task numbers or none>
```

## Stop and ask the human if

- A requirement is ambiguous enough that two plans are possible (`ask-when-underspecified`).
- A task cannot get a verification command.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Task 1: the whole backend." | Too big to verify. Slice by behaviour. |
| "I will verify at the end." | Each task needs its own check; errors pile up otherwise. |
| "The plan is in my head." | It is lost at the next compaction. Write `PLAN.md`. |

## Definition of done

- [ ] `PLAN.md` exists, tasks ordered by dependency.
- [ ] Each task: goal, files, acceptance, exact verify command.
- [ ] Checkpoints placed; plan approved when over 3 tasks.

## References

- Skill `executing-plans`: carry out `PLAN.md` task by task.
- `references/SOURCE.md`: upstream and licence of this skill.
