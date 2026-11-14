---
title: "Breaking change - Debugging interfaces on mobile platforms changing to ICorDebug"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/maui/11/mobile-debugger-interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Debugging interfaces on mobile platforms changing to `ICorDebug`

In .NET 11, debugging interfaces on mobile platforms change to `ICorDebug`.

## Version introduced

.NET 11

## Previous behavior

.NET runtime debugging interfaces for Apple mobile platforms were based on the
Mono soft debugger and its underlying protocols.

## New behavior

CoreCLR debugging uses the documented `ICorDebug` interfaces. This matches the
debugging interface used by other CoreCLR platforms.

## Type of breaking change

This change is source incompatible, binary incompatible, and a behavioral change.

## Reason for change

Mono and CoreCLR use different debugger interfaces and components.

## Recommended action

- Replace Mono soft-debugger integration with `ICorDebug`.
- Follow the
  mobile CoreCLR debugger initialization guidance
  for the target-side component and `ICorDebug` initialization sequence.
- Microsoft's Visual Studio mobile debugger proxy is not a public debugging
  protocol. The Visual Studio license doesn't allow third parties to redistribute
  that proxy.

## Affected APIs

- Mono soft-debugger interfaces and protocols. CoreCLR debugger integrations use
  `ICorDebug`.
