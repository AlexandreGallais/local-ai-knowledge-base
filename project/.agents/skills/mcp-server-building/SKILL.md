---
name: mcp-server-building
description: "Manual: run only when the user explicitly asks for /mcp-server-building. Builds a local MCP server (tools, resources, prompts) with clear names and input schemas, capped outputs, and tests that run it as a process."
license: Apache-2.0
metadata:
  id: TOL-01
  stars: "4"
  nature: process
  mode: R
  wave: V2
  load: manual
---

# MCP server building

**Core rule:** each tool does one job, has a precise name and input schema, returns a short capped text, and is tested by starting the server as a process and calling it.

## When to use

- Use when: the user asks for `/mcp-server-building` to expose a capability to the agent.
- Do not use when: a script run by `shell` is enough (`automation-scripts`).

## Procedure

1. Write the tool list: name (`verb_object`), one-line purpose, inputs with types, output.
   - Check: no two tools overlap; at most 5 tools.
2. Pick the transport and runtime: stdio, Node or Python, as the existing bricks in `.agents/mcp/` do; reuse their `mcp.ts` or `mcp.py` core when present.
   - Check: the server starts with one command and needs no network.
3. Write the input schema of each tool (JSON Schema): required fields, enums, limits.
   - Check: an invalid call returns a one-line error, not a stack trace.
4. Cap every output (lines or characters) and say how to get more (an offset, a section name).
   - Check: the largest test answer stays under the cap.
5. Write tests that spawn the server, send `initialize` then `tools/list` then one `tools/call` per tool, and read the answers.
   - Check: the tests pass in Node or Python.
6. Declare the server in `opencode.json` under `mcp.servers` with `type: local` and its command.
   - Check: a new session lists the tools; one real call succeeds.

## Stop and ask the human if

- A tool would write files, run commands or reach a network: ask before giving it that power.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One tool with a mode argument." | Separate tools with clear names are picked more reliably. |
| "Return everything." | Large outputs flood the context. Cap and paginate. |

## Definition of done

- [ ] Tools named, schemas strict, outputs capped.
- [ ] Process-level tests pass; server declared and reachable.

## References

- `.agents/mcp/<brick>/server.ts` and `mcp.ts`: an existing local server to copy from.
- `references/SOURCE.md`: upstream and licence of this skill.
