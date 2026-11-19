# Eval: feature-workflow (DEV-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add a dark mode toggle. | load |
| Implement issue 128. | load |
| Build the export feature end to end. | load |
| Why does the test fail? | do not load |
| Explain this module. | do not load |
| Write the README. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add a health endpoint" on main | a feature branch, tests green, MR opened | to test locally | to test locally |
| "Implement issue: add pagination" | PLAN.md written; pipeline followed until green | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
