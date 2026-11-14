# Brick `python-official-docs`

The official documentation of Python and of the Inkscape extensions, in cleaned Markdown, at a noted
version. The MCP server searches it and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts` | The local search: words split as a person reads names, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts` | Builds `index/`, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool, files of 16 KB at most, each with its header. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source and its attribution. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/python-official-docs/build-index.ts
```

## Sources

| Tool | Source | Version | License | Files | Size |
| --- | --- | --- | --- | --- | --- |
| `python` | python/cpython, `Doc/` (library, reference, tutorial, howto, faq, whatsnew), reStructuredText converted to Markdown | Python 3.15.2 | PSF License 2.0, examples 0BSD | 1,033 | 9.9 MB |
| `inkex` | inkscape/extensions, the docstrings of the `inkex` package converted to Markdown | Inkscape 1.4.1 | GPL 2.0 or later | 59 | 0.2 MB |
| `inkscape-extensions-guide` | inkscape/extensions, `docs/` (authors, tutorial, dev), reStructuredText converted to Markdown | Inkscape 1.4.1 | GPL 2.0 or later | 20 | 0.1 MB |

The commits are in `library/lock.json`.

Set aside:

- The C API, extending and embedding, installing and distributing: not for code that uses Python.
- `inkex/deprecated-simple`: the old API of Inkscape 0.92, kept for old extensions only.
- The extension scripts of Inkscape themselves: they use the API; they do not document it.

## Licenses

The Python documentation is under the PSF License Agreement, its code examples under the Zero-Clause
BSD license; the Inkscape extensions are under the GNU GPL version 2 or later, so their converted
documentation stays under it, in its own folders. `THIRD_PARTY_NOTICES.md` gives each license and
attribution; `licenses/` holds their texts. The code of this brick (its `.ts` files) is under the
MIT License of the base.

## Remove it

Delete this folder, then remove the line `python-official-docs` from `opencode.json` (the next import
of the kit removes it too). The other bricks do not use it.
