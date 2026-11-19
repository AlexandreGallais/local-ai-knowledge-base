# Brick `desktop-official-docs`

The official documentation of desktop applications, up to Windows: Electron (guides, tutorials and
the reference of every API); electron-builder (targets, Windows installers, code signing, auto-update,
multi-platform builds); Electron Packager, Electron Rebuild, Electron Fuses and ASAR; Tauri 2 (guides,
plugins, configuration files, distribution); cross and cargo-xwin, to build Rust for Windows from
Linux; the manual pages of the tools of Wine (wineserver, winedbg, msiexec, winegcc, winebuild, widl,
wrc, winemaker); the NSIS Users Manual; WiX Toolset; MSIX.

Each file is the official file, unchanged, in its own format (Markdown, MDX, roff, Halibut), at a
noted version. The MCP server searches the documentation and returns one section at a time.

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
node .agents/mcp/desktop-official-docs/build-index.ts
python3 .agents/mcp/desktop-official-docs/build_index.py   # the same, without Node
```

## Set aside

- The documentation of Electron Forge: its repository states no license.
- Running Electron or Tauri in a dev container with the display and the sound of the machine: that is
  in `containers-official-docs`.

## Licenses

Each source keeps its own free license: MIT (Electron and its tools, electron-builder, Tauri,
cargo-xwin), BSD 2-Clause (Electron Packager), MIT or Apache 2.0 (cross), LGPL 2.1 or later (Wine),
zlib (NSIS), the Microsoft Reciprocal License (WiX), CC BY 4.0 (MSIX). `THIRD_PARTY_NOTICES.md` gives
each source with its attribution, and `licenses/` holds the text of each license. The code of this
brick (its `.ts` and `.py` files) is under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `desktop-official-docs` from `opencode.json` (the next import
of the kit removes it too). The other bricks do not use it.
