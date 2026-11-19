# Eval: version-pinned-docs (DOC-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| How do I use signals in our Angular version? | load |
| Upgrade this call to the new API. | load |
| The docs show a function that our code does not have. | load |
| Rename the component. | do not load |
| Write a unit test. | do not load |
| Commit. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Use a library API that changed between majors | the agent reads the lockfile version and uses the matching API; build green | to test locally | to test locally |
| Docs and installed version differ | the reply states the gap | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
