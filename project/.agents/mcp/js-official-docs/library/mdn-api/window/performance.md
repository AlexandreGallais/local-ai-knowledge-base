---
title: "Window: performance property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/performance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: performance property

The **`performance`** read-only property of the `Window` interface returns a `Performance` object, which can be used to gather performance information about code running in the window's scope.

Performance entries are per context. If you create a mark on the main thread (or other worker), you cannot see it in a worker thread, and vice versa.

## Value

A `Performance` object offering access to performance and timing-related information about code running in the window's scope.

## See also

- `WorkerGlobalScope.performance`
