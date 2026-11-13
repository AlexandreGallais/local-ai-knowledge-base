---
name: plan-tasks
description: Use when you cut a brief into .agents/work/<subject>/tasks.md, or split a blocked task - the form of a task, its order, and the final check.
---

# Plan the tasks of a subject

## Steps

1. Read `.agents/work/<subject>/brief.md`. A small request without brief is its own brief.
2. Call `project_info`: the profile, its agents and its check commands.
3. List the files to create or change. Check with the `code` tools that each file or its folder exists.
4. Cut the work: one task is one behaviour that one command checks.
5. Order the tasks: a task comes after every task it depends on.
6. Write `tasks.md` in the form below. The last task is the final check, agent `checker`.
7. Call `check_tasks`. Fix every finding.

To split a blocked task: read its report with `read_status`, write 2 smaller tasks in its place with new
ids, keep the order of the others, then call `check_tasks`.

## Form

```md
# Tasks: <subject>

Brief: .agents/work/<subject>/brief.md

## T01 · <title>
- State: todo
- Agent: <an agent of the profile>
- Files: <path> (create), <path> (change)
- Depends: none
- Consumes: none
- Do: <2 to 6 short sentences.>
- Check: `<exact command>`
- Done when: <A fact a person can observe.>

## T99 · Final check
- State: todo
- Agent: checker
- Files: none
- Depends: all
- Consumes: none
- Do: Run format, lint, build and tests. Compare the changed files with the files of the tasks.
- Check: the four check commands of the profile
- Done when: The four commands end with 0 errors. Every changed file belongs to a task.
```

## Rules for one task

- 1 to 3 source files plus their tests, with exact paths.
- One agent of the profile; one exact check command that runs from the project root and ends alone.
- `Do` names each file, function and type. `Consumes` gives the names and signatures from earlier tasks.
- `Done when` is a fact, never "it works".
- Never write "etc.", "as needed", "if necessary", "similar to" or "TBD".
- A task that needs a choice of the user is not ready: report `BLOCKED` with that choice.

## Example

Wrong: `- Do: Write the store and the rest as needed.` Right: `- Do: Write user-list.store.ts with
withUsers() and withSelection(). Add loadUsers(): void that calls UserApi.getUsers().`

## Final check

- Does every task have its files, its agent, its check command and its `Done when`?
- Is the final check the last task?
- Does `check_tasks` say "tasks.md is well formed."?
