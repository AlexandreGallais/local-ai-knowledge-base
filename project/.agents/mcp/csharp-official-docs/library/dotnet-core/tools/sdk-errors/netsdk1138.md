---
title: "NETSDK1138: The target framework is out of support"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1138.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1138: The target framework is out of support

NETSDK1138 indicates that your project targets a version of the framework that is out of support. The full error message is similar to the following example:

> The target framework '\<framework>' is out of support and will not receive security updates in the future. Please refer to <https://aka.ms/dotnet-core-support> for more information about the support policy.

Out-of-support versions include 1.0, 1.1, 2.0, 2.1, 2.2, 3.0, 3.1, 5, 6, and 7.

To resolve this error, change your project to target a supported version of .NET.

> **Tip:**
> You can use GitHub Copilot modernization to assess, plan, and upgrade your project to a supported version of .NET.

If you want to suppress the message without targeting a later framework, set the MSBuild property `CheckEolTargetFramework` to `false`. You can set it in the project file or by passing `/p:CheckEolTargetFramework=false` to a .NET CLI command, such as `dotnet build`. Here's an example project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.0</TargetFramework>
    <CheckEolTargetFramework>false</CheckEolTargetFramework>
  </PropertyGroup>
</Project>
```

Here's an example .NET CLI command:

```dotnetcli
dotnet build /p:CheckEolTargetFramework=false
```

## See also

* <https://aka.ms/dotnet-core-support>
