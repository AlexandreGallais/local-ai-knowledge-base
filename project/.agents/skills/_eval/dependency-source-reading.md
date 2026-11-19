# Eval: dependency-source-reading (DOC-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| The docs do not say what the default timeout is. | load |
| How does this library handle retries internally? | load |
| This option behaves differently from the docs. | load |
| Install the library. | do not load |
| Upgrade the library. | do not load |
| Write a test. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "What is the default page size of the client library?" | the answer quotes the installed file and line | to test locally | to test locally |
| Library behaving unlike its docs | the agent reads the installed source; no edit in node_modules | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
