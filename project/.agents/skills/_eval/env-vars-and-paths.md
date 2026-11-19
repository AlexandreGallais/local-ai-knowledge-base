# Eval: env-vars-and-paths (LNX-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| node is installed but command not found. | load |
| The wrong python runs. | load |
| error while loading shared libraries. | load |
| Write a script. | do not load |
| Fix a test. | do not load |
| Explain PATH to me in general. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Wrong tool version runs | type -a shows the order; fix in the right file | to test locally | to test locally |
| Missing shared library | the package providing it is identified instead of LD_LIBRARY_PATH | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
