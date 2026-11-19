# Eval: works-on-my-machine (DBG-12)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| It works locally but fails in CI. | load |
| It fails only in the container. | load |
| My colleague gets a different result. | load |
| Fix this typo. | do not load |
| Write a test. | do not load |
| Rename a branch. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Same test passing in one environment and failing in another due to a tool version | the snapshot diff names the version | to test locally | to test locally |
| Failure due to a missing environment variable | found by the env diff | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
