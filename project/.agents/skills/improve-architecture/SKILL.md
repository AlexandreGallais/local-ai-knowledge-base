---
name: improve-architecture
description: "Manual: run only when the user explicitly asks for /improve-architecture. Scans a codebase for useful restructurings (deepening modules, removing coupling), ranks them by value and cost, and proposes them before any change."
license: MIT
metadata:
  id: ARC-03
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Improve architecture

**Core rule:** propose and rank; change nothing until the human picks an item.

## Procedure

1. Map the code (`architecture-mapping`).
   - Check: module table and dependencies exist.
2. Find candidates: shallow modules, cycles between modules, duplicated logic, modules that change together, hard-to-test areas.
   - Check: each candidate has its evidence (imports, git log of co-changes, test setup size).
3. Rate each: value (what gets easier), cost (files touched, risk), first step.
   - Check: a ranked table.
4. Present the table and let the human choose.
   - Check: one item is chosen, or none.
5. For the chosen item, plan it (`task-breakdown`) and refactor safely (`safe-refactoring`).
   - Check: tests green at each step.

## Stop and ask the human if

- Always, at step 4: the choice is the human's.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Start fixing the obvious ones." | Restructuring without a choice wastes review time and risks conflicts. |
| "Evidence is not needed, it is clear." | Co-change history and imports prove coupling; opinions do not. |

## Definition of done

- [ ] Ranked list with evidence presented; no change before the human's choice.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
