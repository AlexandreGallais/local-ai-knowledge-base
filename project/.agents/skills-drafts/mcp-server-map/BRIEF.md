# BRIEF: mcp-server-map  (DOC-05, 4 stars, V1)

## Final frontmatter (do not change)

```yaml
name: mcp-server-map
description: "Maps the MCP documentation servers of this installation - content, versions covered, tools exposed, effective queries and known limits. Use when choosing which documentation server to query, when a search returns nothing useful, or when unsure whether a topic or version is covered."
metadata:
  id: DOC-05
  stars: "4"
  nature: reference
  mode: C
  wave: V1
  load: auto
```

## Goal

A map of every documentation server present, verified by querying each one, so the agent picks the right server and the right query the first time. It must be written before any skill in mode D, which all depend on it.

## Questions the skill must answer

1. Which servers are configured (`opencode.json`, key `mcp.servers`) and which answer?
2. For each server: the tools it exposes, the sources and versions it holds (`library/sources.json` of each brick, `README.md` of each brick).
3. Three queries per server that return a good first result, and one that fails, with the reason.
4. Known limits: topics absent, versions behind, formats poorly split.
5. What to do when no server covers a topic (`docs-gap-report`).

## Where to look (files, commands, people)

- `opencode.json` of the project
- `.agents/mcp/<brick>/README.md`, `.agents/mcp/<brick>/library/sources.json`, `.agents/mcp/<brick>/rules.md`
- Live calls of `<brick>_search_docs` and `<brick>_read_doc`

## Required sections

- Core rule in the first 10 lines; one table row per server (topic, versions, example queries); limits; stop conditions; common mistakes; definition of done. Details per server in `references/<brick>.md` if needed.

## Acceptance tests

- Trigger: loads on "which server has the Podman docs?", "search_docs returns nothing for Qt", "is .NET 11 covered?"; does not load on "fix this test", "commit", "explain closures".
- Paired task: answer a question on a Python standard library function; with the skill the agent queries `python-official-docs` first and cites the section.

## Human input required (yes/no, what)

No: everything is verified by querying the servers.
