# Eval: api-and-interface-design (ARC-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add a field to the users API. | load |
| Design the interface of the new module. | load |
| Remove the legacy parameter from this function. | load |
| Fix the CSS. | do not load |
| Run the tests. | do not load |
| Write the README. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Rename a field of a public endpoint" | old field kept and deprecated, or a new version; callers not broken | to test locally | to test locally |
| "Design the parser module interface" | contract written with tests for errors | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
