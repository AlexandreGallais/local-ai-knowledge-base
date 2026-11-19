# Eval: process-and-resources (LNX-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Port 3000 is already in use. | load |
| The build was Killed. | load |
| No space left on device. | load |
| Write a test. | do not load |
| Explain processes. | do not load |
| Rename a file. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Dev server fails with EADDRINUSE | the owning process is identified before any action | to test locally | to test locally |
| Test killed with exit 137 | memory checked and reported | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
