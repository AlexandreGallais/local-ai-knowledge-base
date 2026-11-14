---
title: "Breaking change: Source Link included in the .NET SDK"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/8.0/source-link.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Source Link included in the .NET SDK

The Source Link build tooling is now included in the .NET SDK. Source Link enables packages and applications to embed information about the source control information of the built artifacts. As a side effect, commit information is included in the `InformationalVersion` value of built libraries and applications.

> **Note:**
> This change affects any project that's built with the .NET 8 SDK, even those that target .NET 7 or an earlier version.

## Previous behavior

Prior to this change, `InformationalVersion` did not include any build metadata. The default `InformationalVersion` of a library or application was the `Version` property.

## New behavior

Starting in .NET 8, `InformationalVersion` includes the `SourceRevisionId` property in all cases. For example, the default `InformationalVersion` of a library or application is the `Version` property *and* the `SourceRevisionId` property.

## Version introduced

.NET 8 Preview 4

## Type of breaking change

This change can affect source compatibility.

## Reason for change

Source Link enables rich editor tooling, like go-to-definition support for non-local source files. This benefit is worth including by default for all artifacts.

## Recommended action

If your build process or code doesn't expect Source Revision information in `InformationalVersion`, you can disable the new behavior by setting the `IncludeSourceRevisionInInformationalVersion` property to `false` in your project file.

```xml
<PropertyGroup>
  <IncludeSourceRevisionInInformationalVersion>false</IncludeSourceRevisionInInformationalVersion>
</PropertyGroup>
```

## See also

- `System.Reflection.AssemblyInformationalVersionAttribute`
