# Eval: cli-tool-building (TOL-03)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/cli-tool-building` only.

| Request | Expected |
| --- | --- |
| /cli-tool-building for a log filter | load |
| Use /cli-tool-building to make a converter. | load |
| /cli-tool-building | load |
| Write a shell script. | do not load |
| Run the CLI. | do not load |
| Explain argparse. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/cli-tool-building a CSV to JSON converter" | --help, stdout and stderr split, exit codes, process tests | to test locally | to test locally |
| "/cli-tool-building" for a tool other scripts read | a --json option exists and parses | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
