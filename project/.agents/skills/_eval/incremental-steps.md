# Eval: incremental-steps (MET-11)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Implement the three new endpoints of PLAN.md. | load |
| Add the new filter to the search, the API and the UI. | load |
| The build has been red for a while, keep going. | load |
| Fix the typo in the error message. | do not load |
| Format the file. | do not load |
| Show me the git log. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Implement a 3-function feature | the session log shows a test run after each function; final suite green | to test locally | to test locally |
| Add a field across model, API and UI | one commit per verified slice | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
