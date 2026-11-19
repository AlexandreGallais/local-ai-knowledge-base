# Eval: data-flow-tracing (EXP-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Where does this value on the screen come from? | load |
| What happens when I submit this form? | load |
| Why is this field empty in the database? | load |
| Add a field. | do not load |
| Run the tests. | do not load |
| Write the docs. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Where does the total on the invoice page come from?" | numbered path from storage to display with file:function | to test locally | to test locally |
| Field renamed between front and back end | both names found and the hop identified | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
