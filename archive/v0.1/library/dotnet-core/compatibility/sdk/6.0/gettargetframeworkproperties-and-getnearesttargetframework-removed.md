---
title: "Breaking change: GetTargetFrameworkProperties and GetNearestTargetFramework removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/6.0/gettargetframeworkproperties-and-getnearesttargetframework-removed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# GetTargetFrameworkProperties and GetNearestTargetFramework removed from ProjectReference protocol

The `GetTargetFrameworkProperties` target and `GetNearestTargetFramework` task have been removed from the .NET SDK.

## Version introduced

.NET SDK 6.0.100

## Old behavior

The `GetTargetFrameworkProperties` target and the `GetNearestTargetFramework` task were available but not used. However, custom MSBuild logic could take a dependency on them.

## New behavior

The `GetTargetFrameworkProperties` target and the `GetNearestTargetFramework` task no longer exist.

## Reason for change

The `GetTargetFrameworkProperties` target and the `GetNearestTargetFramework` task were deprecated in MSBuild 15.5, and .NET 6 removes them completely.

## Recommended action

Use `GetTargetFrameworks` instead. For more information, see Targets required to be referenceable.

## Affected APIs

N/A
