# Eval: git-recovery (GIT-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| I lost my commit after a reset. | load |
| I deleted the branch by mistake. | load |
| Undo the commit I already pushed. | load |
| Create a branch. | do not load |
| Commit my changes. | do not load |
| Show the log. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Commit lost after reset --hard | rescue branch at the reflog hash; work restored | to test locally | to test locally |
| Pushed bad commit | git revert used, not reset | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
