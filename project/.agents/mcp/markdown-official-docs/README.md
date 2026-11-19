# Brick `markdown-official-docs`

The official documentation of Markdown and of diagrams written as text: Mermaid (every type of
diagram, configuration, themes); the CommonMark and GitHub Flavored Markdown specifications; the
Pandoc User's Guide and its guides of Lua filters; the markdownlint rules; KaTeX; Vega-Lite; Graphviz
(the DOT language, attributes, shapes, layout engines); D2.

Each file is the official file, unchanged, in its own format (Markdown, Markdown in a `.txt` file,
HTML), at a noted version. The MCP server searches the documentation and returns one section at a
time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts`, `server.py` | The MCP server, in Node and in Python, with the same answers: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts`, `search.py` | The local search, in Node and in Python: each file cut into sections by its format, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts`, `build_index.py` | Build `index/`, the same bytes in Node and in Python, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool; `<tool>.index.md` lists its files; `README.md` lists the tools, their version, license and size; `lock.json` the commit of each. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source, its copyright and its attribution. |
| `mcp.ts`, `mcp.py` | The small MCP core, in Node and in Python, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/markdown-official-docs/build-index.ts
python3 .agents/mcp/markdown-official-docs/build_index.py   # the same, without Node
```

## Set aside

- PlantUML: its language reference is published as a PDF on its site, not in its repository.

## Licenses

Each source keeps its own free license: MIT (Mermaid, markdownlint, KaTeX), CC BY-SA 4.0 (the
CommonMark and GFM specifications), GPL 2.0 or later (Pandoc), BSD 3-Clause (Vega-Lite, D2), EPL 2.0
(Graphviz). `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/` holds
the text of each license. The code of this brick (its `.ts` and `.py` files) is under the MIT License
of the base.

## Remove it

Delete this folder, then remove the line `markdown-official-docs` from `opencode.json` (the next import
of the kit removes it too). The other bricks do not use it.
