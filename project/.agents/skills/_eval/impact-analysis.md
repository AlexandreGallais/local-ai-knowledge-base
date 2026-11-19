# Eval: impact-analysis (EXP-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| What breaks if I change this function's signature? | load |
| I want to rename this config key. | load |
| Upgrade this shared module. | load |
| Write the new function. | do not load |
| Run the tests. | do not load |
| Explain this module. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Change the return type of a shared helper" | an impact table lists every caller with an action | to test locally | to test locally |
| "Rename a config key used in CI" | the CI file appears in the table | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
