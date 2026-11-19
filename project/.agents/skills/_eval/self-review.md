# Eval: self-review (REV-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| Commit this. | applies |
| Open the merge request. | applies |
| I think we are done. | applies |
| Explain the diff of the last commit. | not needed |
| Show the files changed by others. | not needed |
| Read the README. | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Deliver a change with a leftover console.log | the log line is removed before the commit | to test locally | to test locally |
| Deliver with an unrelated file modified | the file is reverted or explained | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
