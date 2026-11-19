# Eval: grill-me (PLN-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/grill-me` only.

| Request | Expected |
| --- | --- |
| /grill-me on the export design | load |
| /grill-me about the new cache | load |
| Run /grill-me on my plan. | load |
| Ask me what you need. | do not load |
| Write a plan. | do not load |
| Explain the plan. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/grill-me on adding offline mode" | rounds of questions with recommendations; no code until confirmed | to test locally | to test locally |
| "/grill-me" on a plan with a dependency between two decisions | the dependent question comes in a later round | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
