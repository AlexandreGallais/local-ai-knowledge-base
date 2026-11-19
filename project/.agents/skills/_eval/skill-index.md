# Eval: skill-index (SKL-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| "Which skill handles merge conflicts?" | load |
| "I added a skill, update the index." | load |
| "SKILLS_INDEX.md misses my new skill." | load |
| "Load git-safety." | do not load |
| "Write a skill for releases." | do not load (writing-skills) |
| "Run the unit tests." | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Add a new skill folder, then "update the index" | `skill-index.ts check` exits 0 | to test locally | to test locally |
| "Find the skill for a failing pipeline" | the reply names a skill returned by `search pipeline failed` | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
