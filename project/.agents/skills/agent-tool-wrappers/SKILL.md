---
name: agent-tool-wrappers
description: "Manual: run only when the user explicitly asks for /agent-tool-wrappers. Runs a verbose command through a wrapper that saves the full output to a log and prints only the exit code, the error lines and the tail, so long outputs do not flood the context."
metadata:
  id: TOL-09
  stars: "3"
  nature: tooling
  mode: A
  wave: V2
  load: manual
---

# Agent tool wrappers

**Core rule:** run verbose commands through `scripts/run-compact.sh`, read its short summary, and open the full log only around the lines you need.

## When to use

- Use when: the user asks for `/agent-tool-wrappers`; a build, test or install prints hundreds of lines.
- Do not use when: the command prints a few lines.

## Procedure

1. Run the command through the wrapper from the project root: `bash .agents/skills/agent-tool-wrappers/scripts/run-compact.sh <command> [args...]`.
   - Check: the summary shows `exit=<code>`, the log path, the error lines and the last lines.
2. Read the error lines first; open the log around one of them with `read` and a line range, or `grep -n` in it.
   - Check: you quote the first real error with its line number in the log.
3. Set the number of tail lines with `TAIL=<n>` when needed: `TAIL=80 bash .../run-compact.sh npm test`.
   - Check: the summary shows the requested number of lines.

## What the wrapper prints

| Part | Content |
| --- | --- |
| Header | the command, `exit=<code>`, the log file path, the line count |
| Errors | up to 30 lines matching error, fail, panic, exception, traceback, with their line numbers |
| Tail | the last 40 lines (or `TAIL`) |

## Stop and ask the human if

- The command needs input from a terminal (interactive prompt).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The tail is enough." | The first error is often far above the tail. Read the error lines. |
| "Delete the log." | Keep it until the task ends; you may need other lines. |

## Definition of done

- [ ] Verbose commands ran through the wrapper; the first error quoted from the log.

## References

- `scripts/run-compact.sh`: the wrapper; logs go to `/tmp/agent-logs/`.
