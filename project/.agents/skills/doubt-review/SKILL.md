---
name: doubt-review
description: "Cross-examines a non-trivial decision before committing to it - why would this be wrong, what was assumed, what would prove it. Use when about to take an irreversible step, a security-sensitive change, a migration, a design choice in unfamiliar code, or when you feel sure without having checked."
license: MIT
metadata:
  id: MET-13
  stars: "3"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Doubt review

**Core rule:** before a decision that is costly to undo, write the strongest case against it and check the weakest assumption with a command or a document.

## Procedure

1. State the decision and its reason in two lines.
   - Check: the reason names the evidence it rests on.
2. List the assumptions it depends on.
   - Check: at least three, each falsifiable.
3. Argue against it: how could it fail, what case breaks it, what would a sceptical reviewer say?
   - Check: at least two concrete failure scenarios.
4. Test the weakest assumption: run a command, read the doc section, write a quick test.
   - Check: the assumption is confirmed or refuted with evidence.
5. Decide: go on, change the decision, or ask the human.
   - Check: the decision and the evidence are written in your report.

## Stop and ask the human if

- The weakest assumption cannot be checked and the decision is irreversible.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I am confident." | Confidence is cheap to test now and costly to debug later. |
| "Argue against it lightly." | Find a concrete case that breaks it, or say none was found. |

## Definition of done

- [ ] Assumptions listed; strongest objections written; weakest assumption tested.
- [ ] Decision kept, changed or escalated, with evidence.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
