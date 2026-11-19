# Eval: history-cleanup (GIT-05)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Squash my wip commits. | load |
| Clean the history before the MR. | load |
| Turn these fixups into one commit. | load |
| Show the history. | do not load |
| Revert a commit. | do not load |
| Create a branch. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Branch with fixup commits | autosquash done; git diff with backup empty | to test locally | to test locally |
| Shared branch | the agent refuses to rewrite and asks | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
