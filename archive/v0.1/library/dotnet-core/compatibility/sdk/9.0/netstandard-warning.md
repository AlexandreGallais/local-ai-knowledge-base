---
title: "Breaking change: Warning emitted for .NET Standard 1.x targets"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/9.0/netstandard-warning.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Warning emitted for .NET Standard 1.x targets

A warning is now emitted when a project that targets `netstandard1.x` is built with the .NET 9+ SDK.

## Previous behavior

Previously, you could build a project that targeted .NET Standard 1.0 - .NET Standard 1.6 without any build warnings.

## New behavior

Starting in .NET 9, if you build a project that targets .NET Standard 1.0 - .NET Standard 1.6, the following warning is emitted:

> warning NETSDK1215: Targeting .NET Standard prior to 2.0 is no longer recommended. See <https://aka.ms/dotnet/dotnet-standard-guidance> for more details.

## Version introduced

.NET 9 Preview 6

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The build warning was introduced to encourage customers to target .NET Standard 2.0 or .NET 6+. If you target .NET Standard 1.x, you're limiting yourself to a subset of .NET Framework 4.5, which is over 10 years old. A lot of innovation has happened since then that you're missing out on. In addition, .NET Standard 1.x is distributed as a granular set of NuGet packages, which creates a large package dependency graph and results in a lot of packages being downloaded when the project is built.

For more information, see What is the downside of targeting .NET Standard 1.x?.

## Recommended action

Update your `TargetFramework` property to `netstandard2.0` or `netstandard2.1`.

If you must stay on an older .NET Standard version, you can set `<CheckNotRecommendedTargetFramework>` to `false` in your project file (for example, *.csproj* file) or *Directory.Build.props* file to skip the target framework version check:

```xml
<PropertyGroup>
  ...
  <CheckNotRecommendedTargetFramework>false</CheckNotRecommendedTargetFramework>
</PropertyGroup>
```

Alternatively, you can suppress the warning using the `<NoWarn>` property in your project file:

```xml
<PropertyGroup>
  ...
  <!-- Disable "Targeting .NET Standard prior to 2.0 is no longer recommended." warning -->
  <NoWarn>$(NoWarn);NETSDK1215</NoWarn>
</PropertyGroup>
```

## Affected APIs

N/A

## See also

- .NET Standard Targeting Recommendations
