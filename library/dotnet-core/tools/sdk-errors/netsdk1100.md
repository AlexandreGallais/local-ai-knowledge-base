---
title: "NETSDK1100: Set the `EnableWindowsTargeting` property to true"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1100.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1100: Set the EnableWindowsTargeting property to true

NETSDK1100 indicates that you're building a project that targets Windows on Linux or macOS. The full error message is similar to the following example:

> To build a project targeting Windows on this operating system, set the `EnableWindowsTargeting` property to true.

To resolve this error, set the `EnableWindowsTargeting` property to true. You can set it in the project file or by passing `/p:EnableWindowsTargeting=true` to a .NET CLI command, such as `dotnet build`. Here's an example project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <EnableWindowsTargeting>true</EnableWindowsTargeting>
  </PropertyGroup>
</Project>
```

If you want to apply this setting to your whole solution or repository, you can set it in a *Directory.Build.props* file.

By default, .NET downloads all targeting packs (and runtime packs for self-contained builds) for the current target framework whether they're needed or not, because they might be brought in by a transitive framework reference. We didn't want to ship the Windows targeting packs with the non-Windows SDK builds, but we also didn't want a vanilla Console or ASP.NET Core app to automatically download these targeting and runtime packs the first time you build. The `EnableWindowsTargeting` property enables them to be downloaded only if you opt in.

## See also

- EnableWindowsTargeting property
