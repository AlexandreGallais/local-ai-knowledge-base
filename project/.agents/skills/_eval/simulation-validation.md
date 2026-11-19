# Eval: simulation-validation (SCI-07)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Can we trust these simulation results? | load |
| The results change between runs. | load |
| Validate the new tank model. | load |
| Draw the diagram. | do not load |
| Fix the CSS. | do not load |
| Rename the model. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Validate a model against an analytic case | automated test with tolerance passes | to test locally | to test locally |
| Non-reproducible results | seeds fixed; two runs identical | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
