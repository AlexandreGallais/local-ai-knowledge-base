---
name: time-boxing
description: "Sets a budget of attempts per sub-task and, when it is spent, stops to summarise the state and ask for a decision. Use when starting an uncertain sub-task (investigation, flaky fix, unfamiliar tool), when work on one point has taken many steps, or when progress has slowed."
metadata:
  id: MET-14
  stars: "2"
  nature: guardrail
  mode: A
  wave: V3
  load: auto
---

# Time boxing

**Core rule:** each uncertain sub-task gets a budget of steps written at its start; when the budget is spent, stop and ask.

## Rules

1. At the start of an uncertain sub-task, write its budget: 10 tool calls by default, 20 for an investigation.
   - Check: the budget is in your reply.
2. Count calls against it in your replies (`step 6/10 on <sub-task>`).
   - Check: the count is visible.
3. When the budget is spent, stop and write: goal, what was tried, what was learned, two options to continue.
   - Check: the summary is sent with the `question` tool.
4. Continue only with the human's choice, with a new budget.
   - Check: the new budget is written.

## Stop and ask the human if

- The budget is spent (rule 3).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I am close, a few more tries." | That thought is the reason for the budget. |
| "The budget is for slow models." | Every model drifts on open-ended tasks. |

## Definition of done

- [ ] Each uncertain sub-task had a written budget; overruns ended with a summary and a decision.
