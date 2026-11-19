# Eval: code-comments-docstrings (WRT-02)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Document this public function. | load |
| Add docstrings to the module. | load |
| This comment only repeats the code. | load |
| Write the README. | do not load |
| Rename the function. | do not load |
| Run the tests. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Document a public API in TypeScript | TSDoc with params matching the signature | to test locally | to test locally |
| File full of paraphrasing comments | replaced by why-comments | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
