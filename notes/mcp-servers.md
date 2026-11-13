# MCP servers of the base

Seven servers in `global/servers/`, one TypeScript file each, run by `node` without packages, over
stdio (decisions 0012 and 0019 of the project). They share `global/servers/lib/mcp.ts`: the
"initialize" handshake that OpenCode 2.2.7 uses, answers capped at 16,000 characters, errors in one
line, and a journal of every call in the project's `.agents/work/mcp-calls.log`.

| Server | Tools | What for | Writes |
| --- | --- | --- | --- |
| docs | `search_docs`, `read_doc` | Search the documentation of the profile, read one section | nothing |
| practices | `rule`, `search_practices` | The sheet of a lint rule by its id, or its official page | nothing |
| skills | `list_skills`, `load_skill` | The skills of the base, of the profile and of the project | nothing |
| project | `project_info`, `versions_behind` | Profile, versions, check commands, state of the base | nothing |
| work | `next_task`, `write_report`, `read_status`, `finish_task`, `block_task`, `check_tasks` | The task list of a subject, one task at a time | `.agents/work/<subject>/` |
| code | `outline`, `read_symbol`, `find_references`, `type_errors` | Read TypeScript through the project's compiler | nothing |
| parse | `outline`, `part`, `images` | Read a heavy file (XD, Word, Excel, PowerPoint, PDF, SVG, big JSON, logs): its outline, one part, its images | `.agents/work/extract/<hash>/` |

## Cost before any call

Measured on 2026-11-13 by `node scripts/measure-servers.ts`: the tool schemas and instructions the
model receives at every request.

| Server | Tools | Schema characters | Estimated tokens |
| --- | --- | --- | --- |
| code | 4 | 1536 | 384 |
| docs | 2 | 1066 | 267 |
| parse | 3 | 1708 | 427 |
| practices | 2 | 843 | 211 |
| project | 2 | 560 | 140 |
| skills | 2 | 706 | 177 |
| work | 6 | 2488 | 622 |
| **All** |  | 8907 | 2227 |

The `work` server is refused to every agent but the orchestrator: the others pay about 1,600 tokens.

## Declared in

`global/opencode/opencode.jsonc`, under `mcp.servers`, each with `"codemode": false`. The `geometry`
server comes with its feature.

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
