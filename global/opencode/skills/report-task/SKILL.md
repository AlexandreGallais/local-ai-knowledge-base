---
name: report-task
description: Use when you finish, block or stop one task given by the orchestrator - the fixed form of the report you save with write_report.
---

# Report a task

You did one task. Your report is all the orchestrator reads. Save it with `work_write_report`, then answer
with the STATUS line only.

## Statuses

| Status | When |
| --- | --- |
| `DONE` | The check command of the task ends with 0 errors. |
| `DONE_WITH_CONCERNS` | Done, with 0 errors, and one thing the user should know. |
| `NEEDS_CONTEXT` | A fact you need is not in the task message. |
| `BLOCKED` | 3 failed runs on the same error, or the task is bigger than its text. |

## Form

```md
# Report T01

STATUS: DONE
TASK: T01 · <title>
FILES:
- <path> (created)
- <path> (changed)
CHECK: `<command>` -> exit 0, 0 errors
EVIDENCE:
<The last 5 lines of the output of the check command.>
NOTES:
- <3 lines at most: a decision or a concern.>
BLOCKER: none
```

For `BLOCKED` or `NEEDS_CONTEXT`: `BLOCKER: <what is missing or fails, what you tried, the exact error>`.

## Rules

- List only the files of the task. A file outside the task makes the report refused.
- Copy the evidence from the output of the command you ran now, never from memory.
- Write the statuses in capitals, as above. Never translate them.

## Example

Wrong: `STATUS: finished, everything works.` Right: `STATUS: DONE` with
`CHECK: \`npm run lint\` -> exit 0, 0 errors` and the last lines of that output under `EVIDENCE:`.

## Final check

- Did `work_write_report` accept the report?
- Is your answer the STATUS line only?
