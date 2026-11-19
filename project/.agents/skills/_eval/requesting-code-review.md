# Eval: requesting-code-review (REV-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The branch is ready, ask for review. | load |
| Prepare the MR for review. | load |
| Write the review request. | load |
| Review this MR. | do not load |
| Fix the review comments. | do not load |
| Merge the MR. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Ask for review of the export branch" | checks green first; description has context, attention points and test steps | to test locally | to test locally |
| Ask for review of a 900-line diff | the agent proposes to split it | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
