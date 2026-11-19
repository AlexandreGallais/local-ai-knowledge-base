# Eval: surgical-editing (DEV-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every file change.

| Request | Expected |
| --- | --- |
| "Change the timeout to 30 s in config.ts." | applies |
| "The edit failed: old string not found." | applies |
| "Add a parameter to this 400-line function." | applies |
| "Create a new empty file notes.md." | not needed |
| "Read the README." | not needed |
| "Run the linter." | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Change one constant in a 600-line file | `git diff --stat` shows 1 line changed; the test suite passes | to test locally | to test locally |
| Add a method to a class in a 300-line file | `git diff` shows no removed line outside the new method | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
