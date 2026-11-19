# Eval: reproduce-first (DBG-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Users say totals are wrong on the invoice page. | load |
| Fix bug #42: date shifted by one hour. | load |
| There is a crash when the list is empty. | load |
| Add a new page. | do not load |
| Explain the code. | do not load |
| Update the docs. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Fix "empty list crashes" | a failing test exists before the fix commit | to test locally | to test locally |
| Fix a time-zone bug | the reproduction uses a fixed date and fails before the fix | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
