---
title: "Breaking change - CoreCLR trace events replace Mono trace events"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/maui/11/runtime-trace-events.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CoreCLR trace events replace Mono trace events

In .NET 11, CoreCLR trace events replace Mono trace events.

## Version introduced

.NET 11

## Previous behavior

Mobile trace and profiler tools could request Mono events. Some tools used the
Mono-only `Microsoft-DotNETRuntimeMonoProfiler` provider for method enter and
leave tracing.

Mono EventPipe was a separate component. Mobile Release builds could leave that
component out.

## New behavior

`dotnet-trace` and `.nettrace` files remain supported.
dotnet-dsrouter
can connect the mobile diagnostic port over TCP.

CoreCLR events replace the smaller set of Mono events. A provider with the same
name might still use different event IDs, data, ordering, or stack information.
CoreCLR doesn't provide the `Microsoft-DotNETRuntimeMonoProfiler` provider.

EventPipe should otherwise work in the same way for most users. CoreCLR
diagnostics are part of the mobile runtime, but diagnostics must be enabled when
the app is built. Set `EnableDiagnostics=true` to enable diagnostics.

See Tracing .NET for Android applications
and the
Apple `EnableDiagnostics` build property.

## Type of breaking change

This change can affect source compatibility, binary compatibility, and behavior.

## Reason for change

CoreCLR and Mono provide different runtime events and profiler features.

## Recommended action

- Test custom trace tools with the documented
  runtime events
  and
  well-known providers.
- Stop requesting `Microsoft-DotNETRuntimeMonoProfiler`.

## Affected APIs

The `Microsoft-DotNETRuntimeMonoProfiler` EventPipe provider and Mono event
schemas.
