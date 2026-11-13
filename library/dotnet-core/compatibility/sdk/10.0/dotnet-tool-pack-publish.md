---
title: "Breaking change: .NET tool packaging might create RuntimeIdentifier-specific tool packages"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/dotnet-tool-pack-publish.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET tool packaging creates RuntimeIdentifier-specific tool packages

The .NET tool packaging process has changed when `RuntimeIdentifiers` are present in the project.
Since the SDK now supports creating platform-specific tools, `RuntimeIdentifiers` are used to determine the set of platforms for which to create tool packages.

## Version introduced

.NET 10

## Previous behavior

Previously when you ran `dotnet pack` on a project with `PackAsTool` set to `true`, it ignored any `RuntimeIdentifiers`.

## New behavior

Starting in .NET 10, `RuntimeIdentifiers` are used to determine the set of platforms for which to create tool packages.

## Type of breaking change

This is a behavioral change.

## Reason for change

This change enables the creation of optimized, platform-specific .NET Tool packages, and supports use cases like:

- Self-contained tools.
- Trimmed and AOT tools.
- Tools that can eventually be used on platforms without an SDK or runtime installed.

## Recommended action

If you want to create tools for only a subset of platforms, use `ToolPackageRuntimeIdentifiers`. If you want to disable RID-specific tool packages entirely, you should conditionally include or exclude the `RuntimeIdentifiers` property in your project file.

Alternatively, if you want to maintain the previous behavior (framework-dependent, platform-agnostic .NET Tools) even when a `RuntimeIdentifier` is specified, add the following properties to your project file:

```xml
<PropertyGroup>
  <CreateRidSpecificToolPackages>false</CreateRidSpecificToolPackages>
  <UseAppHost>false</UseAppHost>
</PropertyGroup>
```

## Affected APIs

None.
