---
title: "Breaking change: mono launch target not set for .NET Framework apps"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/11/mono-launch-target-removed.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# mono launch target not set for .NET Framework apps

The .NET SDK no longer automatically sets `mono` as the launch target for .NET Framework applications on Linux when using `dotnet run`.

## Version introduced

.NET 11

## Previous behavior

Previously, when you called `dotnet run` on a .NET Framework application on Linux, the SDK automatically set the `RunCommand` and `RunArguments` properties in the project file to use Mono as the runtime:

```xml
<RunCommand Condition="'$(RunCommand)' == ''">mono</RunCommand> 
<RunArguments Condition="'$(RunArguments)' == ''">&quot;$(TargetPath)&quot; $(StartArguments)</RunArguments> 
```

This allowed .NET Framework applications to be launched directly using `dotnet run` without additional configuration.

## New behavior

Starting in .NET 11, the SDK no longer automatically configures these properties. Running `dotnet run` on a .NET Framework application on Linux fails unless the `RunCommand` and `RunArguments` properties are explicitly set in the project file.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made because running .NET Framework applications on Linux using Mono is no longer officially supported. Mono ownership has transitioned, and the .NET SDK should not automatically configure launch targets for unsupported scenarios.

For more information, see dotnet/sdk PR #52091.

## Recommended action

If you need to continue running .NET Framework applications on Linux using Mono, you can manually configure the `RunCommand` and `RunArguments` properties in your project file.

## Affected APIs

None.
