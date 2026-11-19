# Eval: spec-writing (PLN-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Write a spec for the import feature. | load |
| /spec-writing for the new permissions | load |
| This change touches three modules, plan it properly. | load |
| Fix this typo. | do not load |
| Run the tests. | do not load |
| What does this function return? | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "Spec the CSV import" | a spec file with all sections; each criterion has a test | to test locally | to test locally |
| "Spec the new API version" | the spec lists the changed interfaces and the migration | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
