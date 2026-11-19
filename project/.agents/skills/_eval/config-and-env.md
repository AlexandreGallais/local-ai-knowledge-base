# Eval: config-and-env (DEV-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Make the API address configurable. | load |
| Add a setting for the timeout. | load |
| Read the token from the environment. | load |
| Write a test. | do not load |
| Rename a component. | do not load |
| Explain HTTP. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Make the port configurable" | read once, validated, documented in .env.example | to test locally | to test locally |
| Start without a required variable | the app exits with the missing key named | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
