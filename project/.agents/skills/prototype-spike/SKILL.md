---
name: prototype-spike
description: "Manual: run only when the user explicitly asks for /prototype-spike. Builds a throwaway prototype on its own branch to answer one technical or UI question, then writes down the conclusion."
license: MIT
metadata:
  id: PLN-09
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Prototype spike

**Core rule:** a spike answers one written question, lives on a `spike/` branch, and its conclusion is written; its code is never merged as is.

## Procedure

1. Write the question and how the answer will be judged.
   - Check: one question, one success criterion.
2. Branch: `git switch -c spike/<topic>`.
   - Check: `git branch --show-current` prints the spike branch.
3. Build the smallest thing that answers the question; skip tests, polish and error handling.
   - Check: the prototype runs and shows the answer.
4. Write the conclusion in `docs/spikes/<YYYY-MM-DD>-<topic>.md`: question, answer, evidence, what the real implementation needs.
   - Check: the note exists on the main working branch too (commit it there).
5. Leave the spike branch unmerged; say so in the report.
   - Check: no merge request from the spike branch.

## Stop and ask the human if

- The answer is ambiguous after the time agreed for the spike.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The prototype works, merge it." | It skipped tests and edge cases. Rebuild it properly. |
| "No need to write the conclusion." | The knowledge is lost with the branch. |

## Definition of done

- [ ] Question answered on a spike branch; conclusion written; nothing merged.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
