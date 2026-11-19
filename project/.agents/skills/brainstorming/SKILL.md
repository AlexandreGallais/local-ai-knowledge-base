---
name: brainstorming
description: "Manual: run only when the user explicitly asks for /brainstorming. Explores several design options for a problem, compares them on explicit criteria and converges on one before any implementation."
license: MIT
metadata:
  id: PLN-07
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Brainstorming

**Core rule:** at least three real options, compared on criteria agreed first, and no code until the human picks one.

## Procedure

1. Restate the problem and the constraints; ask what is unclear.
   - Check: the human agrees with the restatement.
2. Agree on 3 to 5 criteria (effort, risk, fit with the code, performance, maintenance).
   - Check: criteria are listed before any option.
3. Generate at least three different options, including the simplest one.
   - Check: options differ in approach, not in detail.
4. Compare them in a table on the criteria, with evidence from the code where possible.
   - Check: each cell has a short reason.
5. Recommend one, say why and what would change your mind; let the human decide.
   - Check: the human chose.

## Stop and ask the human if

- At step 5: the choice is the human's.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The first idea is good enough." | Without alternatives you cannot know. |
| "Skip the criteria." | Then the comparison follows your preference. |

## Definition of done

- [ ] Problem agreed; criteria first; three options compared; human chose.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
