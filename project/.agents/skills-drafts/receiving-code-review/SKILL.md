---
name: receiving-code-review
description: "Handles review comments on a merge request - verify each comment against the code before accepting, fix, reply, resolve threads with glab. Use when an MR has review comments or requested changes, when the user says 'address the review' or 'fix the comments', or when a reviewer's suggestion seems wrong."
license: MIT
metadata:
  id: REV-03
  stars: "4"
  nature: process
  mode: R+B
  wave: V2
  load: auto
---

# Receiving code review

**Core rule:** verify each comment against the code before changing anything; agree with evidence or disagree with reasons, never by reflex.

## Procedure

1. Read every comment of the MR: `glab mr view <iid> --comments`.
   - Check: you have the full list with file and line.
2. Restate each comment as a technical requirement; mark the unclear ones.
   - Check: unclear comments are asked about before any change.
3. Verify each one against the code: does the problem exist here?
   - Check: each comment is marked valid (with evidence) or not (with the reason).
4. Fix valid comments one at a time, each with its test when it is a behaviour change.
   - Check: tests green after each fix.
5. Reply on each thread: what changed (commit hash) or why not; then resolve it when the team's rule allows.
   - Check: every thread has a reply.
6. Push and follow the pipeline (`mr-pipeline-watch`).
   - Check: pipeline green.

## This installation

<!-- FILL: what=glab commands to list, reply to and resolve discussions in this glab version; find=glab mr view --help and glab mr note --help; verify=a reply is posted on a test discussion and appears in glab mr view -->

<!-- FILL: what=team rule on who resolves a thread (author or reviewer); find=CONTRIBUTING.md or ask the human; verify=the rule is written here -->

## Stop and ask the human if

- A comment asks for a design change beyond the MR's scope.
- You disagree with a comment and the reviewer insists.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "You are right, fixing now!" | Check first; reviewers can be wrong about this code. |
| "Fix the clear ones, ask about the rest later." | Comments are often linked; clarify first. |

## Definition of done

- [ ] Every comment verified, fixed or answered with reasons.
- [ ] Every thread replied to; tests and pipeline green.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] glab discussion commands
- [ ] Thread resolution rule
