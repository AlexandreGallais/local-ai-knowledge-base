# Brick `linux-official-docs`

The official documentation of Linux, Fedora, GNOME and Wayland: Fedora Quick Docs and release notes,
DNF5 and RPM; the Linux man-pages (system calls, C library functions, special files, file formats,
overviews); systemd; util-linux; the administration guide and the userspace API of the kernel; the
GNOME developer documentation, GTK 4, GLib and GJS; Wayland, its protocols and the book _The Wayland
Protocol_; PipeWire; Flatpak; the SELinux Notebook.

Each file is the official file, unchanged, in its own format (Markdown, reStructuredText, AsciiDoc,
DocBook XML, Doxygen, scdoc, roff), at a noted version. The MCP server searches the documentation and
returns one section at a time.

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
node .agents/mcp/linux-official-docs/build-index.ts
python3 .agents/mcp/linux-official-docs/build_index.py   # the same, without Node
```

## Set aside

- The GNOME Human Interface Guidelines and the freedesktop.org specifications (XDG base directories,
  desktop entries, menus): their repositories state no license for their files.
- Two Linux manual pages, `ld.so.conf(5)` and `tunables.conf(5)`: they state no license.
- The Arch Wiki: no repository nor archive that follows its versions.
- Kubernetes: left out by the Product Owner.

## Licenses

Each source keeps its own free license: CC BY-SA 3.0 (Fedora, GNOME developer documentation), CC BY-SA
4.0 (_The Wayland Protocol_), CC BY 4.0 (Flatpak), CC0 (GJS), the permission notices of the Linux
man-pages project and the GPL, BSD and MIT licenses some pages carry, LGPL (systemd, GTK, GLib), GPL
(util-linux, the kernel, DNF5, RPM) and the GNU FDL with no invariant section (some kernel pages, the
SELinux Notebook), MIT (Wayland, PipeWire). `THIRD_PARTY_NOTICES.md` gives each source with its
attribution, and `licenses/` holds the text of each license. The code of this brick (its `.ts` and
`.py` files) is under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `linux-official-docs` from `opencode.json` (the next import of
the kit removes it too). The other bricks do not use it.
