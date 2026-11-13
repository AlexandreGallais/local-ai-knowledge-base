---
name: final-check
description: Use when you run the final check of a subject - the four check commands, the changed files, and the report that allows "done".
---

# Run the final check

## Steps

1. Call `project_info`: the four check commands, in order: format, lint, build, tests.
2. Run them in this order. Run all four, even after a failure.
3. For each command keep the command, its exit code, its number of errors and its first 20 error lines.
4. Run `git status --short`. Compare each changed file with the `Files` of the tasks in
   `.agents/work/<subject>/tasks.md`. Name every file that no task owns.
5. Write the report with `work_write_report` and the skill `report-task`.
6. `DONE` only when the four commands end with 0 errors and every changed file belongs to a task.
   Otherwise `BLOCKED`: for each error, the file and the task that owns it.

## Rules

- Never edit a file. Never fix code.
- Never write `DONE` from memory: run the commands now.
- Never shorten an error message: copy it.

## Example

Wrong: `STATUS: DONE` after the lint only. Right: four lines under `EVIDENCE:`, one per command, each
with "exit 0, 0 errors", and `git status --short` showing only files of the tasks.

## Final check

- Did all four commands run now?
- Does every changed file belong to a task?
