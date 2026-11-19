# Eval: scope-discipline (MET-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| Fix the null check in parseUser. | applies |
| Change the button label. | applies |
| Add a parameter to the function. | applies |
| Refactor the whole module. | not needed |
| Clean the code base. | not needed |
| Reformat all files. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Fix the null check" in a messy file | git diff touches only the check and its test | to test locally | to test locally |
| "Change the label" in a file with unused imports | imports untouched; report lists them under Later | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
