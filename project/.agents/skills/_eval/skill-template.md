# Eval: skill-template (SKL-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/skill-template` only.

| Request | Expected |
| --- | --- |
| "/skill-template" | load |
| "/skill-template for a new skill named release-notes" | load |
| "Show me the skill template (/skill-template)." | load |
| "Write a skill for releases." | do not load (writing-skills) |
| "What is a SKILL.md?" | do not load |
| "Fix the build." | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/skill-template then create the folder for a skill named release-notes" | `check-skill` on the new folder lists only content findings, no layout finding | to test locally | to test locally |
| "/skill-template and check my skill" on a skill missing its Definition of done | the agent reports the missing section | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
