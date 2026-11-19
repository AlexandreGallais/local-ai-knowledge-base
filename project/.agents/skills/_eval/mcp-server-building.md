# Eval: mcp-server-building (TOL-01)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

Manual skill: it must load on `/mcp-server-building` only.

| Request | Expected |
| --- | --- |
| /mcp-server-building for a glossary lookup | load |
| Build a server with /mcp-server-building. | load |
| /mcp-server-building to expose our build status | load |
| Run the documentation server. | do not load |
| Search the docs. | do not load |
| Write a CLI tool. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| "/mcp-server-building with one tool that returns a glossary entry" | process test calls initialize, tools/list and the tool; outputs capped | to test locally | to test locally |
| "/mcp-server-building" for a tool that writes files | the agent asks before granting write access | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
