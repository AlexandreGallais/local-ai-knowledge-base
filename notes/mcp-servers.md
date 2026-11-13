# MCP servers of the base

Six servers in `global/servers/`, one TypeScript file each, run by `node` without packages, over stdio
(decisions 0012 and 0019 of the project). They share `global/servers/lib/mcp.ts`: the "initialize"
handshake that OpenCode 2.2.7 uses, answers capped at 16,000 characters, errors in one line, and a
journal of every call in the project's `.agents/work/mcp-calls.log`.

| Server | Tools | What for | Writes |
| --- | --- | --- | --- |
| docs | `search_docs`, `read_doc` | Search the documentation of the profile, read one section | nothing |
| practices | `rule`, `search_practices` | The sheet of a lint rule by its id, or its official page | nothing |
| skills | `list_skills`, `load_skill` | The skills of the base, of the profile and of the project | nothing |
| project | `project_info`, `versions_behind` | Profile, versions, check commands, state of the base | nothing |
| work | `next_task`, `write_report`, `read_status`, `finish_task`, `block_task`, `check_tasks` | The task list of a subject, one task at a time | `.agents/work/<subject>/` |
| code | `outline`, `read_symbol`, `find_references`, `type_errors` | Read TypeScript through the project's compiler | nothing |

## Cost before any call

Measured on 2026-11-13 by `node scripts/measure-servers.ts`: the tool schemas and instructions the
model receives at every request.

| Server | Tools | Schema characters | Estimated tokens |
| --- | --- | --- | --- |
| code | 4 | 1536 | 384 |
| docs | 2 | 1066 | 267 |
| practices | 2 | 843 | 211 |
| project | 2 | 560 | 140 |
| skills | 2 | 706 | 177 |
| work | 6 | 2488 | 622 |
| **All** |  | 7199 | 1800 |

The `work` server is refused to every agent but the orchestrator: the others pay about 1,180 tokens.

## Declared in

`global/opencode/opencode.jsonc`, under `mcp.servers`, each with `"codemode": false`. The `parse`
and `geometry` servers come with their features.
