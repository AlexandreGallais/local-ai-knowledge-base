# SEED: stack-node-backend  (STK-08, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: stack-node-backend
description: "Writes Node.js server code - streams, events, error handling, process management, graceful shutdown. Use when working on a Node.js server, CLI or worker, handling streams or large files, or when a Node process crashes or leaks."
metadata:
  id: STK-08
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Node version and module system of the project.
- [ ] Streams and backpressure (pipeline).
- [ ] Error handling: unhandled rejections, error events.
- [ ] Graceful shutdown on SIGTERM.

## Known pitfalls to confirm or drop

- Ignoring stream errors crashes the process.
- Reading large files whole into memory.

## MCP servers and example queries

- js-official-docs: stream pipeline, process SIGTERM, unhandledRejection
