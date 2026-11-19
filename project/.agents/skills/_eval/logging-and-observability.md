# Eval: logging-and-observability (OBS-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Add logging to the import job. | load |
| I cannot tell from the logs why the request failed. | load |
| Replace these prints with proper logs. | load |
| Write a unit test. | do not load |
| Fix the layout. | do not load |
| Update the version. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Add logs to the payment call" | project logger used; structured fields; no card number in logs | to test locally | to test locally |
| "Make failures of the job diagnosable" | error logs with request ID; one log per failure | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
