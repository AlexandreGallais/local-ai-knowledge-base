---
title: "NETSDK1013: The TargetFramework value was not recognized."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1013.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1013: The TargetFramework value was not recognized

**This article applies to:** ✔️ .NET Core 3.1.100 SDK and later versions

The SDK tries to parse the values provided in the project file for `<TargetFramework>` or `<TargetFrameworks>` into a well known value. If the value is not recognized, the `TargetFrameworkIdentifier` or `TargetFrameworkVersion` value might be set to an empty string or `Unsupported`.

To resolve this, check the spelling of your `TargetFramework` value from the list of supported frameworks.
You can also set the `TargetFrameworkIdentifier` and `TargetFrameworkVersion` properties directly in your project file.

```xml
<PropertyGroup Condition="'$(TargetFrameworkIdentifier)' == ''">
  <TargetFrameworkIdentifier>.NETCoreApp</TargetFrameworkIdentifier>
  <TargetFrameworkVersion>8.0</TargetFrameworkVersion>
</PropertyGroup>
```
