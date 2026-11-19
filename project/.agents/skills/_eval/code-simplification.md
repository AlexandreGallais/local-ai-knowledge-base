# Eval: code-simplification (DEV-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/code-simplification` only.

| Request | Expected |
| --- | --- |
| /code-simplification on the parser | load |
| /code-simplification this function | load |
| Use /code-simplification on the report module. | load |
| Make the code faster. | do not load |
| Add a feature. | do not load |
| Explain this code. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/code-simplification" on a nested function | same tests green; nesting reduced | to test locally | to test locally |
| "/code-simplification" on code with apparently dead branches | history checked before removal | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
