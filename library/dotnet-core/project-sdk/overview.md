---
title: ".NET project SDK overview (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/project-sdk/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET project SDKs

Modern .NET projects are associated with a project software development kit (SDK). Each *project SDK* is a set of MSBuild targets and associated tasks that are responsible for compiling, packing, and publishing code. A project that references a project SDK is sometimes referred to as an *SDK-style project*.

## Available SDKs

The available SDKs include:

| ID                         | Description                                                                          | Repo                                   |
|----------------------------|--------------------------------------------------------------------------------------|----------------------------------------|
| `Microsoft.NET.Sdk`        | The .NET SDK                                                                         | <https://github.com/dotnet/sdk>        |
| `Microsoft.NET.Sdk.Web`    | The .NET Web SDK                                 | <https://github.com/dotnet/sdk>        |
| `Microsoft.NET.Sdk.Razor`  | The .NET Razor SDK                                   | <https://github.com/dotnet/aspnetcore> |
| `Microsoft.NET.Sdk.BlazorWebAssembly` | The .NET Blazor WebAssembly SDK | <https://github.com/dotnet/aspnetcore> |
| `Microsoft.NET.Sdk.Worker` | The .NET Worker Service SDK                              | <https://github.com/dotnet/aspnetcore> |
| `Aspire.AppHost.Sdk`       | The Aspire SDK                           | <https://github.com/microsoft/aspire>     |
| `MSTest.Sdk`               | The MSTest SDK                              | <https://github.com/microsoft/testfx>  |

The .NET SDK is the base SDK for .NET. The other SDKs reference the .NET SDK, and projects that are associated with the other SDKs have all the .NET SDK properties available to them. The Web SDK, for example, depends on both the .NET SDK and the Razor SDK.

For Windows Forms and Windows Presentation Foundation (WPF) projects, you specify the .NET SDK (`Microsoft.NET.Sdk`) and set some additional properties in the project file. For more information, see Enable .NET Desktop SDK.

MSBuild SDKs, which you can use to configure and extend your build, are listed at MSBuild SDKs.

You can also author your own SDK that can be distributed via NuGet.

## Project files

.NET projects are based on the MSBuild format. Project files, which have extensions like *.csproj* for C# projects and *.fsproj* for F# projects, are in XML format. The root element of an MSBuild project file is the Project element. The `Project` element has an optional `Sdk` attribute that specifies which SDK (and version) to use. To use the .NET tools and build your code, set the `Sdk` attribute to one of the IDs in the Available SDKs table.

```xml
<Project Sdk="Microsoft.NET.Sdk">
    <!-- Omitted for brevity... -->
</Project>
```

The `Project/Sdk` attribute and `Sdk` element enable additive SDKs. Consider the following example, where the Aspire SDK (`Aspire.AppHost.Sdk`) is added to the project atop the `Microsoft.NET.Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <Sdk Name="Aspire.AppHost.Sdk" Version="9.0.0" />
    <!-- Omitted for brevity... -->

</Project>
```

In the preceding project file, both SDKs are used to resolve dependencies in an additive nature. For more information, see Aspire SDK.

To specify an SDK that comes from NuGet, include the version at the end of the name, or specify the name and version in the *global.json* file.

```xml
<Project Sdk="MSBuild.Sdk.Extras/2.0.54">
  ...
</Project>
```

Another way to specify the SDK is with the top-level `Sdk` element:

```xml
<Project>
  <Sdk Name="Microsoft.NET.Sdk" />
  ...
</Project>
```

Referencing an SDK in one of these ways greatly simplifies project files for .NET. While evaluating the project, MSBuild adds implicit imports for `Sdk.props` at the top of the project file and `Sdk.targets` at the bottom.

```xml
<Project>
  <!-- Implicit top import -->
  <Import Project="Sdk.props" Sdk="Microsoft.NET.Sdk" />
  ...
  <!-- Implicit bottom import -->
  <Import Project="Sdk.targets" Sdk="Microsoft.NET.Sdk" />
</Project>
```

> **Tip:**
> On a Windows machine, the *Sdk.props* and *Sdk.targets* files can be found in the *%ProgramFiles%\dotnet\sdk\\[version]\Sdks\Microsoft.NET.Sdk\Sdk* folder.

### Preprocess the project file

You can see the fully expanded project as MSBuild sees it after the SDK and its targets are included by using the `dotnet msbuild -preprocess` command. The preprocess switch of the `dotnet msbuild` command shows which files are imported, their sources, and their contributions to the build without actually building the project.

If the project has multiple target frameworks, focus the results of the command on only one framework by specifying it as an MSBuild property. For example:

`dotnet msbuild -property:TargetFramework=net8.0 -preprocess:output.xml`

## Default includes and excludes

The SDK automatically manages three types of items for your project:

- `Compile` items: source code files (`*.cs`, `*.vb`, and other language-specific extensions) that get compiled into your assembly.
- `EmbeddedResource` items: `*.resx` files that get embedded into your assembly.
- `None` items: all other files tracked in the project, such as configuration and content files, that aren't compiled or embedded.

Unlike non-SDK .NET Framework projects, you don't need to specify these items in your project file, because the defaults cover most common use cases. This behavior makes the project file smaller and easier to understand and edit by hand, if needed.

The SDK uses glob patterns to determine which files belong to each item type:

- **Include glob**: Specifies which files to add to the item type.
- **Exclude glob**: Specifies which files to skip when applying the include glob.
- **Remove glob**: Specifies which files to remove from items that were already added by the include glob.

The following table shows the default glob patterns for each item type in the .NET SDK:

| Element | Include glob | Exclude glob | Remove glob |
|---------|--------------|--------------|-------------|
| Compile | \*\*/\*.cs (or other language extensions) | \*\*/\*.user;  \*\*/\*.\*proj;  \*\*/\*.sln(x);  \*\*/\*.vssscc  | N/A |
| EmbeddedResource  | \*\*/\*.resx | \*\*/\*.user; \*\*/\*.\*proj; \*\*/\*.sln(x); \*\*/\*.vssscc | N/A |
| None | \*\*/\* | \*\*/\*.user; \*\*/\*.\*proj; \*\*/\*.sln(x); \*\*/\*.vssscc     | \*\*/\*.cs; \*\*/\*.resx |

Because `None` uses `**/*` as its include glob, it would otherwise include *.cs* and *.resx* files that are already captured by `Compile` and `EmbeddedResource`. The remove glob (`**/*.cs; **/*.resx`) prevents those files from appearing in both item types at the same time.

> **Note:**
> The `./bin` and `./obj` folders, which are represented by the `$(BaseOutputPath)` and `$(BaseIntermediateOutputPath)` MSBuild properties, are excluded from the globs by default. Excludes are represented by the DefaultItemExcludes property.

The .NET Desktop SDK has additional includes and excludes for WPF. For more information, see WPF default includes and excludes.

> **Warning:**
> Avoid defining `Compile`, `EmbeddedResource`, or `None` items that duplicate the SDK's default `Include` globs. Duplicating included files causes the build to include the same files twice, which results in a NETSDK1022 build error. Customizations that use `Remove` or `Update`, or that add items after you set `EnableDefaultItems`, `EnableDefaultCompileItems`, or `EnableDefaultEmbeddedResourceItems` to `false`, are supported. For information about how to resolve the error, see NETSDK1022: Duplicate items were included.

## Implicit using directives

Starting in .NET 6, implicit `global using` directives are added to new C# projects. This means that you can use types defined in these namespaces without having to specify their fully qualified name or manually add a `using` directive. The *implicit* aspect refers to the fact that the `global using` directives are added to a generated file in the project's *obj* directory.

Implicit `global using` directives are added for projects that use one of the following SDKs:

- `Microsoft.NET.Sdk`
- `Microsoft.NET.Sdk.Web`
- `Microsoft.NET.Sdk.Worker`
- `Microsoft.NET.Sdk.WindowsDesktop`

A `global using` directive is added for each namespace in a set of default namespaces that are based on the project's SDK. These default namespaces are shown in the following table.

| SDK | Default namespaces |
|-----|--------------------|
| Microsoft.NET.Sdk | `System``System.Collections.Generic``System.IO``System.Linq``System.Net.Http``System.Threading``System.Threading.Tasks` |
| Microsoft.NET.Sdk.Web | Microsoft.NET.Sdk namespaces`System.Net.Http.Json``Microsoft.AspNetCore.Builder``Microsoft.AspNetCore.Hosting``Microsoft.AspNetCore.Http``Microsoft.AspNetCore.Routing``Microsoft.Extensions.Configuration``Microsoft.Extensions.DependencyInjection``Microsoft.Extensions.Hosting``Microsoft.Extensions.Logging` |
| Microsoft.NET.Sdk.Worker | Microsoft.NET.Sdk namespaces`Microsoft.Extensions.Configuration``Microsoft.Extensions.DependencyInjection``Microsoft.Extensions.Hosting``Microsoft.Extensions.Logging` |
| Microsoft.NET.Sdk.WindowsDesktop (Windows Forms) | Microsoft.NET.Sdk namespaces`System.Drawing``System.Windows.Forms` |
| Microsoft.NET.Sdk.WindowsDesktop (WPF) | Microsoft.NET.Sdk namespacesRemoved `System.IO`Removed `System.Net.Http` |

If you want to disable this feature, or if you want to enable implicit `global using` directives in an existing C# project, you can do so via the `ImplicitUsings` MSBuild property.

You can specify additional implicit `global using` directives by adding `Using` items (or `Import` items for Visual Basic <example-value>) to your project file, for example:

  ```xml
  <ItemGroup>
    <Using Include="System.IO.Pipes" />
  </ItemGroup>
  ```

> **Note:**
> Starting with the .NET 8 SDK, `System.Net.Http` is no longer included in `Microsoft.NET.Sdk` when targeting .NET Framework.

## Implicit package references

When your project targets .NET Standard 1.0-2.0, the .NET SDK adds implicit references to certain *metapackages*. A metapackage is a framework-based package that consists only of dependencies on other packages. Metapackages are implicitly referenced based on the target frameworks specified in the TargetFramework or TargetFrameworks (plural) property of your project file.

```xml
<PropertyGroup>
  <TargetFramework>netstandard2.0</TargetFramework>
</PropertyGroup>
```

```xml
<PropertyGroup>
  <TargetFrameworks>netstandard2.0;net462</TargetFrameworks>
</PropertyGroup>
```

If needed, you can disable implicit package references using the DisableImplicitFrameworkReferences property, and add explicit references to just the frameworks or packages you need.

Recommendations:

- When targeting .NET Framework or .NET Standard 1.0-2.0, don't add an explicit reference to the `NETStandard.Library` metapackages via a `<PackageReference>` item in your project file. For .NET Standard 1.0-2.0 projects, these metapackages are implicitly referenced. For .NET Framework projects, if any version of `NETStandard.Library` is needed when using a .NET Standard-based NuGet package, NuGet automatically installs that version.
- If you need a specific version of the `NETStandard.Library` metapackage when targeting .NET Standard 1.0-2.0, you can use the `<NetStandardImplicitPackageVersion>` property and set the version you need.

## Build events

In SDK-style projects, use an MSBuild target named `PreBuild` or `PostBuild` and set the `BeforeTargets` property for `PreBuild` or the `AfterTargets` property for `PostBuild`.

```xml
<Target Name="PreBuild" BeforeTargets="PreBuildEvent">
    <Exec Command="&quot;$(ProjectDir)PreBuildEvent.bat&quot; &quot;$(ProjectDir)..\&quot; &quot;$(ProjectDir)&quot; &quot;$(TargetDir)&quot;" />
</Target>

<Target Name="PostBuild" AfterTargets="PostBuildEvent">
   <Exec Command="echo Output written to $(TargetDir)" />
</Target>
```

> **Note:**
>
> - You can use any name for the MSBuild targets. However, the Visual Studio IDE recognizes `PreBuild` and `PostBuild` targets, so by using those names, you can edit the commands in the IDE.
> - The properties `PreBuildEvent` and `PostBuildEvent` are not recommended in SDK-style projects, because macros such as `$(ProjectDir)` aren't resolved. For example, the following code is not supported:
>
> ```xml
> <PropertyGroup>
>   <PreBuildEvent>"$(ProjectDir)PreBuildEvent.bat" "$(ProjectDir)..\" "$(ProjectDir)" "$(TargetDir)"</PreBuildEvent>
> </PropertyGroup>
> ```
