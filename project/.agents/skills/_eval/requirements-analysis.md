# Eval: requirements-analysis (PLN-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The users want better reports. | load |
| Turn this request into stories. | load |
| The acceptance criteria are missing. | load |
| Write the code. | do not load |
| Run the tests. | do not load |
| Rename the issue. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Users want to export reports" | stories with Given When Then criteria | to test locally | to test locally |
| "It should be fast" | a measurable criterion replaces it | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
