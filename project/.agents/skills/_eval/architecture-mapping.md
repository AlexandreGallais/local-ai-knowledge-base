# Eval: architecture-mapping (EXP-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| How is this project organised? | load |
| Draw the architecture of the code. | load |
| Which modules depend on the database layer? | load |
| Fix this bug. | do not load |
| Rename the module. | do not load |
| Write a test. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Map a sample repository | docs/architecture.md with module table and diagram, each arrow backed by an import | to test locally | to test locally |
| Ask which modules use the database | answer lists modules with import evidence | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
