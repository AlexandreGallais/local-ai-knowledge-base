# Eval: agent-tool-wrappers (TOL-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/agent-tool-wrappers` only.

| Request | Expected |
| --- | --- |
| /agent-tool-wrappers npm test | load |
| Use /agent-tool-wrappers for the build. | load |
| /agent-tool-wrappers on the install | load |
| Run the tests. | do not load |
| Write a script. | do not load |
| Explain the output. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/agent-tool-wrappers npm run build" with a failing build | the first error quoted from the log with its line number | to test locally | to test locally |
| Long passing test run | only the summary is shown | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
