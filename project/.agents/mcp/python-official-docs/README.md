# Brick `python-official-docs`

The official documentation of Python (the language reference, the standard library, the tutorial, the how-to guides, the FAQ, what is new) and the Inkscape extensions (the `inkex` API, taken from its docstrings, and their guides).

Each file is the official file, unchanged, in its own format (Markdown, reStructuredText, AsciiDoc,
LaTeX, Texinfo, PreTeXt, XML, HTML), at a noted version. An API reference that lives in the
comments of the source code is taken from those comments, unchanged. The MCP server searches the
documentation and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts` | The local search: each file cut into sections by its format, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts` | Builds `index/`, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool; `<tool>.index.md` lists its files; `README.md` lists the tools, their version, license and size; `lock.json` the commit of each. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source, its copyright and its attribution. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/python-official-docs/build-index.ts
```

## Set aside

- The C API and the documentation of CPython's own development.

## Licenses

Python is under the PSF License 2.0, its examples under 0BSD; the Inkscape extensions under the GNU GPL version 2 or later. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/`
holds the text of each license. The code of this brick (its `.ts` files) is under the MIT License of
the base.

## Remove it

Delete this folder, then remove the line `python-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
