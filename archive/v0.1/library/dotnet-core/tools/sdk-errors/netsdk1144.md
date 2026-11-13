---
title: "NETSDK1144: Optimizing assemblies for size failed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1144.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1144: Optimizing assemblies for size failed

## Error Message

The error `NETSDK1144` is reported when an error occurs in the trimming process. The full error message is similar to the following example:

> Optimizing assemblies for size failed. Optimization can be disabled by setting the `PublishTrimmed` property to false.

To disable trimming, set the `PublishTrimmed` property to `false` in the project file or the command line:

   ```xml
   <PropertyGroup>
     <PublishTrimmed>false</PublishTrimmed>
   </PropertyGroup>
   ```

   ```dotnetcli
   dotnet publish /p:PublishTrimmed=false
   ```

Here's an example of a `.csproj` file with trimming disabled:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <RuntimeIdentifier>linux-arm</RuntimeIdentifier>
    <PublishTrimmed>false</PublishTrimmed>
  </PropertyGroup>
</Project>
```
