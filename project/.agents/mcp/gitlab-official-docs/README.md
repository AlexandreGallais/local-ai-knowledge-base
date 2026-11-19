# Brick `gitlab-official-docs`

The official documentation of GitLab CI/CD: the folder `doc/ci` of the GitLab documentation, the documentation of GitLab Runner, the README and examples of the Dev Containers CLI, to build and run a dev container in a CI job, and glab, the GitLab CLI (every command).

Each file is the official file, unchanged, in its own format (Markdown, reStructuredText, AsciiDoc,
LaTeX, Texinfo, PreTeXt, XML, HTML), at a noted version. An API reference that lives in the
comments of the source code is taken from those comments, unchanged. The MCP server searches the
documentation and returns one section at a time.

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
node .agents/mcp/gitlab-official-docs/build-index.ts
python3 .agents/mcp/gitlab-official-docs/build_index.py   # the same, without Node
```

## Set aside

- The other folders of the GitLab documentation (container registry, merge requests, administration).
- The shell scripts of the examples of the Dev Containers CLI: their README explains them.
- No official page gives the recipe « a GitLab job that runs the dev container of the project »: it is a skill of the project, to write with the team.

## Licenses

The documentation of GitLab (`doc/`) and of GitLab Runner (`docs/`) is under CC BY-SA 4.0; the Dev Containers CLI and glab are under the MIT License. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/`
holds the text of each license. The code of this brick (its `.ts` and `.py` files) is under the MIT License of
the base.

## Remove it

Delete this folder, then remove the line `gitlab-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
