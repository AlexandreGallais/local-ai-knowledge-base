---
title: "Breaking change: NuGet packages with no runtime assets aren't included in deps.json"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/deps-json-trimmed-packages.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NuGet packages with no runtime assets aren't included in deps.json

NuGet packages or other libraries that don't contribute any runtime assets are now excluded from the deps.json file if removing them wouldn't cause dependency resolution issues.

## Version introduced

.NET 10

## Previous behavior

Previously, all referenced NuGet packages and projects were included in the deps.json file as library entries, even if there were no assets used from them.

## New behavior

NuGet packages or other libraries might be excluded from the deps.json file if:

- They don't contribute any runtime assets, and
- Removing the library from the deps.json would not cause any libraries that do contribute runtime assets to no longer have a dependency path to them.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The deps.json file lists runtime dependencies and is used by the loader to load those dependencies. Some other tools also process the deps.json file. Including libraries that aren't actually used is less accurate and can lead to false positives for security scanners that use the deps.json file.

## Recommended action

To disable the new behavior, set the `TrimDepsJsonLibrariesWithoutAssets` MSBuild property to `false`:

```xml
<PropertyGroup>
  <TrimDepsJsonLibrariesWithoutAssets>false</TrimDepsJsonLibrariesWithoutAssets>
</PropertyGroup>
```

## Affected APIs

None.

## See also

- Pruning of framework-provided package references
