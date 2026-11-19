# Eval: flaky-tests (DBG-08)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| This test fails one time in five. | load |
| It passes locally but fails in CI sometimes. | load |
| The test has a sleep of two seconds. | load |
| Write a new test. | do not load |
| Speed up the build. | do not load |
| Explain mocks. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Test with a fixed sleep racing an async operation | the sleep is replaced by a condition wait; 50 runs green | to test locally | to test locally |
| Test failing only after another test | shared state reset; passes in any order | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
