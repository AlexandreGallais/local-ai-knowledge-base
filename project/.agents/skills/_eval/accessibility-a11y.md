# Eval: accessibility-a11y (FE-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Build an accessible dropdown. | load |
| The axe check reports missing labels. | load |
| Make the dialog usable with the keyboard. | load |
| Speed up the build. | do not load |
| Rename a file. | do not load |
| Write a commit. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Build a custom menu | keyboard flow works; names and focus checked | to test locally | to test locally |
| Fix a form with unlabeled inputs | every input has a label | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
