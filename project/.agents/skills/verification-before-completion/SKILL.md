---
name: verification-before-completion
description: "Forbids any claim that work is done, fixed or passing without fresh proof from this turn. Use when about to say done, fixed, works, tests pass or build is green, before a commit, a push or a merge request, and before moving to the next task."
license: MIT
metadata:
  id: MET-02
  stars: "5"
  nature: guardrail
  mode: R
  wave: V0
  load: always
---

# Verification before completion

**Core rule:** no claim of done, fixed or passing without proof produced in this turn: command output, green test, file read back after writing.

## Gate

1. Name the command that proves the claim (test, build, lint, `git status`, `read`).
   - Check: you can write the exact command.
2. Run the full command now with the `shell` tool, not a partial one.
   - Check: you have its output and exit code from this turn.
3. Read the output: exit code, number of failures, warnings treated as errors.
   - Check: you can quote the line that shows success or failure.
4. State the real status, with the evidence line.
   - Check: your reply quotes the command and its result.

| Claim | Proof required | Not proof |
| --- | --- | --- |
| Tests pass | Test run with 0 failures, exit 0 | An older run, "should pass" |
| Build works | Build command, exit 0 | Lint passing, code "looks right" |
| Bug fixed | The original symptom reproduced and now gone | Code changed |
| File written | `read` on the file after writing | The write tool returned |
| Requirements met | Each requirement checked one by one | Tests passing |

## Stop and ask the human if

- The proving command cannot run here (missing tool, no network, no rights). Say what is unverified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It should work now." | Run it. No output, no claim. |
| "The linter passed." | A linter does not compile or test. |
| "I ran it earlier." | Earlier is stale. Run it again. |
| "Great, done!" | Satisfaction before evidence is a false claim. |

## Definition of done

- [ ] The proving command ran in this turn and its result is quoted.
- [ ] Anything not verified is listed as not verified.
- [ ] No claim of done, fixed or passing without that proof.
