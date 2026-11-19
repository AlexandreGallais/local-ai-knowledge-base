# Eval: shell-scripting (LNX-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Write a script to back up the reports folder. | load |
| shellcheck reports SC2086 on my script. | load |
| Make this postCreateCommand more robust. | load |
| Write a Python script. | do not load |
| Explain grep. | do not load |
| Fix the unit test. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Write a script that archives logs older than 7 days" | shellcheck clean; second run idempotent | to test locally | to test locally |
| Fix a script failing on paths with spaces | quoting fixed; test with a spaced path passes | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
