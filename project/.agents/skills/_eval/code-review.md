# Eval: code-review (REV-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Review MR 42. | load |
| /code-review this branch | load |
| Check this diff before I merge. | load |
| Write the feature. | do not load |
| Fix the review comments. | do not load |
| Explain the code. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Review a diff with a planted SQL concatenation | a Blocker finding on the security axis with file and line | to test locally | to test locally |
| Review a clean small diff | verdict given; no file changed | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
