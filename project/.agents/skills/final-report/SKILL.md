---
name: final-report
description: "Ends every task with the same short report - done, not done, proof, assumptions, risks, next step. Use when a task is finished or stopped, when handing back to the user, before saying done, and when the user asks for a summary of what was changed."
metadata:
  id: MET-08
  stars: "4"
  nature: template
  mode: A
  wave: V1
  load: always
---

# Final report

**Core rule:** the report says what is proven done, what is not, and how you know; nothing in it is claimed without proof.

## When to use

- Use when: you finish or stop a task; the user asks what changed.
- Do not use when: you hand over unfinished long work for a later session (`session-handoff`).

## Procedure

1. Gather the proof: last test and build outputs, `git status`, `git log --oneline` of the task.
   - Check: each proof comes from a command run in this turn (`verification-before-completion`).
2. Fill the template, in the user's language, each section short.
   - Check: every section is present; empty ones say "none".
3. Label claims (`uncertainty-labeling`) and list out-of-scope ideas under Next (`scope-discipline`).
   - Check: assumptions and risks are in their own sections.

## Template

```markdown
## Done
- <change> (`<file>`), proof: `<command>` -> <result>
## Not done
- <item>, because <reason>
## Proof
- `<command>` -> <exit code, key line>
## Assumptions
- <assumed fact>
## Risks
- <what could break, where>
## Next
- <proposed next step or "Later" idea>
```

## Stop and ask the human if

- A requested item is not done and you cannot say why.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Everything is done, no need for Not done." | Write "none"; the reader then knows you checked. |
| "Proof: I checked it." | Proof is a command and its output. |

## Definition of done

- [ ] Six sections present: Done, Not done, Proof, Assumptions, Risks, Next.
- [ ] Every Done item has its proof from this turn.
