---
name: domain-modeling
description: "Manual: run only when the user explicitly asks for /domain-modeling. Builds the domain model of a project - terms, entities, aggregates, invariants - and records it in a glossary and decisions shared by code and business."
license: MIT
metadata:
  id: ARC-06
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Domain modeling

**Core rule:** one term, one meaning, used the same way in code, tests and conversations; invariants are written and enforced in code.

## Procedure

1. Collect the terms used in code (types, tables, endpoints) and by the user.
   - Check: a list with where each term appears.
2. Find conflicts: one word for two things, two words for one thing.
   - Check: each conflict is listed with examples.
3. Ask the human to settle each conflict and define each term in one sentence.
   - Check: every term has an approved definition.
4. Name the entities, their identity, the aggregates that change together, and the invariants (rules that must always hold).
   - Check: each invariant is testable.
5. Write `GLOSSARY.md` (or the project's file) and an ADR for structural choices (`adr-writing`).
   - Check: files written; invariants have tests or are listed as missing tests.

## Stop and ask the human if

- At step 3: definitions belong to the business.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Pick the most common word." | The business decides the word; code follows. |
| "Invariants are obvious." | Unwritten invariants get broken by the next change. |

## Definition of done

- [ ] Glossary with approved definitions; conflicts settled; invariants listed and tested.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
