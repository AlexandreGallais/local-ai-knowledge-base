---
title: "NETSDK1145: Targeting or apphost pack missing"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1145.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1145: Targeting or apphost pack missing

**This article applies to:** ✔️ .NET 5.0.100 SDK and later versions

When the .NET SDK issues error NETSDK1145, the targeting or apphost pack is not installed and NuGet package restore is not supported. This is typically caused by having a newer SDK than the one included in Visual Studio for C++/CLI projects. Upgrade Visual Studio, remove _global.json_ if it specifies a certain SDK version, and uninstall the newer SDK. Alternatively, you could override the targeting or apphost version. Find the version that exists under the pack directory from the error message and matches the target framework of the project. Add the following XML to the project file (the `.csproj` file for the project):

For apphost pack:

```xml
<ItemGroup>
  <KnownAppHostPack Update="@(KnownAppHostPack)">
    <AppHostPackVersion Condition="'%(TargetFramework)' == 'TARGETFRAMEWORK'">EXISTINGVERSION</AppHostPackVersion>
  </KnownAppHostPack>
</ItemGroup>
```

For targeting pack:

```xml
<ItemGroup>
  <KnownFrameworkReference Update="@(KnownFrameworkReference)">
    <TargetingPackVersion Condition="'%(TargetFramework)' == 'TARGETFRAMEWORK'">EXISTINGVERSION</TargetingPackVersion>
  </KnownFrameworkReference>
</ItemGroup>
```
