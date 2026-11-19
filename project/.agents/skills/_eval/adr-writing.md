# Eval: adr-writing (ARC-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Write an ADR for choosing SQLite. | load |
| /adr-writing for the new message format | load |
| We decided to switch to gRPC, record it. | load |
| Write the README. | do not load |
| Explain this decision to me. | do not load |
| Change the database. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Record the choice of the queue library" | numbered ADR with two options, status Proposed | to test locally | to test locally |
| "We drop the old cache, record it" | new ADR supersedes the old one; both linked | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
