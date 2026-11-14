---
title: "MSBuild properties for Microsoft.NET.Sdk (part 4 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 4 of 9)

## Build-related properties

The following MSBuild properties are documented in this section:

- ContinuousIntegrationBuild
- CopyDebugSymbolFilesFromPackages
- CopyDocumentationFilesFromPackages
- DisableImplicitFrameworkDefines
- DocumentationFile
- EmbeddedResourceUseDependentUponConvention
- EnablePreviewFeatures
- EnableWindowsTargeting
- GenerateDocumentationFile
- GenerateRequiresPreviewFeaturesAttribute
- OptimizeImplicitlyTriggeredBuild
- DisableRuntimeMarshalling
- BuildWithNetFrameworkHostedCompiler
- RoslynCompilerType

C# compiler options, such as `LangVersion` and `Nullable`, can also be specified as MSBuild properties in your project file. For more information, see C# compiler options.

### ContinuousIntegrationBuild

The `ContinuousIntegrationBuild` property indicates whether a build is executing on a continuous integration (CI) server. When set to `true`, this property enables settings that only apply to official builds as opposed to local builds on a developer machine. For example, stored file paths are normalized for official builds. But on a local development machine, the debugger isn't able to find local source files if file paths are normalized.

You can use your CI system's variable to conditionally set the `ContinuousIntegrationBuild` property. For example, the variable name for Azure Pipelines is `TF_BUILD`:

```xml
<PropertyGroup Condition="'$(TF_BUILD)' == 'true'">
  <ContinuousIntegrationBuild>true</ContinuousIntegrationBuild>
</PropertyGroup>
```

For GitHub Actions, the variable name is `GITHUB_ACTIONS`:

```xml
<PropertyGroup Condition="'$(GITHUB_ACTIONS)' == 'true'">
  <ContinuousIntegrationBuild>true</ContinuousIntegrationBuild>
</PropertyGroup>
```

### CopyDebugSymbolFilesFromPackages

When this property is set to `true`, all symbol files (also known as PDB files) from `PackageReference` items in the project are copied to the build output. These files can provide more informative stack traces for exceptions and make memory dumps and traces of the running application easier to understand. However, including these files results in an increased deployment bundle size.

This property was introduced in .NET SDK 7.0.100, though it defaults to not being specified.

### CopyDocumentationFilesFromPackages

When this property is set to `true`, all generated XML documentation files from `PackageReference` items in the project are copied to the build output. Note that enabling this feature will result in increased deployment bundle size.

This property was introduced in .NET SDK 7.0.100, though it defaults to not being specified.

### DisableImplicitFrameworkDefines

The `DisableImplicitFrameworkDefines` property controls whether or not the SDK generates preprocessor symbols for the target framework and platform for the .NET project. When this property is set to `false` or is unset (which is the default value) preprocessor symbols are generated for:

- Framework without version (`NETFRAMEWORK`, `NETSTANDARD`, `NET`)
- Framework with version (`NET48`, `NETSTANDARD2_0`, `NET6_0`)
- Framework with version minimum bound (`NET48_OR_GREATER`, `NETSTANDARD2_0_OR_GREATER`, `NET6_0_OR_GREATER`)

For more information on target framework monikers and these implicit preprocessor symbols, see Target frameworks.

Additionally, if you specify an operating system-specific target framework in the project (for example `net6.0-android`), the following preprocessor symbols are generated:

- Platform without version (`ANDROID`, `IOS`, `WINDOWS`)
- Platform with version (`IOS15_1`)
- Platform with version minimum bound (`IOS15_1_OR_GREATER`)

For more information on operating system-specific target framework monikers, see OS-specific TFMs.

Finally, if your target framework implies support for older target frameworks, preprocessor symbols for those older frameworks are emitted. For example, `net6.0` **implies** support for `net5.0` and so on all the way back to `.netcoreapp1.0`. So for each of these target frameworks, the *Framework with version minimum bound* symbol will be defined.

### DocumentationFile

The `DocumentationFile` property lets you specify a file name for the XML file that contains the documentation for your library. For IntelliSense to function correctly with your documentation, the file name must be the same as the assembly name and must be in the same directory as the assembly. If you don't specify this property but you do set GenerateDocumentationFile to `true`, the name of the documentation file defaults to the name of your assembly but with an *.xml* file extension. For this reason, it's often easier to omit this property and use the GenerateDocumentationFile property instead.

If you specify this property but you set GenerateDocumentationFile to `false`, the compiler *does not* generate a documentation file. If you specify this property and omit the GenerateDocumentationFile property, the compiler *does* generate a documentation file.

```xml
<PropertyGroup>
  <DocumentationFile>path/to/file.xml</DocumentationFile>
</PropertyGroup>
```

### EmbeddedResourceUseDependentUponConvention

The `EmbeddedResourceUseDependentUponConvention` property defines whether resource manifest file names are generated from type information in source files that are co-located with resource files. For example, if *Form1.resx* is in the same folder as *Form1.cs*, and `EmbeddedResourceUseDependentUponConvention` is set to `true`, the generated *.resources* file takes its name from the first type that's defined in *Form1.cs*. If `MyNamespace.Form1` is the first type defined in *Form1.cs*, the generated file name is *MyNamespace.Form1.resources*.

> **Note:**
> If `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata is specified for an `EmbeddedResource` item, the generated manifest file name for that resource file is based on that metadata instead.

By default, in a new .NET project that targets .NET Core 3.0 or a later version, this property is set to `true`. If set to `false`, and no `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata is specified for the `EmbeddedResource` item in the project file, the resource manifest file name is based off the root namespace for the project and the relative file path to the *.resx* file. For more information, see How resource manifest files are named.

```xml
<PropertyGroup>
  <EmbeddedResourceUseDependentUponConvention>true</EmbeddedResourceUseDependentUponConvention>
</PropertyGroup>
```

### EnablePreviewFeatures

The `EnablePreviewFeatures` property defines whether your project depends on any APIs or assemblies that are decorated with the `System.Runtime.Versioning.RequiresPreviewFeaturesAttribute` attribute. This attribute is used to signify that an API or assembly uses features that are considered to be in *preview* for the SDK version you're using. Preview features are not supported and may be removed in a future version. To enable the use of preview features, set the property to `True`.

```xml
<PropertyGroup>
  <EnablePreviewFeatures>True</EnablePreviewFeatures>
</PropertyGroup>
```

When a project contains this property set to `True`, the following assembly-level attribute is added to the *AssemblyInfo.cs* file:

```csharp
[assembly: RequiresPreviewFeatures]
```

An analyzer warns if this attribute is present on dependencies for projects where `EnablePreviewFeatures` is not set to `True`.

Library authors who intend to ship preview assemblies should set this property to `True`. If an assembly needs to ship with a mixture of preview and non-preview APIs, see the GenerateRequiresPreviewFeaturesAttribute section below.

### EnableWindowsTargeting

Set the `EnableWindowsTargeting` property to `true` to build Windows apps (for example, Windows Forms or Windows Presentation Foundation apps) on a non-Windows platform. If you don't set this property to `true`, you'll get build warning NETSDK1100. This error occurs because targeting and runtime packs aren't automatically downloaded on platforms that aren't supported. By setting this property, those packs are downloaded when cross-targeting.

> **Note:**
> This property is currently recommended to allow development on non-Windows platforms. But when the application is ready to be released, it should be built on Windows. When building on a non-Windows platform, the output may not be the same as when building on Windows. In particular, the executable is not marked as a Windows application (which means that it will always launch a console window) and won't have an icon embedded.

```xml
<PropertyGroup>
  <EnableWindowsTargeting>true</EnableWindowsTargeting>
</PropertyGroup>
```

### GenerateDocumentationFile

The `GenerateDocumentationFile` property controls whether the compiler generates an XML documentation file for your library. If you set this property to `true` and you don't specify a file name via the DocumentationFile property, the generated XML file is placed in the same output directory as your assembly and has the same file name (but with an *.xml* extension).

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

For more information about generating documentation from code comments, see XML documentation comments (C#), Document your code with XML (Visual Basic), or Document your code with XML (F#).

### GenerateRequiresPreviewFeaturesAttribute

The `GenerateRequiresPreviewFeaturesAttribute` property is closely related to the EnablePreviewFeatures property. If your library uses preview features but you don't want the entire assembly to be marked with the `System.Runtime.Versioning.RequiresPreviewFeaturesAttribute` attribute, which would require any consumers to enable preview features, set this property to `False`.

```xml
<PropertyGroup>
    <EnablePreviewFeatures>True</EnablePreviewFeatures>
    <GenerateRequiresPreviewFeaturesAttribute>False</GenerateRequiresPreviewFeaturesAttribute>
</PropertyGroup>
```

> **Important:**
> If you set the `GenerateRequiresPreviewFeaturesAttribute` property to `False`, you must be certain to decorate all public APIs that rely on preview features with `System.Runtime.Versioning.RequiresPreviewFeaturesAttribute`.

### OptimizeImplicitlyTriggeredBuild

To speed up the build time, builds that are implicitly triggered by Visual Studio skip code analysis, including nullable analysis. Visual Studio triggers an implicit build when you run tests, for example. However, implicit builds are optimized only when `TreatWarningsAsErrors` is not `true`. If you have `TreatWarningsAsErrors` set to `true` but you still want implicitly triggered builds to be optimized, you can set `OptimizeImplicitlyTriggeredBuild` to `True`. To turn off build optimization for implicitly triggered builds, set `OptimizeImplicitlyTriggeredBuild` to `False`.

```xml
<PropertyGroup>
    <OptimizeImplicitlyTriggeredBuild>True</OptimizeImplicitlyTriggeredBuild>
</PropertyGroup>
```

### DisableRuntimeMarshalling

The `DisableRuntimeMarshalling` property enables you to specify that you would like to disable runtime marshalling support for your project. If this property is set to `true`, then the `System.Runtime.CompilerServices.DisableRuntimeMarshallingAttribute` is added to the assembly and any P/Invokes or delegate-based interop will follow the rules for disabled runtime marshalling.

```xml
<PropertyGroup>
    <DisableRuntimeMarshalling>True</DisableRuntimeMarshalling>
</PropertyGroup>
```

### BuildWithNetFrameworkHostedCompiler

Specifying `BuildWithNetFrameworkHostedCompiler=true` is the equivalent of specifying `RoslynCompilerType=FrameworkPackage`. For more information, see RoslynCompilerType.
Specifying `BuildWithNetFrameworkHostedCompiler=false` ensures the automatic opt in to `RoslynCompilerType=FrameworkPackage` does not happen.
If `RoslynCompilerType` is specified explicitly, `BuildWithNetFrameworkHostedCompiler` has no effect.

### RoslynCompilerType

The `RoslynCompilerType` property controls the version of the C# or Visual Basic compiler. The following values are recognized:

- `Core`: Use the compiler that comes with the .NET SDK. This is the default since .NET 10, even when using .NET Framework MSBuild.
- `Framework`: Use the compiler that comes with .NET Framework MSBuild.
- `FrameworkPackage`: When using .NET Framework MSBuild, download and use a package with the .NET Framework compiler that corresponds to the .NET SDK version.
