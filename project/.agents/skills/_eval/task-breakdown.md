# Eval: task-breakdown (PLN-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Plan the work to add user roles to the app. | load |
| This feature is big, how should we split it? | load |
| Give me the steps before you code. | load |
| Fix this typo in the README. | do not load |
| Run the tests. | do not load |
| What does this regex do? | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add CSV export with filters to the report page" | PLAN.md exists; every task has files, acceptance and a verify command | to test locally | to test locally |
| "Migrate the settings page to the new API" | no task touches more than 3 files; tasks ordered by dependency | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
