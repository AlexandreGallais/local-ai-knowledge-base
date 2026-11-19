---
name: large-work-map
description: "Manual: run only when the user explicitly asks for /large-work-map. Plans a very large piece of work as a shared map of decision issues on GitLab, resolved one at a time until the path is clear."
license: MIT
metadata:
  id: ORC-05
  stars: "1"
  nature: process
  mode: R
  wave: V4
  load: manual
---

# Large work map

**Core rule:** the map lives in GitLab issues, not in your context; each open decision is its own issue, resolved one at a time.

## Procedure

1. Write the destination: what is true when the work is done.
   - Check: one paragraph approved by the human.
2. List the decisions that block the way, each as one question.
   - Check: each question has its dependencies.
3. Create one issue per decision with a common label and a parent issue listing them (after the human's yes).
   - Check: `glab issue list --label <label>` shows them.
4. Resolve the decisions whose prerequisites are settled, one per session (`grill-me`, `research-to-notes`, `prototype-spike`).
   - Check: each resolved issue holds its decision and is closed.
5. When no decision blocks, turn the map into implementation issues (`plan-to-issues` when finished).
   - Check: the parent issue links them.

## Stop and ask the human if

- At step 3, before creating issues, and for every decision.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Keep the map in a note." | Others cannot see or update it. Use the tracker. |
| "Decide several at once." | Later decisions depend on earlier ones. |

## Definition of done

- [ ] Destination agreed; decisions tracked as issues; resolved in order; implementation issues created.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
