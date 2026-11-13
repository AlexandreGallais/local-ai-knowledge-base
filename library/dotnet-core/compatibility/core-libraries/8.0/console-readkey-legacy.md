---
title: ".NET 8 breaking change: Legacy Console.ReadKey removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/console-readkey-legacy.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Legacy Console.ReadKey removed

The ability to use the legacy `System.Console.ReadKey*` implementation exposed via the `System.Console.UseNet6CompatReadKey` JSON setting and the `DOTNET_SYSTEM_CONSOLE_USENET6COMPATREADKEY` environment variable has been removed.

## Previous behavior

Previously, you could request the .NET 6 console key parsing logic via a runtime configuration switch.

## New behavior

Starting in .NET 8, you can't request the .NET 6 compatibility mode for `System.Console.ReadKey*`.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

The compatibility mode was introduced as a safety switch in case the `System.Console.ReadKey*` implementation rewrite introduced any bugs. Only one bug was reported, and it was fixed in .NET 7, so there's no need to keep the previous implementation anymore.

## Recommended action

If the new implementation doesn't work as expected, open a bug at <https://github.com/dotnet/runtime/issues> so it can be fixed.

## Affected APIs

- `System.Console.ReadKey*`
