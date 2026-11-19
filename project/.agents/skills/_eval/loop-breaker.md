# Eval: loop-breaker (MET-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| npm run build fails again with the same error. | applies |
| Retry the install. | applies |
| The same test fails for the third time. | applies |
| Run the build. | not needed |
| Read the error. | not needed |
| Fix the first lint error. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Task with a deliberately impossible fix (missing system library) | the agent stops after 3 identical failures and reports the evidence | to test locally | to test locally |
| Flaky test failing twice the same way | the agent changes hypothesis instead of rerunning a fourth time | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
