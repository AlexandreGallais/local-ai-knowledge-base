---
title: "Microsoft.AspNetCore.App metapackage for ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/metapackage-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Microsoft.AspNetCore.App for ASP.NET Core

-->
-->

 The ASP.NET Core shared framework (`Microsoft.AspNetCore.App`) contains assemblies that are developed and supported by Microsoft. `Microsoft.AspNetCore.App` is installed when the .NET Core 3.0 or later SDK is installed. The *shared framework* is the set of assemblies (`.dll` files) that are installed on the machine and includes a runtime component and a targeting pack.

* Projects that target the `Microsoft.NET.Sdk.Web` SDK implicitly reference the `Microsoft.AspNetCore.App` framework.

No additional references are required for these projects:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>
    ...
</Project>
```

The ASP.NET Core shared framework:

* Doesn't include third-party dependencies.
* Includes all supported packages by the ASP.NET Core team.
