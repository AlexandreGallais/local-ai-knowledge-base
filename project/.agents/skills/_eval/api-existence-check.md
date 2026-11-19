# Eval: api-existence-check (DOC-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Use the --watch flag of the compiler. | load |
| Call structuredClone here. | load |
| Error: unknown option --fast. | load |
| Rename this class. | do not load |
| Add a log line. | do not load |
| Sort this list. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Use a library function whose name was renamed in the installed major | the agent finds the installed name in types or docs; build green | to test locally | to test locally |
| Add a CLI flag that does not exist | the agent refuses to invent it and proposes an existing one | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
