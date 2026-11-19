---
name: ci-optimization
description: "Manual: run only when the user explicitly asks for /ci-optimization. Speeds up a GitLab pipeline - cache, parallel jobs, needs (DAG), lighter images, rules that skip work - measured before and after."
metadata:
  id: GL-11
  stars: "2"
  nature: process
  mode: B
  wave: V3
  load: manual
---

# CI optimisation

**Core rule:** measure the pipeline's critical path first, change one thing at a time, and keep a change only if the measured duration drops without losing checks.

## Procedure

1. Measure: durations of the last pipelines and of each job (`glab ci get --with-job-details`).
   - Check: the slowest jobs and the critical path are known.
2. Apply one change from the table to the slowest part.
   - Check: `glab ci lint` passes.
3. Run the pipeline and measure again.
   - Check: duration lower; every job that ran before still runs when it should.

| Lever | When |
| --- | --- |
| `cache:` keyed on the lockfile | dependencies downloaded in every job |
| `needs:` | jobs wait for a whole stage they do not need |
| `parallel:` or test splitting | one long test job |
| Smaller image with tools preinstalled | long `before_script` installs |
| `rules: changes:` | jobs that do not concern the changed files |

## This installation

<!-- FILL: what=baseline durations of the last 5 pipelines and of each job; find=glab ci list and glab ci get --with-job-details; verify=the numbers are written here -->

<!-- FILL: what=cache backend and limits of the runners; find=ask the human or read the runner docs; verify=a cached job shows a cache hit in its log -->

## Stop and ask the human if

- A change would skip checks on some branches or merge requests.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Cache everything." | Large caches can be slower than downloads. Measure. |
| "Skip tests on docs-only changes." | Make sure the rule really matches docs only. |

## Definition of done

- [ ] Baseline and new durations measured; checks unchanged; each change kept only if faster.

## Local completion checklist

- [ ] Baseline durations
- [ ] Runner cache
