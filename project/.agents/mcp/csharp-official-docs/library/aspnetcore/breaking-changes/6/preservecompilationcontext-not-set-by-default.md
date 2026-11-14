---
title: "Breaking change: PreserveCompilationContext not configured by default"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/preservecompilationcontext-not-set-by-default.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# PreserveCompilationContext not configured by default

`PreserveCompilationContext` is an MSBuild property that causes .NET Core projects to emit additional content to the application's dependency (.deps) file about how the app was compiled. This is primarily used to support runtime compilation scenarios.

Prior to .NET 6, `PreserveCompilationContext` was set to `true` for all apps that target the Razor (Microsoft.NET.Sdk.Razor) and Web (Microsoft.NET.Sdk.Web) SDKs. Starting in .NET 6, this property is no longer configured by default. However, packages such as Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation configure this property as required.

## Version introduced

ASP.NET Core 6.0

## Old behavior

The dependency file contains compilation context.

## New behavior

The dependency file no longer contains compilation context.

## Reason for change

This change improves build performance and startup time, and reduces the size of ASP.NET Core's build output.

## Recommended action

If your app requires this feature and does not reference a package that configures the property, add the `PreserveCompilationContext` property to your project file.

```xml
<PropertyGroup>
   <PreserveCompilationContext>true</PreserveCompilationContext>
</PropertyGroup>
```

## Affected APIs

None.
