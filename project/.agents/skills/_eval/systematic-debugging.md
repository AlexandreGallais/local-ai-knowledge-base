# Eval: systematic-debugging (DBG-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The test parse.spec.ts fails since this morning. | load |
| The app crashes with TypeError: cannot read properties of undefined. | load |
| My fix did not work, the bug is still there. | load |
| Add a new endpoint for users. | do not load |
| Rename this function. | do not load |
| Explain how the cache works. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Fix a planted off-by-one in a paginator, reported as "the last item is missing" | a new test fails before the fix and passes after; whole suite green | to test locally | to test locally |
| Fix a crash whose stack trace points to a caller, not the faulty function | the diff changes the function that creates the bad value | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
