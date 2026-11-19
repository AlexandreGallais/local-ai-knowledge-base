# Eval: long-task-checkpointing (ORC-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| This migration will take many steps. | load |
| We lost the context, continue. | load |
| Resume where we stopped yesterday. | load |
| Write a function. | do not load |
| Fix a typo. | do not load |
| Explain the plan. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Ten-step migration with a forced context cut | resumes at the right step from files | to test locally | to test locally |
| Long task | each step committed and recorded in PLAN.md | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
