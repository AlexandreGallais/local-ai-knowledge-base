# Eval: deep-modules-design (ARC-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Callers of this module must call init, then load, then start. | load |
| Design the interface of the storage module. | load |
| This class is hard to test. | load |
| Fix the failing test. | do not load |
| Rename the variable. | do not load |
| Run the build. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Reshape a module whose callers sequence three calls | one call hides the sequence; callers' code shorter; tests through the interface | to test locally | to test locally |
| Make a module testable without reaching into internals | no outside import of internal paths | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
