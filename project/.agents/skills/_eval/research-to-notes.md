# Eval: research-to-notes (DOC-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/research-to-notes` only.

| Request | Expected |
| --- | --- |
| /research-to-notes how retries work in our HTTP client | load |
| /research-to-notes on Podman volume labels | load |
| Run /research-to-notes about FMI co-simulation. | load |
| Explain this function. | do not load |
| Fix the bug. | do not load |
| Write the README. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/research-to-notes default timeout of the HTTP client" | a note with the answer and sources (file:line or doc section) | to test locally | to test locally |
| "/research-to-notes" on a topic missing from the docs | the unknown is stated in the note | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
