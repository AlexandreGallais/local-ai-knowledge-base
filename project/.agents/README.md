# `.agents/`: what the AI gets in this project

This folder gives the AI of OpenCode what it needs to work here: rules, skills, and MCP servers that
read heavy files and look up documentation. Everything lives in the project; nothing is installed
elsewhere. The format and the lint are those of the project, at its root: see `lint/README.md`.

## How it works

OpenCode reads three entries at the root of the project:

| Entry | What OpenCode does with it |
| --- | --- |
| `AGENTS.md` | Loads it at every request: the rules of this project, written by the team. |
| `opencode.json` | Loads `.agents/rules.md` and the `rules.md` of each brick, formats each file after a write (ESLint, Prettier, Stylelint), starts the MCP server of each brick. |
| `.agents/skills/` | Lists the skills by their name and description, and loads one when a task matches it. |

## Usage

Nothing to start by hand: OpenCode starts the MCP servers itself. Check that it sees them with
`/mcps` in OpenCode. The commands of each brick, for a terminal, are in its `README.md`.

## The bricks

Each folder of `.agents/mcp/` is a brick: one MCP server with everything it needs (its code, its
documentation, its `rules.md` and its `README.md`). No brick uses another. Each brick holds its own
copy of the small MCP core (`mcp.ts`, the same text everywhere). They need no npm package.

| Brick | What it gives |
| --- | --- |
| `parse` | The outline, then one part, then the images of a heavy file. |
| `js-official-docs` | The official documentation of the JavaScript and TypeScript tools: search, then one section. MDN, ARIA patterns, Angular (guides, API, CLI), TypeScript, RxJS, NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, Storybook, Sass, Prettier, ESLint, Stylelint. |
| `csharp-official-docs` | The same for C# and .NET: the language, .NET, ASP.NET Core, EF Core, Aspire and their API reference. |
| `python-official-docs` | The same for Python, and the `inkex` API of the Inkscape extensions. |
| `rust-official-docs` | The same for Rust: the book, the reference, Rust by Example, Cargo and the standard library. |
| `java-official-docs` | The same for the Java SE API (`java.base`, `java.net.http`), Gradle and Maven. |
| `containers-official-docs` | The same for Docker, Podman, Compose, Dev Containers and the OCI specifications. |
| `git-official-docs` | The same for Git: every command. |
| `cpp-official-docs` | The same for C and C++: cppreference, CMake, Clang, GNU Make, GCC. |
| `math-docs` | Free mathematics textbooks, in LaTeX, PreTeXt and XML: linear algebra, discrete mathematics, combinatorics. |

The documentation bricks share the same server code; `brick.json` gives each its name. Each file of
their documentation is the official file, unchanged, in its own format. Keep only the bricks the
project needs: each one is its own pack in the export.

## Remove a brick

1. Delete its folder in `.agents/mcp/`.
2. Remove its line from `mcp.servers` of `opencode.json`. The next import of the kit does it too.
   Until then, OpenCode shows that server as failed; the others work.

## Add a brick

Paste its export parts beside the others and run `node import.ts`: it writes the folder and its line
in `opencode.json`. A brick written by hand needs a `server.ts`, a `rules.md`, a `README.md`, and
its line in `opencode.json`.

## What stays local

`.agents/.gitignore` keeps out of Git: `work/` (work files, extracts of heavy files, the journal of
MCP calls) and `cache/`.
