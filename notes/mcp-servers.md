# MCP servers of the base

Four servers in `global/servers/`, one TypeScript file each, run by `node` without packages, over
stdio (decisions 0012 and 0019 of the project). They share `global/servers/lib/mcp.ts`: the
"initialize" handshake that OpenCode 2.2.7 uses, answers capped at 16,000 characters, errors in one
line, and a journal of every call in the project's `.agents/work/mcp-calls.log`.

| Server | Tools | What for | Writes |
| --- | --- | --- | --- |
| docs | `search_docs`, `read_doc` | Search all the documentation of the base (`docs/` and `library/`), read one section | nothing |
| project | `info`, `versions_behind` | Versions, check commands, strict lint, skills of the project, state of the base | nothing |
| code | `outline`, `read_symbol`, `find_references`, `type_errors` | Read TypeScript through the project's compiler | nothing |
| parse | `outline`, `part`, `images` | Read a heavy file (XD, Word, Excel, PowerPoint, PDF, SVG, big JSON, logs): its outline, one part, its images | `.agents/work/extract/<hash>/` |

Removed on 2026-11-14 (decision 0022): `skills`, as OpenCode reads the skills of `.agents/skills/` by
itself; `geometry`, with the kit of functions it ran; `practices`, with its rule sheets.

## Cost before any call

Measured on 2026-11-13 by `node scripts/measure-servers.ts`: the tool schemas and instructions the
model receives at every request.

| Server | Tools | Schema characters | Estimated tokens |
| --- | --- | --- | --- |
| code | 4 | 1536 | 384 |
| docs | 2 | 1066 | 267 |
| parse | 3 | 1708 | 427 |
| project | 2 | 552 | 138 |
| **All** |  | 4862 | 1216 |

## Declared in

`global/opencode/opencode.jsonc`, under `mcp.servers`, each with `"codemode": false`. OpenCode gives
each tool the name of its server as a prefix: the model sees `docs_search_docs`, `project_info`.

## The parse server

- A file is read once; the result is kept in `.agents/work/extract/<hash>/` (`document.json` and
  `images/`), local to the project and ignored by Git. A changed file gets a new hash.
- The outline is capped at 8,000 characters, a part at 12,000; both are cut at a line end and say
  which smaller part to ask for.
- Part ids: `S1.2.3` (XD screen and groups), `h2.1` and `t3` (Word headings and tables),
  `Sheet!A1:H50` (Excel, 50 rows a part), `s3` (slide), `p7` (PDF page), `#id` or `g2.1` (SVG),
  `$.a.b[0]` (JSON), `l1-200` (lines of a log).
- PDF files are read with pdf.js, vendored in `global/vendor/pdfjs/`; its warnings are silenced so that
  nothing but the protocol reaches the output. Old Office files (`.doc`, `.xls`, `.ppt`) are refused
  with the advice to save them in the new format.
