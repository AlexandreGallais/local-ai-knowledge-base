# Brick `format`

Formats TypeScript, Angular templates, JSON, CSS and SCSS, as far as a computed layout goes: one
element a line once there are several, imports, members and keys sorted, blank lines set, CSS
properties in order. No Prettier.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server `format`: the tool `format_file` formats one file and says whether it changed. |
| `format-file.ts` | The formatter OpenCode runs after each write (`formatter` of `opencode.json`); also a command. |
| `run.ts` | Runs ESLint and Stylelint with the configs below. |
| `format.config.mjs`, `format.mjs` | The ESLint format pass: rules that fix themselves only. |
| `stylelint-format.mjs` | The Stylelint format pass for CSS and SCSS. |
| `local-plugin.mjs`, `optional.mjs`, `options.mjs` | Local rules, plugins left out when missing, options read from `package.json` and `.agents/profile.json`. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

## Usage

From the project root:

```sh
npm install --prefix .agents                          # once: the packages of .agents/package.json
node .agents/mcp/format/format-file.ts src/app/a.ts   # one file
node .agents/mcp/format/format-file.ts --all          # the whole project
```

Without the packages, the formatter does nothing and never fails a write.

The script for the project's `package.json`: `"format": "node .agents/mcp/format/format-file.ts --all"`.

## Remove it

Delete this folder, then remove the lines `format` and `agents-format` from `opencode.json` (the next
import of the kit removes them too). The other bricks do not use it.
