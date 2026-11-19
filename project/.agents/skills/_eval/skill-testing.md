# Eval: skill-testing (SKL-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/skill-testing` only.

| Request | Expected |
| --- | --- |
| "/skill-testing git-safety" | load |
| "/skill-testing on the skill I just wrote" | load |
| "Run /skill-testing for writing-skills." | load |
| "Run the unit tests." | do not load |
| "Write a test for clamp()." | do not load |
| "Write a skill." | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/skill-testing surgical-editing" | `_eval/surgical-editing.md` holds 6 trigger rows and at least 2 paired tasks with results | to test locally | to test locally |
| "/skill-testing" on a skill with no deterministic task | the agent asks for the check instead of judging by looks | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
