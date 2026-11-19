# Eval: root-cause-tracing (DBG-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The value is null when it reaches the renderer. | load |
| It crashes in formatDate but the date comes from somewhere else. | load |
| Add a null check here to stop the crash. | load |
| Write a new endpoint. | do not load |
| Rename the file. | do not load |
| Explain promises. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Crash in a formatter fed a bad value by a parser two calls up | the diff changes the parser, not the formatter | to test locally | to test locally |
| Wrong total shown, computed in a helper from a wrongly rounded input | the fix is at the rounding site; regression test added | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
