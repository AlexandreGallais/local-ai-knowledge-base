---
name: code-review
description: "Reviews a change on five axes - correctness, readability, architecture, security, performance - with a severity per finding, without editing files. Use when asked to review a merge request, a branch, a diff or /code-review, or before merging work written by someone else."
license: MIT
metadata:
  id: REV-02
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: auto+manual
---

# Code review

**Core rule:** review against the request and the repository's standards, report each finding with its location and severity, and change no file.

## Procedure

1. Get the change: `glab mr diff <iid>` for a merge request, or `git diff <base>...HEAD` for a branch.
   - Check: you have the full diff and the list of files.
2. Read the goal: the MR description, the linked issue or spec.
   - Check: you can state what the change must do.
3. Review each file on the five axes below.
   - Check: every file has been read in full in the diff.
4. Write each finding: `<severity> <file>:<line> - <problem> - <suggested fix>`.
   - Check: each finding has a location and a severity.
5. Run the tests and the build of the branch if you can.
   - Check: results quoted, or "not run" with the reason.
6. Give the verdict: approve, approve with comments, or changes requested.
   - Check: a Blocker or Major finding means changes requested.

| Axis | Look for |
| --- | --- |
| Correctness | the change does what the goal says; edge cases; error paths; tests that would fail on a bug |
| Readability | names, size of functions, comments that say why |
| Architecture | module boundaries, duplication, dependencies added |
| Security | input validation, injection, secrets, permissions (`secure-coding`) |
| Performance | loops over large data, N+1 queries, blocking calls |

| Severity | Meaning |
| --- | --- |
| Blocker | wrong behaviour, data loss, security hole |
| Major | likely bug or maintenance trap |
| Minor | readability or small improvement |
| Nit | taste; never blocks |

## Stop and ask the human if

- The goal of the change is unclear: review against what is written and say so.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will fix it myself." | A review reports; the author fixes. |
| "Looks good to me." | Without findings per axis, nothing was checked. |

## Definition of done

- [ ] Every file reviewed on the five axes; findings with location and severity.
- [ ] Verdict given; no file changed.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
