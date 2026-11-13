---
title: ".NET 6 breaking change: EventSource callback behavior"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/eventsource-callback.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# EventSource callback behavior

For an `System.Diagnostics.Tracing.EventCommand.Disable`, the `System.Diagnostics.Tracing.EventSource` is now marked as disabled *before* the callback is issued.

## Previous behavior

Previously, the `System.Diagnostics.Tracing.EventSource.OnEventCommand(System.Diagnostics.Tracing.EventCommandEventArgs)` callback was issued for an `System.Diagnostics.Tracing.EventCommand.Disable` prior to setting `m_eventSourceEnabled=false`.

This meant that `System.Diagnostics.Tracing.EventSource.IsEnabled` returned `true` in the `System.Diagnostics.Tracing.EventSource.OnEventCommand(System.Diagnostics.Tracing.EventCommandEventArgs)` callback for a user `System.Diagnostics.Tracing.EventSource`, even if the command led to the `EventSource` being disabled. The callback happened after the ability to dispatch events was turned off though, so even if an `EventSource` tried to fire an event, it wasn't written.

## New behavior

Now, the `System.Diagnostics.Tracing.EventSource` is marked as disabled *before* the callback is issued for an `System.Diagnostics.Tracing.EventCommand.Disable`.

## Version introduced

- .NET 6 servicing
- .NET 7 servicing

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was necessary to support multiple `System.Diagnostics.Tracing.EventCounter` instances. The ability to have multiple instances has been requested by multiple customers.

In addition, `System.Diagnostics.Tracing.EventCommand.Enable` has always issued a consistent view: `System.Diagnostics.Tracing.EventSource.IsEnabled` accurately reports the enabled status, and `EventSource` can write events from the `OnEventCommand` callback. This change makes the `EventCommand.Disable` behavior consistent with `EventCommand.Enable`.

## Recommended action

It's unlikely that there's a scenario where the previous behavior is desired, and there's no way to revert the behavior.

## Affected APIs

- `System.Diagnostics.Tracing.EventCommand.Disable`
