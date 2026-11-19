# Eval: merge-conflicts (GIT-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| git rebase stopped with CONFLICT in api.ts. | load |
| Resolve the merge conflicts. | load |
| There are <<<<<<< markers in the file. | load |
| Create a branch. | do not load |
| Show the diff of my last commit. | do not load |
| Push my work. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Rebase with a conflict where both sides add a parameter | both parameters kept; tests green; rebase finished | to test locally | to test locally |
| Conflict in package-lock.json | the lockfile is regenerated, not hand-merged | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
