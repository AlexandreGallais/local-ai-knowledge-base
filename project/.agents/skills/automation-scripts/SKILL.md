---
name: automation-scripts
description: "Turns a task done by hand more than twice into a documented, tested script. Use when the user asks to automate something or /automation-scripts, when you repeat the same sequence of commands, or when a manual procedure in a README could be one command."
metadata:
  id: TOL-04
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto+manual
---

# Automation scripts

**Core rule:** a script replaces a manual procedure only when it is idempotent, prints what it does, and has a usage line and a test run.

## Procedure

1. Write the manual steps as they are done today, with their exact commands.
   - Check: running them by hand once gives the expected result.
2. Choose the language: Bash for chaining commands (`shell-scripting`), Python or the project's language for logic or data.
   - Check: the choice matches what the project already uses in `scripts/`.
3. Write the script in `scripts/<verb-object>` with a header comment, arguments, `--help`, and a dry-run option for anything that changes state.
   - Check: `scripts/<name> --help` prints usage.
4. Make it idempotent and fail fast with a clear message.
   - Check: two runs in a row succeed; a missing input exits non-zero with a message.
5. Test it on a sample (temporary folder, fixture data).
   - Check: the expected output appears; nothing outside the sample changed.
6. Document it: one line in `README.md` or `AGENTS.md` with the command.
   - Check: the line exists.

## Stop and ask the human if

- The script would touch shared systems (GitLab settings, registries, databases).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "A quick script without --help." | Nobody, you included, will remember its arguments. |
| "Test it on the real data." | Test on a sample first; real data has no undo. |

## Definition of done

- [ ] Script with header, `--help`, dry run, idempotent, fail-fast.
- [ ] Tested on a sample; documented in one line.
