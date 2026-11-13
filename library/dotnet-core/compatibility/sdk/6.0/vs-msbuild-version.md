---
title: "Breaking change: Version requirements for .NET 6 SDK"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/6.0/vs-msbuild-version.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Version requirements for .NET 6 SDK

Starting with the .NET SDK 6.0.300, the .NET SDK no longer loads in version 16.11 or earlier of Visual Studio or MSBuild.

## Version introduced

.NET SDK 6.0.300

## Old behavior

The .NET SDK would load in the 16.10 and 16.11 versions of Visual Studio and MSBuild.

## New behavior

The .NET SDK can only be used with version 17.0 or later of Visual Studio and MSBuild. In addition, any scenarios that use a source generator could fail when using a Visual Studio or MSBuild version earlier than version 17.2.

## Reason for change

Changes were made to features within the SDK that aren't compatible with Visual Studio version 16.11.

## Recommended action

Upgrade to Visual Studio 2022 version 17.0 or later. It's recommended that you use version 17.2 preview builds.

## Affected APIs

N/A
