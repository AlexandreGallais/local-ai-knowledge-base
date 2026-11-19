# Eval: unknown-error-research (DOC-08)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| What does this error mean: invalid state transition? | load |
| I have never seen this message before. | load |
| The fix based on the error text did not work. | load |
| Run the build. | do not load |
| Explain closures. | do not load |
| Write a commit. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Unknown error raised by a dependency | the raising line is found in the installed source and quoted | to test locally | to test locally |
| Error already fixed months ago in the repository | git log -S finds the earlier fix | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
