---
title: "Breaking change: Assembly.GetCallingAssembly behavior changes when stack trace support is disabled"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/assembly-getcallingassembly-stacktracesupport-disabled.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Assembly.GetCallingAssembly behavior changes when stack trace support is disabled

`System.Reflection.Assembly.GetCallingAssembly` now supports Native AOT and uses stack trace data to resolve the caller. If stack trace support is disabled, the method now throws `System.NotSupportedException` on both Native AOT and CoreCLR.

## Version introduced

.NET 11

## Previous behavior

Previously, on Native AOT, `System.Reflection.Assembly.GetCallingAssembly` always threw `System.PlatformNotSupportedException`. Previously, on CoreCLR, the method returned the calling assembly even if `StackTraceSupport` was set to `false`.

## New behavior

Starting in .NET 11, on Native AOT, `System.Reflection.Assembly.GetCallingAssembly` returns the calling assembly by inspecting stack trace data. Starting in .NET 11, on both Native AOT and CoreCLR, the method throws `System.NotSupportedException` if the `StackTraceSupport` feature switch is set to `false`.

The exception message is:

> Unable to retrieve stack trace information when StackTraceSupport feature switch is set to false.

## Type of breaking change

This change is a behavioral change.

## Reason for change

To return a correct caller, `System.Reflection.Assembly.GetCallingAssembly` requires stack trace data. If stack trace support is unavailable, the runtime can't determine the caller reliably. The runtime now throws `System.NotSupportedException` instead of returning an incorrect result. For Native AOT support details, see dotnet/runtime#129963.

## Recommended action

If you publish with `StackTraceSupport` set to `false` and your app calls `System.Reflection.Assembly.GetCallingAssembly`, expect `System.NotSupportedException`. Use one of these options:

- Enable stack trace support by removing the switch or setting `StackTraceSupport` to `true`.
- Remove calls to `System.Reflection.Assembly.GetCallingAssembly`.
- Catch `System.NotSupportedException` and handle the fallback path explicitly.

## Affected APIs

- `System.Reflection.Assembly.GetCallingAssembly`
