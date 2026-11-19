# Eval: writing-skills (SKL-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| "Save what I just explained about releasing as a skill." | load |
| "This skill never triggers, fix it." | load |
| "check-skill reports 3 findings on my skill." | load |
| "Write the README of the project." | do not load |
| "Add a rule to AGENTS.md: use pnpm." | do not load |
| "Run the tests." | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Turn a 10-line procedure given by the user into a skill | `check-skill` prints `0 findings.` | to test locally | to test locally |
| Fix a skill whose description has an unquoted colon | `check-skill` prints `0 findings.` and the description keeps its triggers | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
