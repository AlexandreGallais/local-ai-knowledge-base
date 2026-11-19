# Eval: legacy-code (EXP-07)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Change this old function that has no tests. | load |
| Nobody understands this module, add a feature. | load |
| This 400-line function needs a fix. | load |
| Write a new module. | do not load |
| Explain the history. | do not load |
| Run the linter. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Change an untested function | characterization tests added first and green before and after | to test locally | to test locally |
| Untested code depending on the clock | a seam added; tests deterministic | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
