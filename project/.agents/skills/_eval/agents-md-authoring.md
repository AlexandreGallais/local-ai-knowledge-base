# Eval: agents-md-authoring (SKL-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Remember for this project that tests run with npm test -- --run. | load |
| AGENTS.md is out of date. | load |
| Write the AGENTS.md of this repository. | load |
| Write a skill for releasing. | do not load |
| Explain this function. | do not load |
| Commit the changes. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add the build command to AGENTS.md" | the command written was run and exits 0 | to test locally | to test locally |
| Update an AGENTS.md holding a stale command | the stale line is gone; every command in it runs | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
