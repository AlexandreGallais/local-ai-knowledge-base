---
name: task-runners
description: "Uses and maintains the project's single entry point for build, test and lint - Makefile, justfile or npm scripts. Use when looking for how to build, test or lint, when adding a common command, or when the same long command is typed again and again."
metadata:
  id: TOL-05
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Task runners

**Core rule:** run project tasks through the project's runner (`make`, `just`, `npm run`), and add new common tasks there rather than in your head.

## Procedure

1. Find the runner: `ls Makefile justfile package.json 2>/dev/null`, then list its tasks: `make help` or `grep -E '^[a-zA-Z_-]+:' Makefile`, `just --list`, `npm run`.
   - Check: you have the list of task names.
2. Use the task for build, test and lint instead of the raw command.
   - Check: the task's output shows the underlying command ran.
3. To add a task, follow the runner's style; one line of help per task.
   - Check: the new task appears in the list and runs.

| Runner | List tasks | Run |
| --- | --- | --- |
| make | `make help` (if defined) or read the targets | `make <target>` |
| just | `just --list` | `just <recipe>` |
| npm | `npm run` | `npm run <script>` |

## This installation

<!-- FILL: what=runner used by the project and its main tasks; find=ls Makefile justfile package.json and list their tasks; verify=build, test and lint tasks each run -->

<!-- FILL: what=whether just is installed; find=command -v just; verify=just --version prints a version, or note it is absent -->

## Stop and ask the human if

- No runner exists and adding one would change the team's workflow.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Run the raw command, it is the same." | Tasks often set flags and environment. Use the task. |
| "Makefile recipes can use spaces." | Make needs a tab before each recipe line. |

## Definition of done

- [ ] Tasks run through the runner; new common tasks added with help.

## Local completion checklist

- [ ] Runner and main tasks
- [ ] just availability
