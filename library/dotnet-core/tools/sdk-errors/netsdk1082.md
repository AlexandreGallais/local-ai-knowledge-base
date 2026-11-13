---
title: "NETSDK1082: There was no runtime pack available"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1082.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1082: There was no runtime pack available

NETSDK1082 warns you that the runtime pack for your runtime identifier (RID) could not be found in your NuGet feed. The full error message is similar to the following example:

>There was no runtime pack for \<RuntimePack> available for the specified RuntimeIdentifier '\<RID>'.

.NET automatically downloads known runtime packs for self-contained applications but there could be a pointer to one that's not available to you. Investigate your NuGet configuration and feeds to find out why the required runtime pack is missing. In some scenarios, you might have to override the `LatestRuntimeFrameworkVersion` value to one that's available on your NuGet feeds by adding markup like the following example to the project file:

```xml
<ItemGroup>
  <KnownRuntimePack Update="@(KnownRuntimePack)">
    <LatestRuntimeFrameworkVersion Condition="'%(TargetFramework)' == 'TARGETFRAMEWORK'">EXISTINGVERSION</LatestRuntimeFrameworkVersion>
  </KnownRuntimePack>
</ItemGroup>
```

In this example, `TARGETFRAMEWORK` represents values like `net8.0` or `net6.0` -- basically anything that’s in the **.NET 5+ (and .NET Core)** list in Supported target frameworks. `EXISTINGVERSION` needs to be a valid version that's been released. For example, `6.0.7` for `net6.0`.
