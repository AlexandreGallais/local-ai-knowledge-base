---
name: pipeline-failure-triage
description: "Reads the log of a failed GitLab CI job, classifies the cause (code, environment, infrastructure, flaky), proposes a fix and applies it after approval. Use when a pipeline or a job is red, when the user says 'CI fails' or 'the MR is red', or when glab ci status shows failed."
license: Apache-2.0
metadata:
  id: GL-04
  stars: "5"
  nature: process
  mode: R+B
  wave: V1
  load: auto
---

# Pipeline failure triage

**Core rule:** read the failing job's log and classify the cause before changing anything; change code only after the human approves the plan.

## Procedure

1. Find the failed jobs: `glab ci get --merge-request=<iid> --status=failed --with-job-details`, or `glab ci status` for the current branch.
   - Check: you have each failed job's name and ID.
2. Read the end of each failed job's log: `glab ci trace <job-id> > /tmp/job-<job-id>.log`, then `tail -n 80 /tmp/job-<job-id>.log` and `grep -n -E 'error|Error|FAIL|failed' /tmp/job-<job-id>.log | head -n 30`.
   - Check: you can quote the first real error line.
3. Classify with the table below.
   - Check: one class is chosen, with the line that shows it.
4. For a code cause, reproduce it locally with the job's command in the job's image (`ci-local-reproduction` if present).
   - Check: the local run fails the same way.
5. Write the plan: cause, class, fix, how it will be verified. Ask for approval with the `question` tool.
   - Check: the human approved.
6. Apply the fix, push, follow the new pipeline (`mr-pipeline-watch` if present).
   - Check: the job that failed is now green.

| Class | Typical log signs | Action |
| --- | --- | --- |
| Code | test assertion, compile error, lint error | fix the code; never weaken the test |
| Environment | `command not found`, missing variable, wrong version | fix `.gitlab-ci.yml` or the image, with approval |
| Infrastructure | runner lost, `no space left on device`, registry timeout | retry once: `glab ci retry <job-id>`; then tell the human |
| Flaky | passes on retry, timing, order | report it (`flaky-tests` if present); do not hide it |

## This installation

<!-- FILL: what=runner tags and executors used by the project; find=grep -n 'tags:' .gitlab-ci.yml and glab ci get --with-job-details; verify=the failed job's runner appears in the job details -->

<!-- FILL: what=where job artefacts and reports are kept; find=grep -n -A5 'artifacts:' .gitlab-ci.yml; verify=glab job artifact <ref> <job-name> downloads them, or the artefact path exists in the job log -->

## Stop and ask the human if

- The cause is in infrastructure or in a protected CI variable.
- The fix needs to disable a job, a test or a security scan.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Retry until it passes." | One retry for infrastructure only. A second red is a cause. |
| "Skip the failing test in CI." | That hides the bug. Ask first. |

## Definition of done

- [ ] Cause classified with the quoted log line.
- [ ] Fix approved, applied, and the failed job green; no test weakened.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] Runner tags and executors
- [ ] Artefacts and reports location
