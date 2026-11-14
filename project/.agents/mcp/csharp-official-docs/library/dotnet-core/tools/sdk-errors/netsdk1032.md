---
title: "NETSDK1032: RuntimeIdentifier and PlatformTarget must be compatible."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1032.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1032: RuntimeIdentifier and PlatformTarget must be compatible

The error `NETSDK1032` occurs when there's a mismatch between the `RuntimeIdentifier` (RID), such as `win-x64` or `linux-x64`, and the `PlatformTarget`, such as `x64` or `x86`. The full error message is similar to the following example:

> The `RuntimeIdentifier` platform '{RID}' and the `PlatformTarget` '{Target}' must be compatible.

The RID is specified in the project file or the command line. If not specified, the default RID used is `win-x64` for Windows, `linux-x64` for Linux, and `osx-x64` for macOS.

The `PlatformTarget` is specified in the project file or the command line. If not specified, the default is `AnyCPU`.

Here's an example of a `.csproj` file with incompatible RID and `PlatformTarget` settings:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <PlatformTarget>x86</PlatformTarget>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  </PropertyGroup>
</Project>
```

Fix the preceding `.csproj` file by changing either `PlatformTarget` or `RuntimeIdentifier`. For example, change `PlatformTarget` to match the RID:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <PlatformTarget>x64</PlatformTarget>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  </PropertyGroup>
</Project>
```

Or change the RID to match the `PlatformTarget`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <PlatformTarget>x86</PlatformTarget>
    <RuntimeIdentifier>win-x86</RuntimeIdentifier>
  </PropertyGroup>
</Project>
```
