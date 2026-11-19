---
name: agents-md-authoring
description: "Writes and maintains the project's AGENTS.md - build and test commands, conventions, traps - short, factual and current. Use when AGENTS.md is missing, wrong or outdated, after discovering a project command or trap, or when the user says 'remember this for the project' about a fact rather than a procedure."
license: MIT
metadata:
  id: SKL-05
  stars: "4"
  nature: process
  mode: R
  wave: V1
  load: auto
---

# AGENTS.md authoring

**Core rule:** `AGENTS.md` holds only what the agent cannot find by looking: exact commands, unwritten conventions, traps. One fact per line, verified.

## When to use

- Use when: a command, convention or trap of this project must be remembered; `AGENTS.md` contradicts the code.
- Do not use when: the content is a procedure of several steps (write a skill with `writing-skills`), or a rule for every project (`CORE_RULES.md`).

## Procedure

1. Read the current `AGENTS.md` in full.
   - Check: you know its sections and its line count.
2. Verify the fact before writing it: run the command, open the config file.
   - Check: you have the command's output or the config line.
3. Put the fact in the right section: Project (subject, stack, versions), Commands (build, test, lint, run), Conventions, Traps.
   - Check: no other line already says the same thing.
4. Write one line, imperative, with the exact command in backticks.
   - Check: the line reads as an instruction, under 25 words.
5. Remove lines that are now false or that the environment already shows (a `package.json` script name is enough).
   - Check: every remaining command still runs.
6. Keep the copy of `CORE_RULES.md` in `AGENTS.md` identical to `.agents/skills/CORE_RULES.md`.
   - Check: the two blocks are identical.

## Line examples

Bad: "The project uses tests, which are important; please run them."

Good: "Run unit tests with `npm test -- --run`; the watch mode never ends."

## Stop and ask the human if

- A convention is not visible in any file: ask the human before writing it.
- `AGENTS.md` would pass 100 lines: propose moving procedures into skills.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "More context helps the agent." | Generic context costs tokens at every step and helps nothing. |
| "I will write what I expect the command to be." | Unverified commands mislead every later session. Run it first. |
| "I will explain the architecture at length." | Put a map in a doc and one line pointing to it. |

## Definition of done

- [ ] Every new line verified by a command or a file.
- [ ] No duplicate, no stale line, no procedure.
- [ ] The `CORE_RULES.md` copy is identical.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
