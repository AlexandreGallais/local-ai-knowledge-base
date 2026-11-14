# `.agents/`: what the AI gets in this project

This folder gives the AI of OpenCode what it needs to work here: rules, skills, and MCP servers that
format, lint, read heavy files and look up documentation. Everything lives in the project; nothing
is installed elsewhere.

## How it works

OpenCode reads three entries at the root of the project:

| Entry | What OpenCode does with it |
| --- | --- |
| `AGENTS.md` | Loads it at every request: the rules of this project, written by the team. |
| `opencode.json` | Loads `.agents/rules.md` and the `rules.md` of each brick, runs the format brick after each write, starts the MCP server of each brick. |
| `.agents/skills/` | Lists the skills by their name and description, and loads one when a task matches it. |

## The bricks

Each folder of `.agents/mcp/` is a brick: one MCP server with everything it needs (its code, its
config, its documentation, its `rules.md` and its `README.md`). No brick uses another. Each brick
holds its own copy of the small MCP core (`mcp.ts`, the same text everywhere).

The `README.md` of each brick says what it does, its commands, and how to remove it.

## Setup

`package.json` lists the npm packages the format and lint bricks need (ESLint, typescript-eslint,
Stylelint and their plugins). They install apart from the project's own dependencies:

```sh
npm install --prefix .agents
```

The AI runs it itself when a brick says a package is missing; OpenCode asks you to approve it.

## Remove a brick

1. Delete its folder in `.agents/mcp/`.
2. Remove its lines from `opencode.json` (`mcp.servers`, and `formatter` for the format brick).
   The next import of the kit does it too. Until then, OpenCode shows that server as failed; the
   others work.

## Add a brick

Paste its export parts beside the others and run `node import.ts`: it writes the folder and its line
in `opencode.json`. A brick written by hand needs a `server.ts`, a `rules.md`, a `README.md`, and
its line in `opencode.json`.

## What stays local

`.agents/.gitignore` keeps out of Git: `work/` (work files, extracts of heavy files, the journal of
MCP calls), `cache/` and `node_modules/`.

## Settings of this project

`.agents/profile.json`, when it exists, gives the format and lint bricks two settings: `copyright`,
the copyright line each file must start with, and `prefix`, the selector prefix of Angular
components.
