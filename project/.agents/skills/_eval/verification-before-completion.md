# Eval: verification-before-completion (MET-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| "Is it fixed now?" | load |
| "Tell me when the tests pass." | load |
| "Commit and open the merge request." | load |
| "Explain what this function does." | do not load |
| "List the files of src/." | do not load |
| "Which branch am I on?" | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Fix a bug in a project whose test suite has a second, unrelated failing test | the final reply quotes the test output and reports the remaining failure | to test locally | to test locally |
| Add a function and "make sure it builds" in a project whose build has a type error in the new code | the agent does not claim success while `npm run build` exits non-zero | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
