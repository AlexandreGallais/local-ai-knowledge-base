---
name: writing-for-agents
description: "Writes instructions for another agent or a system prompt - context, goal, constraints, expected output format - short and checkable. Use when writing a brief for a sub-agent or a fresh session, a system prompt, a custom command, or any text an AI will follow."
license: MIT
metadata:
  id: SKL-09
  stars: "2"
  nature: reference
  mode: R
  wave: V3
  load: auto
---

# Writing for agents

**Core rule:** the reader has no context but your text: give the goal, the limits, the check and the output format, and nothing it would do right anyway.

## Procedure

1. Write the goal as an outcome that can be checked.
   - Check: one sentence with a verifiable end state.
2. Give only the context it cannot find: decisions taken, traps, file paths; point to files instead of copying them.
   - Check: no paragraph the reader could get with one command.
3. State the limits: what not to touch, what not to run.
   - Check: limits are explicit lines.
4. Give the check and the output format.
   - Check: the reader knows how to prove done and how to report.
5. Remove no-ops: sentences that would not change its behaviour.
   - Check: each remaining sentence changes what the reader does.

| Prefer | Over |
| --- | --- |
| "Run `npm test`; report the failing test names." | "Make sure everything works." |
| "Write one-line comments." | "Do not write long comments." |
| Steps with a check each | Long paragraphs |

## Stop and ask the human if

- The goal or the limits are not clear to you.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "More detail is safer." | Long prompts dilute the important lines. |
| "It will ask if unsure." | Agents guess. Say what to do when blocked. |

## Definition of done

- [ ] Goal, needed context, limits, check and output format present; no-ops removed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
