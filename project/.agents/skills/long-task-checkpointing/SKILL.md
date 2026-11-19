---
name: long-task-checkpointing
description: "Keeps a long task recoverable - committed checkpoints, state written in HANDOFF.md or PLAN.md, resume after a context cut. Use when a task will take many steps or several sessions, after the context was compacted or the session restarted, or when you notice you no longer remember earlier steps."
metadata:
  id: ORC-04
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Long-task checkpointing

**Core rule:** after each verified step, the state lives on disk (commit plus `PLAN.md` or `HANDOFF.md`), never only in the conversation.

## Procedure

1. At the start of a long task, write or read `PLAN.md` (`task-breakdown`).
   - Check: the plan file exists with statuses.
2. After each verified step, commit and update the plan status in the same turn.
   - Check: `git log -1` and the plan agree on the last done step.
3. Every few steps, or before a risky one, refresh `HANDOFF.md` (`session-handoff`).
   - Check: its "Next" section names the next command.
4. After a context cut or a restart, rebuild state from disk: `PLAN.md`, `HANDOFF.md`, `git log --oneline -15`, `git status`.
   - Check: you name the next step without relying on memory.
5. Never redo a step whose commit exists; verify it instead.
   - Check: no duplicate commit for the same step.

## Stop and ask the human if

- The disk state and your memory disagree and you cannot tell which is right.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will write the state at the end." | A cut can come at any step. Write it after each one. |
| "I remember what I did." | After compaction you remember a summary. Trust the files and the log. |

## Definition of done

- [ ] Each verified step committed and recorded in the plan.
- [ ] A fresh session could resume from the files alone.
