# Eval: skill-maintenance (SKL-08)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/skill-maintenance` only.

| Request | Expected |
| --- | --- |
| /skill-maintenance | load |
| Run /skill-maintenance on the skills. | load |
| /skill-maintenance before the release | load |
| Write a new skill. | do not load |
| Test this skill. | do not load |
| Load the git skills. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/skill-maintenance" with two overlapping skills planted | the overlap is reported with evidence; nothing removed without a yes | to test locally | to test locally |
| "/skill-maintenance" with a stale flag in a skill | the stale line is reported with the current value | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
