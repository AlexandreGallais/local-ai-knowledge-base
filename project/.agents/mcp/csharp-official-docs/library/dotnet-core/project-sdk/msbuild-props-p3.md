---
title: "MSBuild properties for Microsoft.NET.Sdk (part 3 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 3 of 9)

### SatelliteResourceLanguages

The `SatelliteResourceLanguages` property lets you specify which languages you want to preserve satellite resource assemblies for during build and publish. Many NuGet packages include localized resource satellite assemblies in the main package. For projects that reference these NuGet packages that don't require localized resources, the localized assemblies can unnecessarily inflate the build and publish output size. By adding the `SatelliteResourceLanguages` property to your project file, only localized assemblies for the languages you specify will be included in the build and publish output. For example, in the following project file, only English (US) and German (Germany) resource satellite assemblies will be retained.

```xml
<PropertyGroup>
  <SatelliteResourceLanguages>en-US;de-DE</SatelliteResourceLanguages>
</PropertyGroup>
```

> **Note:**
>
> - You must specify this property in the project that references the NuGet package with localized resource satellite assemblies.
> - To specify multiple languages as an argument to `dotnet publish`, you must add *three pairs* of quotation marks around the language identifiers. For example:
>
>   `dotnet msbuild multi.msbuildproj -p:SatelliteResourceLanguages="""de;en"""`

### SelfContained

The `SelfContained` property informs `dotnet build` and `dotnet publish` to build or publish an app as a self-contained app. This property is useful when you can't use the `--self-contained` argument with the dotnet command—for example, when you're publishing at the solution level. In that case, you can add the `SelfContained` MSBuild property to a project or *Directory.Build.Props* file.

This property is similar to the PublishSelfContained property. It's recommended to use `PublishSelfContained` instead of `SelfContained` when possible.

```xml
<PropertyGroup>
  <SelfContained>true</SelfContained>
</PropertyGroup>
```

### UseAppHost

The `UseAppHost` property controls whether or not a native executable is created for a deployment. A native executable is required for self-contained deployments. A framework-dependent executable is created by default. Set the `UseAppHost` property to `false` to disable generation of the executable.

```xml
<PropertyGroup>
  <UseAppHost>false</UseAppHost>
</PropertyGroup>
```

For more information about deployment, see .NET application deployment.

### UseNativeLibPrefix

The `UseNativeLibPrefix` property controls whether NativeAOT applies the `lib` prefix to non-executable native library outputs on Unix platforms. By default, the `lib` prefix is applied, which aligns with Unix naming conventions for shared and static libraries (for example, `libmylib.so`, `libmylib.a`).

Set `UseNativeLibPrefix` to `false` to opt out of the default behavior:

```xml
<PropertyGroup>
  <UseNativeLibPrefix>false</UseNativeLibPrefix>
</PropertyGroup>
```

This property was introduced in .NET 11. For more information, see NativeAOT uses lib prefix for native library outputs on Unix.

## Trim-related properties

Numerous MSBuild properties are available to fine tune trimming, which is a feature that trims unused code from self-contained deployments. These options are discussed in detail at Trimming options. The following table provides a quick reference.

| Property | Values | Description |
| - | - | - |
| `PublishTrimmed` | `true` or `false` | Controls whether trimming is enabled during publish. |
| `TrimMode` | `full` or `partial` | Default is `full`. Controls the trimming granularity. |
| `SuppressTrimAnalysisWarnings` | `true` or `false` | Controls whether trim analysis warnings are produced. |
| `EnableTrimAnalyzer` | `true` or `false` | Controls whether a subset of trim analysis warnings are produced. You can enable analysis even if `PublishTrimmed` is set to `false`. |
| `ILLinkTreatWarningsAsErrors` | `true` or `false` | Controls whether trim warnings are treated as errors. For example, you may want to set this property to `false` when `TreatWarningsAsErrors` is set to `true`.  |
| `TrimmerSingleWarn` | `true` or `false` | Controls whether a single warning per assembly is shown or all warnings. |
| `TrimmerRemoveSymbols` | `true` or `false` | Controls whether all symbols are removed from a trimmed application. |
