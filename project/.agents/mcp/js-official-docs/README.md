# Brick `js-official-docs`

The official documentation of the JavaScript and TypeScript tools, in cleaned Markdown, at a noted
version: MDN (JavaScript, HTML, CSS, Web APIs, SVG, HTTP, accessibility), Angular, TypeScript, RxJS,
NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, ESLint and its plugins, Stylelint. The MCP
server searches it and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server `js-official-docs`: `search_docs`, then `read_doc` on one section. |
| `search.ts` | The local search: words split as a person reads names, BM25 ranking, 10 hits at most. |
| `build-index.ts` | Builds `index/`, one plain-text file per tool. The server runs it when `index/` is missing. |
| `check-versions.ts` | Lists the tools whose documentation is behind the versions of the project. |
| `library/` | The documentation, one folder per tool, files of 16 KB at most, each with its header. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source and its attribution. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back, and the server builds `index/`.

## Usage

From the project root:

```sh
node .agents/mcp/js-official-docs/build-index.ts      # rebuild the index after a change
node .agents/mcp/js-official-docs/check-versions.ts   # tools behind the project's versions
```

## Licenses

Each source keeps its own license, written in `THIRD_PARTY_NOTICES.md` with its attribution: MDN
under CC BY-SA 2.5, Angular and TypeScript under CC BY 4.0, most tools under MIT.

## Remove it

Delete this folder, then remove the line `js-official-docs` from `opencode.json` (the next import of
the kit removes it too). The other bricks do not use it.
