---
name: human-step-wizard
description: "Manual: run only when the user explicitly asks for /human-step-wizard. Writes a guided Bash script that walks a human through steps only a person can do (logins, hardware, credentials), checking each step before the next."
license: MIT
metadata:
  id: TOL-10
  stars: "1"
  nature: process
  mode: R
  wave: V4
  load: manual
---

# Human step wizard

**Core rule:** the agent does every step it can; the wizard only covers the steps a person must do, and checks each one with a command before moving on.

## Procedure

1. List the steps and mark who does each: agent or human.
   - Check: only steps the agent cannot do are marked human.
2. Write `scripts/wizard-<topic>.sh` (`shell-scripting`): for each human step, print the instruction, wait for Enter, then run a check command.
   - Check: a failed check repeats the step instead of continuing.
3. Never ask the human to paste secrets into the script's output; read them with `read -s` into the environment only if needed.
   - Check: no secret is echoed or written to a file.
4. Give the human the command to run the wizard.
   - Check: the human ran it and every check passed.

## Stop and ask the human if

- A step involves credentials you would have to store.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Ask the human to do steps I could do." | Do them yourself; the wizard is for human-only steps. |
| "Trust that the human did it." | Check each step with a command. |

## Definition of done

- [ ] Wizard covers human-only steps, each verified by a check; no secret echoed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
