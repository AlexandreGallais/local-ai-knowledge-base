# Eval: screenshot-analysis (MM-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Here is a screenshot of the error. | load |
| What is wrong on this screen? | load |
| The page looks broken, see the picture. | load |
| Draw a diagram. | do not load |
| Write a README. | do not load |
| Run the tests. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Screenshot of an error dialog | exact text transcribed and found in the code | to test locally | to test locally |
| Blurry screenshot | the agent asks for the text | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
