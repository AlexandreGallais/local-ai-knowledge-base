# Eval: cli-help-mining (DOC-07)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Which option of tar keeps permissions? | load |
| rsync rejects my flag. | load |
| How do I use podman run with a memory limit? | load |
| Write a function. | do not load |
| Rename a branch. | do not load |
| Explain closures. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Find the option to make grep print only file names" | the option is quoted from grep --help | to test locally | to test locally |
| Wrong flag rejected by a CLI | the agent reads --help and fixes the flag | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
