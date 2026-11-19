# Eval: final-report (MET-08)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| Done? Tell me what you changed. | applies |
| Stop here and report. | applies |
| Summarise the work. | applies |
| What is the next task? | not needed |
| Explain the error. | not needed |
| Write the handoff. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Finish a small feature | the reply has the 6 sections with quoted proof | to test locally | to test locally |
| Finish with one failing test left | "Not done" names it | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
