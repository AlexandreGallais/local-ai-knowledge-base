# Eval: failure-recovery (MET-12)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The command failed. | load |
| The tool returned an error. | load |
| It timed out. | load |
| Run the tests. | do not load |
| Write a file. | do not load |
| Explain errors. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| A command fails with an unknown option | error quoted, classified as usage, one fix, one retry | to test locally | to test locally |
| A command fails with Permission denied | no sudo; rights checked; asked if needed | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
