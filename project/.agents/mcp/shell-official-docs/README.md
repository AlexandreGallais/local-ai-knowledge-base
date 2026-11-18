# Brick `shell-official-docs`

The official documentation of shell scripting: the Bash Reference Manual, the manual page of dash (a
POSIX sh), the GNU manuals of coreutils, sed, grep and find, ShellCheck, the Google Shell Style Guide,
the tldr pages (short examples of each command, for Linux, Windows and every platform), Bats, shfmt,
and PowerShell 7.5 (the about_ topics, every cmdlet and the conceptual documentation).

Each file is the official file, unchanged, in its own format (Markdown, reStructuredText, AsciiDoc,
LaTeX, Texinfo, PreTeXt, XML, HTML, roff), at a noted version. The MCP server searches the
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
node .agents/mcp/shell-official-docs/build-index.ts
python3 .agents/mcp/shell-official-docs/build_index.py   # the same, without Node
```

## Set aside

- The wiki of ShellCheck, where each check (`SC2086`...) is explained: it states no license.
- The manuals of GNU gawk, tar and Autoconf (its chapter on portable shell): under the GNU FDL with
  invariant sections or cover texts, not free.
- The POSIX specification of the shell: not under a free license. The manual page of dash stands for it.
- The manual of zsh (written in Yodl) and the manual of jq (written in YAML): formats the search does
  not read.

## Licenses

The GNU manuals (Bash, coreutils, sed, grep, find) are under the GNU FDL 1.3 or later, with no
invariant section; dash and shfmt under BSD 3-Clause; ShellCheck under the GPL 3.0 or later; the Google
Shell Style Guide under CC BY 3.0; the tldr pages and PowerShell under CC BY 4.0; Bats under MIT.
`THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/` holds the text of
each license. The code of this brick (its `.ts` and `.py` files) is under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `shell-official-docs` from `opencode.json` (the next import of
the kit removes it too). The other bricks do not use it.
