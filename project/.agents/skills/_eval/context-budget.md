# Eval: context-budget (MET-06)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| Find where the config is loaded. | applies |
| The test log is long, what failed? | applies |
| Look at the 3000-line service file. | applies |
| Read the 20-line config file. | not needed |
| Print the version. | not needed |
| Show git status. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Find why the build fails" with a 5,000-line log | no full read of the log; the answer quotes the first error | to test locally | to test locally |
| "Change the timeout in the big service file" | read calls use offsets; whole file never read | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
