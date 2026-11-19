---
name: mr-pipeline-watch
description: "Follows the pipeline of a merge request after a push until it ends, and reports the result. Use when you pushed to a branch with a merge request, before saying the work is done, or when asked whether CI passed."
metadata:
  id: GL-13
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# MR pipeline watch

**Core rule:** after a push, the work is not done until its pipeline has ended green; you check it, you do not assume it.

## Procedure

1. After the push, wait for the pipeline to finish: `glab ci status --wait`.
   - Check: the command returns with a final status.
2. Read the status of the jobs: `glab ci get --with-job-details` (or `--merge-request=<iid>`).
   - Check: every job is success, or you have the failed ones' IDs.
3. On failure, switch to `pipeline-failure-triage` with the failed job IDs.
   - Check: the triage skill is announced.
4. On success, report the pipeline ID and status in the final report.
   - Check: the report quotes them.

## This installation

<!-- FILL: what=typical pipeline duration of the project; find=glab ci list and compare created and finished times of the last 5 pipelines; verify=the duration range is written here -->

<!-- FILL: what=jobs allowed to fail or manual by design; find=grep -n -E 'allow_failure|when: manual' .gitlab-ci.yml; verify=those jobs are listed here so they are not reported as failures -->

## Stop and ask the human if

- The pipeline stays pending (no runner) longer than twice its usual duration.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Pushed, so done." | Done is a green pipeline. |
| "A manual job is a failure." | Manual and allowed-to-fail jobs are listed above; report them apart. |

## Definition of done

- [ ] Pipeline ended; status and ID reported; failures sent to triage.

## Local completion checklist

- [ ] Typical pipeline duration
- [ ] Manual and allowed-to-fail jobs
