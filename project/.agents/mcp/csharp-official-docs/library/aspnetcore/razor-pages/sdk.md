---
title: "ASP.NET Core Razor SDK"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/sdk.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor SDK

By Rick Anderson

## Overview

The .NET 6 SDK includes the `Microsoft.NET.Sdk.Razor` MSBuild SDK (Razor SDK). The Razor SDK:

* Is required to build, package, and publish projects containing Razor files for ASP.NET Core MVC-based or Blazor projects.
* Includes a set of predefined properties, and items that allow customizing the compilation of Razor (`.cshtml` or `.razor`) files.

The Razor SDK includes `Content` items with `Include` attributes set to the `**\*.cshtml` and `**\*.razor` globbing patterns. Matching files are published.

## Prerequisites

.NET 6 SDK

## Use the Razor SDK

Most web apps aren't required to explicitly reference the Razor SDK.

To use the Razor SDK to build class libraries containing Razor views or Razor Pages, we recommend starting with the Razor class library (RCL) project template. An RCL that's used to build Blazor (`.razor`) files minimally requires a reference to the Microsoft.AspNetCore.Components package. An RCL that's used to build Razor views or pages (`.cshtml` files) minimally requires targeting `netcoreapp3.0` or later and has a `FrameworkReference` to the Microsoft.AspNetCore.App metapackage in its project file.

### Properties

The following properties control the Razor's SDK behavior as part of a project build:

* `RazorCompileOnBuild`: When `true`, compiles and emits the Razor assembly as part of building the project. Defaults to `true`.
* `RazorCompileOnPublish`: When `true`, compiles and emits the Razor assembly as part of publishing the project. Defaults to `true`.
* `UseRazorSourceGenerator`: Defaults to `true`. When `true`:
  * Compiles using source generation.
  * Doesn't create `<app_name>.Views.dll`. Views are included in `<app_name>.dll`.
  * Supports .NET Hot Reload.

The properties and items in the following table are used to configure inputs and output to the Razor SDK.

| Items | Description |
| ----- | ----------- |
| `RazorGenerate` | Item elements (`.cshtml` files) that are inputs to code generation. |
| `RazorComponent` | Item elements (`.razor` files) that are inputs to Razor component code generation. |
| `RazorCompile` | Item elements (`.cs` files) that are inputs to Razor compilation targets. Use this `ItemGroup` to specify additional files to be compiled into the Razor assembly. |
| `RazorEmbeddedResource` | Item elements added as embedded resources to the generated Razor assembly. |

| Property | Description |
| -------- | ----------- |
| `RazorOutputPath` | The Razor output directory. |
| `RazorCompileToolset` | Used to determine the toolset used to build the Razor assembly. Valid values are `Implicit`, `RazorSDK`, and `PrecompilationTool`. |
| EnableDefaultContentItems | Default is `true`. When `true`, includes *web.config*, `.json`, and `.cshtml` files as content in the project. When referenced via `Microsoft.NET.Sdk.Web`, files under *wwwroot* and config files are also included. |
| `EnableDefaultRazorGenerateItems` | When `true`, includes `.cshtml` files from `Content` items in `RazorGenerate` items. |
| `GenerateRazorTargetAssemblyInfo` | Not used in .NET 6 or later. |
| `EnableDefaultRazorTargetAssemblyInfoAttributes` | Not used in .NET 6 or later. |
| `CopyRazorGenerateFilesToPublishDirectory` | When `true`, copies `RazorGenerate` items (`.cshtml`) files to the publish directory. Typically, Razor files aren't required for a published app if they participate in compilation at build-time or publish-time. Defaults to `false`. |
| `PreserveCompilationReferences` | When `true`, copy reference assembly items to the publish directory. Typically, reference assemblies aren't required for a published app if Razor compilation occurs at build-time or publish-time. Set to `true` if your published app requires runtime compilation. For example, set the value to `true` if the app modifies `.cshtml` files at runtime or uses embedded views. Defaults to `false`. |
| `IncludeRazorContentInPack` | When `true`, all Razor content items (`.cshtml` files) are marked for inclusion in the generated NuGet package. Defaults to `false`. |
| `EmbedRazorGenerateSources` | When `true`, adds RazorGenerate (`.cshtml`) items as embedded files to the generated Razor assembly. Defaults to `false`. |
| `GenerateMvcApplicationPartsAssemblyAttributes` | Not used in .NET 6 or later. |
| `DefaultWebContentItemExcludes` | A globbing pattern for item elements that are to be excluded from the `Content` item group in projects targeting the Web or Razor SDK |
| `ExcludeConfigFilesFromBuildOutput` | When `true`, *.config* and `.json` files do not get copied to the build output directory. |
| `AddRazorSupportForMvc` | When `true`, configures the Razor SDK to add support for the MVC configuration that is required when building applications containing MVC views or Razor Pages. This property is implicitly set for .NET Core 3.0 or later projects targeting the Web SDK |
| `RazorLangVersion` | The version of the Razor Language to target. |
| `EmitCompilerGeneratedFiles` | When set to `true`, the generated source files are written to disk. Setting to `true` is useful when debugging the compiler. The default is `false`. |

For more information on properties, see MSBuild properties.

### Runtime compilation of Razor views

* By default, the Razor SDK doesn't publish reference assemblies that are required to perform runtime compilation. This results in compilation failures when the application model relies on runtime compilation—for example, the app uses embedded views or changes views after the app is published. Set `CopyRefAssembliesToPublishDirectory` to `true` to continue publishing reference assemblies. Both code generation and compilation are supported by a single call to the compiler. A single assembly is produced that contains the app types and the generated views.

* For a web app, ensure your app is targeting the `Microsoft.NET.Sdk.Web` SDK.

## Razor language version

When targeting the `Microsoft.NET.Sdk.Web` SDK, the Razor language version is inferred from the app's target framework version. For projects targeting the `Microsoft.NET.Sdk.Razor` SDK or in the rare case that the app requires a different Razor language version than the inferred value, a version can be configured by setting the `<RazorLangVersion>` property in the app's project file:

```xml
<PropertyGroup>
  <RazorLangVersion>{VERSION}</RazorLangVersion>
</PropertyGroup>
```

Razor's language version is tightly integrated with the version of the runtime that it was built for. Targeting a language version that isn't designed for the runtime is unsupported and likely produces build errors.

## Additional resources

* MSBuild reference for .NET SDK projects
* Common MSBuild project items
