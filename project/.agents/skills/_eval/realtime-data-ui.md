# Eval: realtime-data-ui (FE-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The dashboard freezes with the live data. | load |
| Show the simulation values in real time. | load |
| Add a WebSocket client to the page. | load |
| Write a REST endpoint. | do not load |
| Fix a typo. | do not load |
| Explain WebSockets. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Live chart with 200 messages per second | render count capped; UI stays responsive | to test locally | to test locally |
| Server restart during streaming | disconnected state shown; stream resumes | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
