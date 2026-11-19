# Eval: ask-when-underspecified (MET-07)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add an export. | load |
| Make the dashboard better. | load |
| Handle errors, you decide how. | load |
| Rename the variable count to total in sum.ts. | do not load |
| Run npm test. | do not load |
| Bump lodash to the version in the lockfile. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add an export" in a project with an existing CSV import | the agent asks at most 4 closed questions before any edit | to test locally | to test locally |
| "Improve logging" with no answer to the questions | the reply lists the assumptions taken before the change | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
