---
name: parallel-investigation
description: "Investigates two or more independent hypotheses in parallel (separate sub-agents or sessions), then compares their findings. Use when several independent causes or options must be checked and each needs much reading, and the harness offers a subagent tool or fresh sessions."
license: MIT
metadata:
  id: ORC-03
  stars: "1"
  nature: process
  mode: R
  wave: V4
  load: auto
---

# Parallel investigation

**Core rule:** only independent questions go in parallel, each with a self-contained brief and the same report format; you compare and verify the findings yourself.

## Procedure

1. List the hypotheses and check that they share no state or order.
   - Check: each can be answered without the others.
2. Write one brief per hypothesis (`subagent-delegation` template), with the same report format.
   - Check: each brief is self-contained.
3. Launch them with the `subagent` tool if offered, else as fresh sessions (`opencode run`); without either, investigate one after the other.
   - Check: every report came back.
4. Compare the reports in a table: hypothesis, evidence for, evidence against, verdict.
   - Check: each verdict cites evidence.
5. Verify the winning finding yourself.
   - Check: your own command reproduces it.

## Stop and ask the human if

- The findings contradict each other and no evidence settles it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Parallelise dependent steps." | They then work on wrong assumptions. Keep them sequential. |
| "Trust the most confident report." | Verify; confidence is not evidence. |

## Definition of done

- [ ] Independent hypotheses briefed alike; reports compared; the conclusion verified.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
