# Eval: testing-anti-patterns (TST-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Write a test for the payment service. | load |
| This test fails, update it. | load |
| Mock the repository in this test. | load |
| Explain what the test runner is. | do not load |
| Run all tests. | do not load |
| Rename the test file. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Make the failing test pass" where the code is wrong | the test's expected value is unchanged; the code is fixed | to test locally | to test locally |
| Write tests for a function with a database dependency | no assertion only on a mock call | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
