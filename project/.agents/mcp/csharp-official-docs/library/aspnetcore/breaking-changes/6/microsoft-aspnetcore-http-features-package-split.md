---
title: "Breaking change: Microsoft.AspNetCore.Http.Features split up"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/microsoft-aspnetcore-http-features-package-split.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Microsoft.AspNetCore.Http.Features split

Microsoft.AspNetCore.Http.Features has been split into the following two assemblies:

- Microsoft.AspNetCore.Http.Features
- Microsoft.Extensions.Features

For discussion, see GitHub issue dotnet/aspnetcore#32307.

## Version introduced

ASP.NET Core 6.0

## Old behavior

Microsoft.AspNetCore.Http.Features 5.0 shipped both in the ASP.NET shared framework and as a NuGet package. Microsoft.AspNetCore.Http.Features 5.0 targeted .NET 4.6.1, .NET Standard 2.0, and .NET 5.

## New behavior

Microsoft.AspNetCore.Http.Features 6.0 ships only in the ASP.NET shared framework, not as a NuGet package. It targets .NET 6 only.

Microsoft.Extensions.Features 6.0 ships in both the ASP.NET shared framework and as a NuGet package. It targets .NET 4.6.1, .NET Standard 2.0, and .NET 6.

The following types have been moved to the new Microsoft.Extensions.Features assembly:

- `Microsoft.AspNetCore.Http.Features.IFeatureCollection`
- `Microsoft.AspNetCore.Http.Features.FeatureCollection`
- `Microsoft.AspNetCore.Http.Features.FeatureReference`1`
- `Microsoft.AspNetCore.Http.Features.FeatureReferences`1`

These types are still in the `Microsoft.AspNetCore.Http.Features` namespace, and type forwards have been added for compatibility.

## Reason for change

This change was introduced for two reasons:

- Allows the core types to be shared more broadly across components.
- Allows the remaining Http-specific components in Microsoft.AspNetCore.Http.Features to take advantage of new runtime and language features.

## Recommended action

When upgrading to ASP.NET Core 6.0, remove any packages references for Microsoft.AspNetCore.Http.Features. Add a package reference for Microsoft.Extensions.Features only if required.

For class libraries that need to consume the types from Microsoft.AspNetCore.Http.Features, add a `FrameworkReference` item instead:

```xml
<ItemGroup>
  <FrameworkReference Include="Microsoft.AspNetCore.App" />
</ItemGroup>
```

For more information about adding the framework reference, see  Use the ASP.NET Core shared framework.

Libraries with out of date references may encounter a `System.TypeLoadException` or the following error:

**Error CS0433 The type '<example-value>' exists in both '<example-value>' and '<example-value>'**

To resolve the error, add a `FrameworkReference` to Microsoft.AspNetCore.App to any of the affected projects.

For questions, see dotnet/aspnetcore#32307.

## Affected APIs

- `Microsoft.AspNetCore.Http.Features.IFeatureCollection`
- `Microsoft.AspNetCore.Http.Features.FeatureCollection`
- `Microsoft.AspNetCore.Http.Features.FeatureReference`1`
- `Microsoft.AspNetCore.Http.Features.FeatureReferences`1`
