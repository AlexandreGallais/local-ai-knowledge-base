---
name: session-retro
description: "Manual: run only when the user explicitly asks for /session-retro. Runs a short retrospective of a work session - what worked, what failed, and which skill or AGENTS.md line to add or change."
license: MIT
metadata:
  id: MET-15
  stars: "2"
  nature: process
  mode: R
  wave: V4
  load: manual
---

# Session retro

**Core rule:** every lesson ends as a concrete proposal (a line in AGENTS.md, a change to a named skill, a new skill) or is dropped.

## Procedure

1. List what happened: tasks done, failures, loops, wrong assumptions, wasted steps (from the conversation and `git log`).
   - Check: each item is a fact with its evidence.
2. Sort into worked, failed, wasted.
   - Check: three short lists.
3. For each failure or waste, propose the smallest durable fix: a line in `AGENTS.md`, a change to a named skill, a new skill, a script.
   - Check: each proposal names the file to change.
4. Present the proposals; apply only those the human approves (`agents-md-authoring`, `writing-skills`).
   - Check: approved changes made and checked.

## Stop and ask the human if

- At step 4: the human chooses what to change.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Lessons: be more careful." | Not actionable. Name the file and the line. |
| "Change many skills at once." | Small changes are easier to test and revert. |

## Definition of done

- [ ] Facts sorted; proposals tied to files; approved ones applied.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
