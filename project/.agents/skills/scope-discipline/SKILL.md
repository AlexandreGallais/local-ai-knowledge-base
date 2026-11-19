---
name: scope-discipline
description: "Keeps every change inside what was asked - no opportunistic refactor, rename, reformat or extra feature. Use when about to touch a file or a function the request did not name, to clean up, reformat, rename or upgrade something on the way, or when the diff grows beyond the task."
metadata:
  id: MET-05
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: always
---

# Scope discipline

**Core rule:** change only what the request needs; write every other idea in a "Later" list instead of doing it.

## Rules

1. Before editing a file, name the requirement it serves.
   - Check: each changed file maps to a line of the request or of `PLAN.md`.
2. Leave code you were not asked to change as it is: no rename, reformat, comment removal, dependency upgrade or dead-code deletion.
   - Check: `git diff` holds no line unrelated to the task.
3. Write each idea outside the scope as one line under "Later" in your report.
   - Check: the report has a "Later" list, or says "none".
4. When the request truly needs a wider change, ask before widening.
   - Check: the human approved the larger scope.

## Example

Bad: asked to fix a null check, the agent also renames three variables and reformats the file.

Good: the diff changes the null check and adds its test; the report says "Later: the variable names in `parse()` are unclear."

## Stop and ask the human if

- The fix cannot work without changing another module or a public API.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "While I am here, I will clean this." | It hides the real change and can break other code. |
| "This code looks unused." | Deleting needs an explicit yes (`destructive-action-gate`). |
| "The formatter changed the whole file." | Format only the lines you touched, or ask. |

## Definition of done

- [ ] Every changed line serves the request.
- [ ] Out-of-scope ideas listed under "Later", not done.
