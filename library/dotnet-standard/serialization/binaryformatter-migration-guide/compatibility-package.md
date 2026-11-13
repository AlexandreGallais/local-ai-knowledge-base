---
title: "BinaryFormatter migration guide: Compatibility Package"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/compatibility-package.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter compatibility package

> **Caution:**
> The compatibility package is not supported and unsafe. We strongly recommend against taking a dependency on this package and instead migrate away from BinaryFormatter.

.NET 9+ users who can't migrate away from `BinaryFormatter` can install the unsupported System.Runtime.Serialization.Formatters NuGet package and set the `System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization` AppContext switch to `true`.

> **Note:**
> Please note that this package doesn't change the type identity of BinaryFormatter. Existing libraries don't need to be updated to depend on this package in order to use it. The only place that needs to depend on this package is the application project.

The package replaces the in-box implementation of BinaryFormatter with a functioning one, including its vulnerabilities and risks. It's meant as a stop gap if you can't wait with migrating to .NET 9 and later while not having replaced the usages of BinaryFormatter yet. We still strongly recommend you migrate away from BinaryFormatter.

```xml
<PropertyGroup>
  <TargetFramework>net9.0</TargetFramework>
  <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
</PropertyGroup>

<ItemGroup>
  <PackageReference Include="System.Runtime.Serialization.Formatters" Version="9.0.0-*" />
</ItemGroup>
```

> **Caution:**
> The compatibility package is not supported and unsafe. We strongly recommend against taking a dependency on this package and instead migrate away from BinaryFormatter.
