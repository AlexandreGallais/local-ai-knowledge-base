# Eval: git-bisect (DBG-07)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| It worked last week and now it fails. | load |
| Find which commit broke the export. | load |
| Since the last release this test fails. | load |
| Revert the last commit. | do not load |
| Show the log. | do not load |
| Create a branch. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Regression planted 20 commits back | git bisect run names the planted commit; bisect reset done | to test locally | to test locally |
| Regression with some unbuildable commits | the script exits 125 for them and bisect still finds the commit | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
