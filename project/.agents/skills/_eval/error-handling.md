# Eval: error-handling (DEV-08)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add a try catch around the call. | load |
| There is an empty catch here. | load |
| The error message says nothing useful. | load |
| Rename the file. | do not load |
| Write the README. | do not load |
| Run the build. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Handle failure of the config load" | error rethrown with cause and context; test of the error path | to test locally | to test locally |
| Code with except: pass | replaced by a specific exception and handling | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
