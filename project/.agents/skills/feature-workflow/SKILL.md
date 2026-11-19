---
name: feature-workflow
description: "Runs a feature or change from request to merge request - understand, plan, branch, increments, tests, commit, MR. Use when the user asks to add, implement, build or change a feature or a behaviour, or to take an issue from start to merge request."
metadata:
  id: DEV-01
  stars: "5"
  nature: process
  mode: A
  wave: V1
  load: auto
---

# Feature workflow

**Core rule:** no merge request before the tests and the build pass on your branch, with each step proven by a command.

## When to use

- Use when: a new behaviour, an issue to implement, a change across files.
- Do not use when: it is a bug with an unknown cause (`systematic-debugging` first), or a one-line fix.

## Procedure

1. Understand: restate the goal, the scope and the success check; ask what is missing (`ask-when-underspecified`).
   - Check: the restatement names the output and how to verify it.
2. Explore the code involved (`project-onboarding` the first time, then `grep` on the names).
   - Check: you can list the files to change.
3. Plan: for more than 3 steps, write `PLAN.md` (`task-breakdown`).
   - Check: each task has a verify command.
4. Branch from the up-to-date target: `git fetch origin`, then `git switch -c feat/<short-topic> origin/<target>`.
   - Check: `git branch --show-current` prints the new branch.
5. Build in verified slices (`incremental-steps`), tests with each slice (`unit-testing` if present).
   - Check: narrow tests green after each slice.
6. Run the project's full checks: tests, build, lint, type check (commands from `AGENTS.md`).
   - Check: each exits 0; outputs quoted.
7. Review your own diff (`self-review`).
   - Check: no debug code, no out-of-scope change, no secret.
8. Commit with the project's convention, push, open the merge request with `glab` (`merge-request-authoring` if present).
   - Check: `glab mr view` shows the MR; its pipeline is followed until green (`mr-pipeline-watch` if present).
9. Report (`final-report`).
   - Check: the report links the MR and quotes the checks.

## Stop and ask the human if

- The feature needs a design choice the request does not settle.
- A check fails three times on the same cause (`loop-breaker`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will branch later." | Commits on `main` break `git-safety`. Branch at step 4. |
| "Tests after the feature." | Untested slices pile up errors. Test each slice. |
| "Pushed, so done." | Done is a green pipeline and a report. |

## Definition of done

- [ ] Branch created from the up-to-date target; no commit on `main`.
- [ ] Tests, build, lint and type check green, outputs quoted.
- [ ] Self-review done; MR open; pipeline green; report written.
