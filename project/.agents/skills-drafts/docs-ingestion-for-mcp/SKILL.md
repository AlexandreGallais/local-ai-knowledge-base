---
name: docs-ingestion-for-mcp
description: "Manual: run only when the user explicitly asks for /docs-ingestion-for-mcp. Adds a documentation source to a local documentation server - files taken as they are, version and licence recorded, index rebuilt, queries tested."
metadata:
  id: TOL-02
  stars: "4"
  nature: process
  mode: B
  wave: V2
  load: manual
---

# Docs ingestion for MCP

**Core rule:** a source enters only with its version, its commit or date, and a licence that allows it; the index is rebuilt and three queries prove it is found.

## Procedure

1. Identify the source: tool, version, where its doc files are (folder of a repository or an archive), format.
   - Check: the files are Markdown, reStructuredText, AsciiDoc, LaTeX, Texinfo, HTML, XML or man pages the brick can split.
2. Check its licence in the text shipped with it.
   - Check: the licence is free (open source or CC without non-commercial and no-derivatives clauses); otherwise stop.
3. Add the source entry to the brick's `library/sources.json` (tool, version, commit, paths, licence), following the existing entries.
   - Check: the JSON parses; the entry matches its neighbours' fields.
4. Copy the files as they are into the brick's `library/<tool>/` and rebuild the index with the brick's build command.
   - Check: the index lists the new files.
5. Test three queries with `<brick>_search_docs`: an exact identifier, a phrase, a heading.
   - Check: each returns the new source in its first three results.

## This installation

<!-- FILL: what=fetch and index commands of the bricks on this machine; find=read the README.md of one brick in .agents/mcp/; verify=running the index build on the brick ends without error -->

<!-- FILL: what=where new sources are reviewed before entering (person or merge request); find=ask the human; verify=the reviewer is written here -->

## Stop and ask the human if

- The licence is missing, non-commercial or forbids changes.
- The source holds internal documents that must not leave the internal network.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Convert the files to Markdown first." | Take them as they are; the server splits each format. |
| "The version does not matter." | Agents need the version to trust the page. |

## Definition of done

- [ ] Source recorded with version, commit or date, licence.
- [ ] Index rebuilt; three queries find it.

## Local completion checklist

- [ ] Fetch and index commands
- [ ] Review of new sources
