# Eval: safe-refactoring (DEV-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Extract this block into a function. | load |
| Rename the class everywhere. | load |
| Split this file into two modules. | load |
| Add a new feature. | do not load |
| Fix the failing test. | do not load |
| Explain the code. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Extract the validation into its own module" | same tests green before and after; no test changed | to test locally | to test locally |
| "Rename the function used in configs too" | grep finds no leftover use | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
