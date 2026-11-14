---
title: "EventSource"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/eventsource.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# EventSource

**This article applies to: ✔️** .NET Core 3.1 and later versions **✔️** .NET Framework 4.5 and later versions

`System.Diagnostics.Tracing.EventSource` is a fast structured logging solution
built into the .NET runtime. On .NET Framework EventSource can send events to
Event Tracing for Windows (ETW) and
`System.Diagnostics.Tracing.EventListener`. On .NET Core EventSource
additionally supports EventPipe, a cross-platform tracing option. Most often developers use EventSource
logs for performance analysis, but EventSource can be used for any diagnostic tasks where logs are useful.
The .NET runtime is already instrumented with built-in events and you can log
your own custom events.

> **Note:**
> Many technologies that integrate with EventSource use the terms 'Tracing' and 'Traces' instead of 'Logging' and 'Logs'.
> The meaning is the same here.

- Getting started
- Instrumenting code to create events
- Collecting and viewing event traces
- Understanding Activity IDs
