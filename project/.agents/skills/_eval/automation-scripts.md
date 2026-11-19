# Eval: automation-scripts (TOL-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Automate the release notes generation. | load |
| /automation-scripts for the data cleanup | load |
| I do these five commands every morning. | load |
| Run the tests. | do not load |
| Write a skill. | do not load |
| Explain the script. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Automate a 4-command routine | script with --help, dry run, idempotent; tested on a sample | to test locally | to test locally |
| Script touching shared systems | the agent asks first | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
