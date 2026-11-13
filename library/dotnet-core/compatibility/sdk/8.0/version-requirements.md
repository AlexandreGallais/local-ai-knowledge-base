---
title: "Breaking change: Version requirements for .NET 8 SDK"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/8.0/version-requirements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Version requirements for .NET 8 SDK

Per the published support rules, the minimum Visual Studio and MSBuild version for each new major release is updated with a one quarter delay. For the .NET 8 release:

- 8.0.100 requires version 17.7 to be loaded but only supports targeting .NET 7 in that version.
- 8.0.200 requires version 17.8.
- 8.0.400 requires version 17.9.

To target `net8.0`, you must use version 17.8 or later.

## Version introduced

.NET SDK 8

## Previous behavior

- .NET 7.0.1xx versions required version 17.4 of Visual Studio and MSBuild.
- .NET 7.0.4xx versions required version 17.7 of Visual Studio and MSBuild.

## New behavior

The following table shows the minimum version of Visual Studio and MSBuild you need to use the .NET 8.0.xxx SDK.

| NET SDK version   | Minimum Visual Studio and MSBuild version |
| ----------------- | ----------------------------------------- |
| 8.0.100           | 17.7                                      |
| 8.0.200           | 17.8                                      |
| 8.0.300           | 17.8                                      |
| 8.0.400           | 17.9                                      |

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This is part of the standard support policy for the SDK as not all prior versions of Visual Studio and MSBuild can be supported.

## Recommended action

Upgrade your Visual Studio version to the required version.

## Affected APIs

N/A

## See also

- Targeting and support rules
