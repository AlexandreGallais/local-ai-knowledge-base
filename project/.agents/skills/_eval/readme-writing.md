# Eval: readme-writing (WRT-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Write the README of this project. | load |
| The README is outdated. | load |
| Document how to install and run it. | load |
| Write the changelog. | do not load |
| Write a spec. | do not load |
| Explain the code. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| README for a sample project | every command in it runs | to test locally | to test locally |
| Outdated README | stale commands fixed after running them | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
