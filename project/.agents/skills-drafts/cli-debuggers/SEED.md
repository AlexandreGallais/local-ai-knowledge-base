# SEED: cli-debuggers  (DBG-06, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: cli-debuggers
description: "Debugs with command-line debuggers when no IDE is available - gdb or lldb, node --inspect, pdb or debugpy, jdb, netcoredbg - breakpoints, stepping, variables. Use when a bug needs stepping through code, inspecting variables at a point, or attaching to a running process."
metadata:
  id: DBG-06
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed debuggers per language.
- [ ] Start under the debugger, set a breakpoint at file:line, run, print variables, step, backtrace.
- [ ] Attach to a running process and to a process in a container.
- [ ] Non-interactive use (gdb -batch -ex, pdb with breakpoint()).

## Known pitfalls to confirm or drop

- Interactive debuggers block the agent's shell; use batch modes.
- Optimised builds hide variables; build with debug info.

## MCP servers and example queries

- cpp-official-docs: gdb batch mode
- python-official-docs: pdb breakpoint
- js-official-docs: node inspect
- java-official-docs: jdb
- csharp-official-docs: debugging .NET command line
