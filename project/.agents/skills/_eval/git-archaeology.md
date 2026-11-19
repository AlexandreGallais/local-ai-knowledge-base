# Eval: git-archaeology (EXP-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Why is this condition here? | load |
| Can I remove this workaround? | load |
| When did this behaviour change? | load |
| Show git status. | do not load |
| Create a commit. | do not load |
| Rebase my branch. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Can I delete this odd sleep?" | the introducing commit and its reason are quoted before any change | to test locally | to test locally |
| "When was the retry added?" | git log -S finds the commit | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
