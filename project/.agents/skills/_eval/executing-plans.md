# Eval: executing-plans (PLN-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Go, implement the plan. | load |
| Continue PLAN.md. | load |
| We were interrupted, resume the work. | load |
| Write a plan for this feature. | do not load |
| What is in PLAN.md? | do not load |
| Delete PLAN.md. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Execute a 4-task PLAN.md | each task marked done with its verify result; suite green | to test locally | to test locally |
| Resume a half-done PLAN.md in a fresh session | no done task is redone (git log unchanged for them) | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
