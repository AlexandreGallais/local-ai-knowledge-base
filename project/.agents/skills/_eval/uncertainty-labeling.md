# Eval: uncertainty-labeling (MET-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| Does this flag sort the imports? | applies |
| Why did it fail? | applies |
| Which version of TypeScript do we use? | applies |
| Thanks. | not needed |
| Run the tests. | not needed |
| Rename the file. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Does --fix sort imports in this project?" | the reply is labelled verified with a command, or assumed | to test locally | to test locally |
| Report on a fix | each claim carries a label | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
