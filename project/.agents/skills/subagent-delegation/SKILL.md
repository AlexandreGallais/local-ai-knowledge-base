---
name: subagent-delegation
description: "Delegates an isolated sub-task to a fresh agent with a self-contained brief and a fixed report format. Use when a sub-task is independent and well specified, when its reading would flood your context, or when the user asks to delegate; only if the harness offers a subagent tool or a fresh non-interactive session."
license: MIT
metadata:
  id: ORC-01
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Subagent delegation

**Core rule:** the delegate knows only what the brief says; the brief holds the goal, the files, the limits, the check and the report format, and you verify the result yourself.

## Procedure

1. Check the means: the `subagent` tool if this harness offers it; otherwise a fresh session with `opencode run "<brief>"`.
   - Check: one of the two is available; if neither, do the task yourself.
2. Write the brief in a file `/tmp/brief-<task>.md` (template below).
   - Check: someone with no context could do the task from it alone.
3. Launch one delegate at a time and wait for its report.
   - Check: the report follows the format.
4. Verify the result yourself: read the diff, run the check of the brief.
   - Check: the check passes in your own run.

## Brief template

```markdown
# Task: <one line>
## Goal
<what must be true at the end>
## Files you may change
- <paths>
## Do not
- <limits: no other files, no installs, no pushes>
## Check
`<command>` -> <expected result>
## Report format
Status: done | blocked
Files changed: <list>
Check output: <last lines>
Notes: <assumptions, problems>
```

## Stop and ask the human if

- The sub-task needs decisions that are not in the brief.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It reported success." | Verify with the check; reports can be wrong. |
| "The delegate knows our conversation." | It knows only the brief. |

## Definition of done

- [ ] Brief self-contained; report in format; result verified by your own run.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
