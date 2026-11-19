# Eval: debug-instrumentation (DBG-13)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add some prints to see what happens. | load |
| Log the values in the loop. | load |
| Commit after the debugging session. | load |
| Add structured logging. | do not load |
| Write a test. | do not load |
| Rename a variable. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Debug a wrong value with prints, then commit the fix | grep DEBUG-TMP finds nothing in the commit | to test locally | to test locally |
| Debug session ends with a useful diagnostic | kept as a debug-level log without the tag | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
