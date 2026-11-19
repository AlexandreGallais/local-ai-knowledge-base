# Eval: dependency-hygiene (SEC-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add a library for date parsing. | load |
| Update lodash. | load |
| The lockfile changed, is that fine? | load |
| Explain dates. | do not load |
| Write a test. | do not load |
| Rename a module. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add a date library" | need justified, licence checked, lockfile committed | to test locally | to test locally |
| Manual version edit in manifest | replaced by the package manager command | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
