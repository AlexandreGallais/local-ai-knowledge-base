---
name: finishing-a-branch
description: "Runs the checklist before a merge request - rebase on the target, tests, lint, clean history, description - and ends with a ready MR. Use when the implementation on a branch is complete, when the user says 'wrap it up', 'ready for review' or 'finish the branch', or before marking a draft MR as ready."
license: MIT
metadata:
  id: GIT-08
  stars: "4"
  nature: process
  mode: R+B
  wave: V2
  load: auto
---

# Finishing a branch

**Core rule:** a branch is finished only when it is up to date with its target, its full checks are green, and its MR says how to test it.

## Procedure

1. Run the full test suite, build and lint.
   - Check: all exit 0; if not, stop and report the failures.
2. Update from the target: `git fetch origin`, then `git rebase origin/<target>` (`merge-conflicts` if needed).
   - Check: `git log --oneline origin/<target>..HEAD` shows only this branch's commits.
3. Run the checks again after the rebase.
   - Check: all exit 0.
4. Clean the history if needed (`history-cleanup`).
   - Check: no `wip` or `fixup!` commit left.
5. Push: `git push --force-with-lease` only if the rebase rewrote pushed commits, after the human's yes; otherwise `git push`.
   - Check: the push is accepted.
6. Complete the MR description (`merge-request-authoring`) and follow the pipeline (`mr-pipeline-watch`).
   - Check: pipeline green; MR marked ready: `glab mr update <iid> --ready`.

## This installation

<!-- FILL: what=full check commands of the project (tests, build, lint); find=AGENTS.md, package.json scripts, Makefile, .gitlab-ci.yml; verify=each command exits 0 on the default branch -->

<!-- FILL: what=team rule on rebase versus merge before MR; find=CONTRIBUTING.md and the last merged MRs (glab mr list --merged); verify=the rule matches the history of the target branch -->

## Stop and ask the human if

- The rebase has conflicts whose intent you cannot establish, or a force push is needed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Tests passed before the rebase." | The rebase changes the code under them. Run again. |
| "Mark ready while the pipeline runs." | Ready means green. Wait for it. |

## Definition of done

- [ ] Branch rebased on the up-to-date target; checks green after the rebase.
- [ ] History clean; MR described; pipeline green; MR ready.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] Full check commands
- [ ] Rebase or merge rule
