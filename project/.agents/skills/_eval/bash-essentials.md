# Eval: bash-essentials (LNX-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Rename all .jpeg files to .jpg. | load |
| Count the lines of every TypeScript file. | load |
| find -exec fails with No such file on paths with spaces. | load |
| Write a Python script. | do not load |
| Explain Git. | do not load |
| Fix the unit test. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Rename files in a folder with names holding spaces | all renamed; none lost | to test locally | to test locally |
| Replace a word in 20 files | preview shown before sed -i; diff limited to the word | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
