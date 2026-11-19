# SEED: memory-and-leaks  (DBG-10, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: memory-and-leaks
description: "Finds memory leaks and resource leaks per runtime - heap snapshots, valgrind or ASan, handle counters. Use when memory grows over time, a process is killed for memory, file handles or connections run out, or a leak sanitizer reports a leak."
metadata:
  id: DBG-10
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Tools per runtime installed here (Chrome heap snapshots or node --inspect, valgrind, ASan and LeakSanitizer, dotnet-counters and dotnet-gcdump, JFR and heap dumps).
- [ ] Reproducing growth with a measured loop.
- [ ] Reading a heap snapshot or a leak report to the allocating code.
- [ ] Resource leaks (files, sockets, timers, listeners).

## Known pitfalls to confirm or drop

- Event listeners and timers never removed.
- Caches without bounds.

## MCP servers and example queries

- js-official-docs: heap snapshot, FinalizationRegistry
- cpp-official-docs: LeakSanitizer
- csharp-official-docs: dotnet-gcdump
- java-official-docs: heap dump jcmd
