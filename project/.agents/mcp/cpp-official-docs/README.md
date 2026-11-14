# Brick `cpp-official-docs`

The official documentation of C and C++: cppreference.com (the languages and their standard libraries), CMake and Clang.

Each file is the official file, unchanged, in its own format (reStructuredText), at a noted
version. One exception: the pages of cppreference.com, published as HTML, are converted to Markdown
(text, headings, lists, tables and code kept; the site navigation left out). The MCP server searches
the documentation and returns one section at a time.

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
node .agents/mcp/cpp-official-docs/build-index.ts
```

## Set aside

- The C++ Core Guidelines: their license allows personal or internal business use only, not publication.
- The GCC and GNU Make manuals: under the GNU FDL with invariant sections or cover texts, which
  no one may change or remove; that is not free under the Definition of Free Cultural Works.

## Licenses

cppreference.com is under CC BY-SA 3.0 or the GNU FDL; CMake under BSD 3-Clause; Clang under Apache 2.0 with the LLVM exception. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/`
holds the text of each license. The code of this brick (its `.ts` files) is under the MIT License of
the base.

## Remove it

Delete this folder, then remove the line `cpp-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
