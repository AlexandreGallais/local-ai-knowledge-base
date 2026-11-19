# SEED: async-and-concurrency  (DEV-12, 3 stars, V3)

## Final frontmatter (do not change)

```yaml
name: async-and-concurrency
description: "Writes correct asynchronous and concurrent code per language - async and await, threads, locks, race conditions, cancellation. Use when writing async functions, promises, tasks, threads or goroutines, when a bug appears only under load or randomly, or when adding cancellation or timeouts."
metadata:
  id: DEV-12
  stars: "3"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Async model of each language of the project (event loop, async runtime, thread pool).
- [ ] Awaiting every async call; unhandled rejections and lost tasks.
- [ ] Shared state: locks, atomics, message passing; the project's preferred way.
- [ ] Cancellation and timeouts per language (AbortController, CancellationToken, asyncio timeouts, tokio select).
- [ ] Testing concurrent code deterministically.

## Known pitfalls to confirm or drop

- Floating promises in JavaScript lose errors.
- async void in C# crashes the process on exceptions.
- Blocking calls inside an async runtime stall it (Python asyncio, tokio).
- Java synchronized on a non-final field.

## MCP servers and example queries

- js-official-docs: AbortController, unhandledrejection
- csharp-official-docs: CancellationToken, async void
- python-official-docs: asyncio timeout TaskGroup
- rust-official-docs: tokio select spawn_blocking
- java-official-docs: CompletableFuture, ExecutorService
