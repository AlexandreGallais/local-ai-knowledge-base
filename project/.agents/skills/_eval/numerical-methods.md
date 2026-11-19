# Eval: numerical-methods (SCI-04)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Which solver for this stiff ODE? | load |
| The simulation explodes with a larger step. | load |
| Find the root of this function. | load |
| Plot the result. | do not load |
| Rename the variables. | do not load |
| Write the README. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Integrate a stiff test problem | implicit method chosen; tolerances explicit; convergence checked | to test locally | to test locally |
| Solve a linear system | factorisation used, no explicit inverse | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
