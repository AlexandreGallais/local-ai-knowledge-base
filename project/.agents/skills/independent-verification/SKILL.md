---
name: independent-verification
description: "Has a result checked by a fresh agent or session that did not see the implementation, from the spec and the code only. Use when a change is high-stakes (security, data migrations, irreversible operations), when your own review could share your blind spots, or when the user asks for a second opinion."
license: MIT
metadata:
  id: ORC-02
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: auto
---

# Independent verification

**Core rule:** the verifier gets the goal, the diff and the checks, not your reasoning, and its findings are answered one by one.

## Procedure

1. Prepare the package: the goal or spec, `git diff <base>...HEAD > /tmp/verify.diff`, the commands to run.
   - Check: the package holds no explanation of your choices.
2. Run the verifier: the `subagent` tool if available, else a fresh session `opencode run "<request referring to /tmp/verify.diff>"`; ask for findings with severity.
   - Check: a findings list comes back.
3. Answer each finding: fix with a test, or reject with evidence.
   - Check: every finding has an answer.
4. Report the verification and its outcome.
   - Check: the report lists findings and answers.

## Stop and ask the human if

- No fresh agent or session is available: say the verification is a self-review only.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Explain my reasoning to the verifier." | It then shares your blind spots. Give only the goal and the diff. |
| "Ignore findings that seem minor." | Answer each; let the human decide on deferrals. |

## Definition of done

- [ ] Fresh verification run; every finding fixed or rejected with evidence.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
