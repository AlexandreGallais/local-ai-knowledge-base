---
name: estimation
description: "Manual: run only when the user explicitly asks for /estimation. Estimates a task in relative size with its risks and unknowns, stating every assumption."
metadata:
  id: PLN-08
  stars: "2"
  nature: process
  mode: A
  wave: V4
  load: manual
---

# Estimation

**Core rule:** an estimate is a range with its assumptions and unknowns, built from the task's breakdown, never a single number from intuition.

## Procedure

1. Break the work down (`task-breakdown`).
   - Check: tasks of comparable small size.
2. Size each task relative to a known reference task (S, M, L).
   - Check: each size names its reference.
3. List unknowns and risks; for each, its effect on the size.
   - Check: unknowns have a plan to reduce them (spike, question).
4. Give the result as a range (best and likely and worst) with assumptions.
   - Check: the assumptions are explicit lines.

## Stop and ask the human if

- The estimate depends on decisions not taken yet.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One number is clearer." | It hides the uncertainty. Give a range. |
| "Unknowns can be ignored." | They are where estimates fail. List them. |

## Definition of done

- [ ] Range with breakdown, references, assumptions, unknowns and risks.
