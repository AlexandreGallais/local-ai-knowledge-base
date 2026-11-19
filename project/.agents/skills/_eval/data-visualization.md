# Eval: data-visualization (FE-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The chart is slow with 100000 points. | load |
| Add a chart of the temperatures. | load |
| The axis has no units. | load |
| Fix the API. | do not load |
| Write a test for the parser. | do not load |
| Explain SVG. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Chart of 200,000 points | Canvas or downsampling used; peaks visible; render fast | to test locally | to test locally |
| Chart without units | axes labelled with quantity and unit | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
