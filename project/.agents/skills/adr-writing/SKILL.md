---
name: adr-writing
description: "Records an architecture decision as an ADR - context, options, decision, consequences - in the repository. Use when the user asks for an ADR or /adr-writing, when a choice of library, structure, protocol or data format is made, or when a decision is reversed or superseded."
license: MIT
metadata:
  id: ARC-04
  stars: "3"
  nature: template
  mode: R
  wave: V2
  load: auto+manual
---

# ADR writing

**Core rule:** one decision per ADR, numbered, never rewritten after acceptance: a new ADR supersedes an old one.

## Procedure

1. Find the ADR folder and the last number: `ls docs/adr docs/decisions 2>/dev/null`.
   - Check: you know the folder and the next number (or create `docs/adr/` with `0001`).
2. Write `NNNN-<short-title>.md` from the template, status `Proposed`.
   - Check: context, at least two options and consequences are filled.
3. Ask the human to accept or reject it.
   - Check: the status is `Accepted` or `Rejected` with the date.
4. If it replaces an older ADR, set the old one's status to `Superseded by NNNN` and link both.
   - Check: both files link each other.

## Template

```markdown
# NNNN. <Decision title>
- Status: Proposed | Accepted | Rejected | Superseded by NNNN
- Date: <YYYY-MM-DD>
## Context
<forces, constraints, what triggered the decision>
## Options
1. <option>: pros, cons
2. <option>: pros, cons
## Decision
<the chosen option, in one paragraph>
## Consequences
<what becomes easier, harder, what must change>
```

## Stop and ask the human if

- The decision is not the agent's to take: write it as Proposed and wait.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Edit the old ADR." | History is the point. Supersede it. |
| "One option is enough." | Without alternatives, readers cannot see why. |

## Definition of done

- [ ] ADR numbered, with context, options, decision, consequences and a status set by the human.
- [ ] Superseded ADRs linked.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
