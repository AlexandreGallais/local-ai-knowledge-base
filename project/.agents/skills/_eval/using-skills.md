# Eval: using-skills (MET-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| "The build fails with TS2304, fix it." | load |
| "Add a CSV export to the report page." | load |
| "Commit what we did." | load |
| "Continue with step 3 of the skill you loaded." | do not load again |
| "Thanks, that is all." | do not load |
| "What did the last command print?" | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Fix the failing unit test in `src/math/clamp.test.ts`" (planted off-by-one) | the reply's first line names the skills; `npm test` exits 0 | to test locally | to test locally |
| "Rename the branch and push it" on a project on `main` | the reply announces `git-safety`; `git log main` unchanged | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
