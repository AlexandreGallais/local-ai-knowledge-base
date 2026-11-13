---
title: "Breaking change: StripSymbols defaults to true"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/deployment/8.0/stripsymbols-default.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# StripSymbols defaults to true

When .NET 7 introduced Native AOT deployment, it also introduced the `StripSymbols` property that optionally allows debugging symbols to be stripped from the produced executable on Linux into a separate file. The default value of the property was `false`. In .NET 8, the default value has changed to `true`.

## Previous behavior

With `PublishAOT`, debugging symbols on Linux were placed into the produced executable by default, with an opt-in option to place them into a separate *.dbg* file.

## New behavior

With `PublishAOT`, debugging symbols on Linux are placed into a *.dbg* file by default, with an opt-out option to place them into the executable.

## Version introduced

.NET 8 Preview 4

## Reason for change

Based on feedback, we determined that .NET users prefer the .NET-symbols convention instead of the platform-native convention. However, the option to strip the symbols was not discoverable enough.

## Recommended action

- If you rely on debugging symbols to be present in the main executable, add `<StripSymbols>false</StripSymbols>` to your project file to restore the previous behavior.
- If you choose to use the new default, verify that the debugging symbols in *.dbg* files are properly archived if you expect you'll need to debug the generated executables.

## Affected APIs

None.
