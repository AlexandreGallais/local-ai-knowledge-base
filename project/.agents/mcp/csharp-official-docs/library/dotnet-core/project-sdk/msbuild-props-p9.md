---
title: "MSBuild properties for Microsoft.NET.Sdk (part 9 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 9 of 9)

## Generated file properties

The following properties concern code in generated files:

- CompilerGeneratedFilesOutputPath
- DisableImplicitNamespaceImports
- EmitCompilerGeneratedFiles
- ImplicitUsings

### CompilerGeneratedFilesOutputPath

The `CompilerGeneratedFilesOutputPath` property specifies the directory where source generator output files are written when EmitCompilerGeneratedFiles is set to `true`. The path can be absolute or relative to the project directory. If you don't set this property, the generated files are placed in a *generated* subdirectory under the intermediate output path (usually *obj/\<configuration\>/\<targetframework\>/generated*).

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
  <CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

If you set this property to a path inside your project's source tree, the generated files might be picked up as source files by future builds. To avoid double-compilation, exclude the generated files from the `Compile` item:

```xml
<ItemGroup>
  <Compile Remove="$(CompilerGeneratedFilesOutputPath)\**\*.cs" />
</ItemGroup>
```

### DisableImplicitNamespaceImports

The `DisableImplicitNamespaceImports` property can be used to disable implicit namespace imports in Visual Basic <example-value> that target .NET 6 or a later version. Implicit namespaces are the default namespaces that are imported globally in a Visual Basic project. Set this property to `true` to disable implicit namespace imports.

```xml
<PropertyGroup>
  <DisableImplicitNamespaceImports>true</DisableImplicitNamespaceImports>
</PropertyGroup>
```

### EmitCompilerGeneratedFiles

The `EmitCompilerGeneratedFiles` property controls whether source generator output files are written to disk during the build. Set this property to `true` to enable this behavior. By default, source generator output exists only in memory and isn't written to disk.

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

When you set this property to `true`, the generated files are placed in a *generated* subdirectory under the intermediate output path (usually *obj/\<configuration\>/\<targetframework\>/generated*) unless you specify a different location using the CompilerGeneratedFilesOutputPath property.

Writing generated files to disk lets you inspect them. Only commit generated files to source control when you have a specific reason, such as when generators aren't available in your build environment or when you need reviewed, deterministic generated artifacts.

### ImplicitUsings

The `ImplicitUsings` property can be used to enable and disable implicit `global using` directives in C# projects that target .NET 6 or a later version and C# 10 or a later version. When the feature is enabled, the .NET SDK adds `global using` directives for a set of default namespaces based on the type of project SDK. Set this property to `true` or `enable` to enable implicit `global using` directives. To disable implicit `global using` directives, remove the property or set it to `false` or `disable`.

```xml
<PropertyGroup>
  <ImplicitUsings>enable</ImplicitUsings>
</PropertyGroup>
```

> **Note:**
> The templates for new C# projects that target .NET 6 or later have `ImplicitUsings` set to `enable` by default.

To define an explicit `global using` directive, add a Using item.

## Items

MSBuild items are inputs into the build system. Items are specified according to their type, which is the element name. For example, `Compile` and `Reference` are two common item types. The following additional item types are made available by the .NET SDK:

- AssemblyMetadata
- InternalsVisibleTo
- FrameworkReference
- PackageReference
- TrimmerRootAssembly
- Using

You can use any of the standard item attributes, for example, `Include` and `Update`, on these items. Use `Include` to add a new item, and use `Update` to modify an existing item. For example, `Update` is often used to modify an item that has implicitly been added by the .NET SDK.

### AssemblyMetadata

The `AssemblyMetadata` item specifies a key-value pair `System.Reflection.AssemblyMetadataAttribute` assembly attribute. The `Include` metadata becomes the key, and the `Value` metadata becomes the value.

```xml
<ItemGroup>
  <AssemblyMetadata Include="Serviceable" Value="True" />
</ItemGroup>
```

### InternalsVisibleTo

The `InternalsVisibleTo` item generates an `System.Runtime.CompilerServices.InternalsVisibleToAttribute` assembly attribute for the specified friend assembly.

```xml
<ItemGroup>
  <InternalsVisibleTo Include="MyProject.Tests" />
</ItemGroup>
```

If the friend assembly is signed, you can specify an optional `Key` metadata to specify its full public key. If you don't specify `Key` metadata and a `$(PublicKey)` is available, that key is used. Otherwise, no public key is added to the attribute.

### FrameworkReference

The `FrameworkReference` item defines a reference to a .NET shared framework.

The `Include` attribute specifies the framework ID.

The project file snippet in the following example references the Microsoft.AspNetCore.App shared framework.

```xml
<ItemGroup>
  <FrameworkReference Include="Microsoft.AspNetCore.App" />
</ItemGroup>
```

### PackageReference

The `PackageReference` item defines a reference to a NuGet package.

The `Include` attribute specifies the package ID. The `Version` attribute specifies the version or version range. For information about how to specify a minimum version, maximum version, range, or exact match, see Version ranges.

The project file snippet in the following example references the System.Runtime package.

```xml
<ItemGroup>
  <PackageReference Include="System.Runtime" Version="4.3.0" />
</ItemGroup>
```

You can also control dependency assets using metadata such as `PrivateAssets`.

```xml
<ItemGroup>
  <PackageReference Include="Contoso.Utility.UsefulStuff" Version="3.6.0">
    <PrivateAssets>all</PrivateAssets>
  </PackageReference>
</ItemGroup>
```

For more information, see Package references in project files.

### TrimmerRootAssembly

The `TrimmerRootAssembly` item lets you exclude an assembly from *trimming*. Trimming is the process of removing unused parts of the runtime from a packaged application. In some cases, trimming might incorrectly remove required references.

The following XML excludes the `System.Security` assembly from trimming.

```xml
<ItemGroup>
  <TrimmerRootAssembly Include="System.Security" />
</ItemGroup>
```

For more information, see Trimming options.

### Using

The `Using` item lets you globally include a namespace across your C# project, such that you don't have to add a `using` directive for the namespace at the top of your source files. This item is similar to the `Import` item that can be used for the same purpose in Visual Basic projects. This property is available starting in .NET 6.

```xml
<ItemGroup>
  <Using Include="My.Awesome.Namespace" />
</ItemGroup>
```

You can also use the `Using` item to define global `using <alias>` and `using static <type>` directives.

```xml
<ItemGroup>
  <Using Include="My.Awesome.Namespace" Alias="Awesome" />
</ItemGroup>
```

For example:

- `<Using Include="Microsoft.AspNetCore.Http.Results" Alias="Results" />` emits `global using Results = global::Microsoft.AspNetCore.Http.Results;`
- `<Using Include="Microsoft.AspNetCore.Http.Results" Static="True" />` emits `global using static global::Microsoft.AspNetCore.Http.Results;`

For more information, see aliased `using` directives and `using static <type>` directives.

## Item metadata

In addition to the standard MSBuild item attributes, the following item metadata tags are made available by the .NET SDK:

- CopyToPublishDirectory
- LinkBase

### CopyToPublishDirectory

The `CopyToPublishDirectory` metadata on an MSBuild item controls when the item is copied to the publish directory. The following table shows the allowable values.

| Value | Description |
| ------ | ------------ |
| `PreserveNewest` | Only copies the item if it has changed in the source location. |
| `IfDifferent` | Only copies the item if it has changed either in the source or target location. This setting is helpful for situations where you need to reset changes that occur after publishing. |
| `Always` | Always copies the item. |
| `Never` | Never copies the item. |

From a performance standpoint, `PreserveNewest` is preferable because it enables an incremental build. Avoid using `Always` and use `IfDifferent` instead, which avoids I/O writes with no effect.

```xml
<ItemGroup>
  <None Update="appsettings.Development.json" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
</ItemGroup>
```

### LinkBase

For an item that's outside of the project directory and its subdirectories, the publish target uses the item's Link metadata to determine where to copy the item to. `Link` also determines how items outside of the project tree are displayed in the Solution Explorer window of Visual Studio.

If `Link` is not specified for an item that's outside of the project cone, it defaults to `%(LinkBase)\%(RecursiveDir)%(Filename)%(Extension)`. `LinkBase` lets you specify a sensible base folder for items outside of the project cone. The folder hierarchy under the base folder is preserved via `RecursiveDir`. If `LinkBase` is not specified, it's omitted from the `Link` path.

```xml
<ItemGroup>
  <Content Include="..\Extras\**\*.cs" LinkBase="Shared"/>
</ItemGroup>
```

The following image shows how a file that's included via the previous item `Include` glob displays in Solution Explorer.

## See also

- MSBuild schema reference
- Common MSBuild properties
- MSBuild properties for NuGet pack
- MSBuild properties for NuGet restore
- Customize a build
