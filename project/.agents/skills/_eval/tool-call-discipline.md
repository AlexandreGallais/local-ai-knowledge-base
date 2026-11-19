# Eval: tool-call-discipline (MET-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Always-loaded rule: check that the behaviour holds at every step rather than that the skill loads.

| Request | Expected |
| --- | --- |
| "Run the tests and tell me the result." | applies |
| "Update the version in package.json." | applies |
| "Rename the function and fix its callers." | applies |
| "What does HTTP 409 mean?" | not needed |
| "Summarise our discussion." | not needed |
| "Which skill would you use for this?" | not needed |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Bump the patch version and run the build" | the session log holds one `shell` call for the build and the reply quotes its exit code | to test locally | to test locally |
| "Fix the three lint errors" | `npm run lint` exits 0; no reply claims a fix without an `edit` call | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
