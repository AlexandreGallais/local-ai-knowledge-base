---
title: "MSBuild properties for Microsoft.NET.Sdk (part 8 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/project-sdk/msbuild-props.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 8 of 9)

## SDK-related properties

The following MSBuild properties are documented in this section:

- SdkAnalysisLevel

### SdkAnalysisLevel

Introduced in .NET 9, the `SdkAnalysisLevel` property can be used to configure how *strict* SDK tooling is. It helps you manage SDK warning levels in situations where you might not be able to pin SDKs via *global.json* or other means. You can use this property to tell a newer SDK to behave as if it were an older SDK, with regards to a specific tool or feature, without having to install the older SDK.

The allowed values of this property are SDK feature bands, for example, 8.0.100 and 8.0.400. The value defaults to the SDK feature band of the running SDK. For example, for SDK 9.0.102, the value to use is 9.0.100. (For information about how the .NET SDK is versioned, see How .NET is versioned.)

```xml
<PropertyGroup>
  <SdkAnalysisLevel>8.0.400</SdkAnalysisLevel>
</PropertyGroup>
```

For more information, see SDK Analysis Level Property and Usage.

The following table summarizes the diagnostics and behaviors affected by `SDKAnalysisLevel`.

| SDKAnalysisLevel | Description                     | Updated behavior |
|------------------|---------------------------------|------------------|
| 9.0.100          | Restore HTTP sources diagnostic | Emits NU1302 error instead of NU1803 warning. |
| 10.0.100         | 'Restore' package pruning       | PrunePackageReference is enabled by default for projects that target .NET 8+ or .NET Standard 2.0+. |
| 10.0.100         | 'Restore' resolver with lock files | Uses improved, .NET 9 dependency graph resolver instead of legacy dependency graph resolver (.NET 8 SDK and earlier). |
| 10.0.100         | 'Restore' behavior for PackageReference without a version | Emits NU1015 error instead of NU1603 warning. |
| 10.0.300         | 'Restore' multi-targeting with duplicate target frameworks | Enables multi-targeting with duplicate target frameworks using `TargetFramework` alias. |
| 10.0.300         | `TargetFramework` character validation | Emits NU1019 error for path separator characters (`/` or `\`) in a `TargetFramework` property, and NU1019 warning for non-ASCII characters. |
| 11.0.100         | MonoAndroid framework deprecation warning | Emits NU1703 warning when a package uses the deprecated `MonoAndroid` framework instead of a modern .NET target framework moniker. |
| 11.0.100         | `TargetFramework` non-ASCII character validation | Changes NU1019 from a warning to an error when a `TargetFramework` property contains non-ASCII characters. |

> **Note:**
> The behavior enabled by the `SdkAnalysisLevel` value ages out (expires) after three major releases. For example, version 11.0.100 only respects values down to 8.0.100. In version 12.0.100, features that could, in previous versions, be disabled by setting an `SdkAnalysisLevel` value of 8.0.100 would no longer be disabled.

## Microsoft.Testing.Platform–related properties

The following MSBuild properties are documented in this section:

- IsTestingPlatformApplication
- Enable\[NugetPackageNameWithoutDots\]
- EnableAspireTesting
- EnableMSTestRunner
- EnableNUnitRunner
- EnablePlaywright
- GenerateTestingPlatformConfigurationFile
- GenerateTestingPlatformEntryPoint
- TestingExtensionsProfile
- TestingPlatformCaptureOutput
- TestingPlatformCommandLineArguments
- TestingPlatformDotnetTestSupport
- TestingPlatformShowTestsFailure
- UseMicrosoftTestingPlatformRunner

### IsTestingPlatformApplication

The `IsTestingPlatformApplication` property identifies a project as an MTP test application. When .NET 10 or a later SDK runs `dotnet test` in MTP mode against a solution or project, it evaluates this property to classify each project. Test framework and platform NuGet packages normally set the property through restored MSBuild imports.

When your project imports the Microsoft.Testing.Platform.MSBuild package, the package defaults `IsTestingPlatformApplication` to `true` if you haven't set it. A `true` value does the following:

- Generates the entry point to the test project.
- Generates the configuration file.
- Detects the extensions.

When `dotnet test` classifies evaluated projects in MTP mode, the property values produce the following results:

| `IsTestingPlatformApplication` | `IsTestProject` | Classification |
| --- | --- | --- |
| `true` | Any value | MTP test application |
| `false` or empty | `true` | VSTest test project |
| `false` or empty | `false` or empty | Not a test project |

If you skip restore and the restored package imports aren't available, `IsTestingPlatformApplication` can remain empty and project discovery can fail. For more information, see `No test projects were found`.

Setting the property to `false` disables the transitive dependency to the package. A *transitive dependency* is when a project that references another project that references a given package behaves as if *it* references the package. You'd typically set this property to `false` in a non-test project that references a test project. For more information, see error CS8892.

If your test project references MSTest, NUnit, or xUnit, this property is set to the same value as EnableMSTestRunner, EnableNUnitRunner, or `UseMicrosoftTestingPlatformRunner` (for xUnit).

### Enable\[NugetPackageNameWithoutDots\]

Use a property with the pattern `Enable[NugetPackageNameWithoutDots]` to enable or disable Microsoft.Testing.Platform (MTP) extensions.

For example, to enable the crash dump extension (NuGet package Microsoft.Testing.Extensions.CrashDump), set the `EnableMicrosoftTestingExtensionsCrashDump` to `true`.

For more information, see Enable or disable extensions.

### EnableAspireTesting

When you use the MSTest project SDK, you can use the `EnableAspireTesting` property to bring in all the dependencies and default `using` directives you need for testing with `Aspire` and `MSTest`. This property is available in MSTest 3.4 and later versions.

For more information, see Test with Aspire.

### EnablePlaywright

When you use the MSTest project SDK, you can use the `EnablePlaywright` property to bring in all the dependencies and default `using` directives you need for testing with `Playwright` and `MSTest`.This property is available in MSTest 3.4 and later versions.

For more information, see Playwright.

### EnableMSTestRunner

The `EnableMSTestRunner` property enables or disables the use of MTP, a lightweight and portable alternative to VSTest. This property is available in MSTest 3.2 and later versions.

> **Note:**
> If your project specifies the MSTest SDK, you don't need to set this property. It's set automatically.

### EnableNUnitRunner

The `EnableNUnitRunner` property enables or disables the use of the NUnit runner. The NUnit runner is a lightweight and portable alternative to VSTest. This property is available in NUnit3TestAdapter in version 5.0 and later.

## UseMicrosoftTestingPlatformRunner

The `UseMicrosoftTestingPlatformRunner` property enables or disables the use of MTP runner in xUnit.v3 test projects.

### GenerateTestingPlatformEntryPoint

Setting the `GenerateTestingPlatformEntryPoint` property to `false` disables the automatic generation of the program entry point in test projects that use MTP. You might want to set this property to `false` when you manually define an entry point, or when you reference a test project from an executable that also has an entry point.

For more information, see error CS8892.

To control the generation of the entry point in a VSTest project, use the `GenerateProgramFile` property.

### GenerateTestingPlatformConfigurationFile

The `GenerateTestingPlatformConfigurationFile` property is only available when IsTestingPlatformApplication is `true`. It's used to allow the copy and rename of the config file in the output folder.

### TestingPlatformCaptureOutput

The `TestingPlatformCaptureOutput` property controls whether all console output that a test executable writes is captured and hidden from the user when you use `dotnet test` to run MTP tests. By default, the console output is hidden. This output includes the banner, version information, and formatted test information. Set this property to `false` to show this information together with MSBuild output.

For more information, see Show complete platform output.

### TestingPlatformCommandLineArguments

The `TestingPlatformCommandLineArguments` property lets you specify command-line arguments to the test app when you use `dotnet test` to run MTP tests. The following project file snippet shows an example.

```xml
<PropertyGroup>
  ...
  <TestingPlatformCommandLineArguments>--minimum-expected-tests 10</TestingPlatformCommandLineArguments>
</PropertyGroup>
```

You can also use conditions to pass <example-value> arguments to projects that use different test frameworks or extensions. For more information, see Solutions with mixed test frameworks or extensions.

### TestingPlatformDotnetTestSupport

The `TestingPlatformDotnetTestSupport` property enables testing MTP apps when using the VSTest mode of `dotnet test`.

> **Note:**
> Don't call `dotnet test` on a solution that has both VSTest and MTP projects, as that scenario is not supported.

For more information, see Testing with 'dotnet test'.

### TestingPlatformShowTestsFailure

The `TestingPlatformShowTestsFailure` property lets you control whether a single failure or all errors in a failed test are reported when you use `dotnet test` to run tests. By default, test failures are summarized into a _.log_ file, and a single failure per test project is reported to MSBuild. To show errors per failed test, set this property to `true` in your project file.

### TestingExtensionsProfile

When you use the MSTest project SDK, the `TestingExtensionsProfile` property lets you select a profile to use. The following table shows the allowable values.

| Value          | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| `Default`      | Enables the recommended extensions for this version of MSTest.SDK.                            |
| `None`         | No extensions are enabled.                                                                    |
| `AllMicrosoft` | Enable all extensions shipped by Microsoft (including extensions with a restrictive license). |

For more information, see MTP profile.

## VSTest–related properties

The following MSBuild properties are documented in this section:

- IsTestProject
- UseVSTest

### IsTestProject

The `IsTestProject` property is set to `true` by the Microsoft.NET.Test.Sdk NuGet package. It signifies whether a project is a VSTest test project so that it's recognized by `dotnet test`.

> **Note:**
> If your project specifies the MSTest SDK, you don't need to set this property, as MSTest.Sdk references the Microsoft.NET.Test.Sdk NuGet package.

### UseVSTest

Set the `UseVSTest` property to `true` to switch from MTP to the VSTest runner when using the MSTest project SDK.

## MSTest–related properties

The following MSBuild properties are documented in this section:

- MSTestAnalysisMode

### MSTestAnalysisMode

This property decides which analyzers are enabled at which severity. For more information, see MSTest code analysis.

## Hosting-related properties

The following MSBuild properties are documented in this section:

- AppHostDotNetSearch
- AppHostRelativeDotNet
- EnableComHosting
- EnableDynamicLoading

### AppHostDotNetSearch

The `AppHostDotNetSearch` property configures how the native executable produced for an application will search for a .NET installation. This property only impacts the executable produced on publish, not build.

```xml
<PropertyGroup>
  <AppHostDotNetSearch>Global</AppHostDotNetSearch>
</PropertyGroup>
```

The following table lists valid values. You can specify multiple values, separated by semi-colons.

| Value | Meaning |
| --- | --- |
| `AppLocal` | App executable's folder |
| `AppRelative` | Path relative to the app executable as specified by AppHostRelativeDotNet |
| `EnvironmentVariable` | Value of `DOTNET_ROOT[_<arch>]` environment variables |
| `Global` | Registered and default global install locations |

This property was introduced in .NET 9.

### AppHostRelativeDotNet

The `AppHostRelativeDotNet` property allows specifying a relative path for the app executable to look for the .NET installation when it's configured to do so. Setting the `AppHostRelativeDotNet` property implies that `AppHostDotNetSearch` is `AppRelative`. This property only impacts the executable produced on publish, not build.

```xml
<PropertyGroup>
  <AppHostRelativeDotNet>./relative/path/to/runtime</AppHostRelativeDotNet>
</PropertyGroup>
```

This property was introduced in .NET 9.

### EnableComHosting

The `EnableComHosting` property indicates that an assembly provides a COM server. Setting the `EnableComHosting` to `true` also implies that EnableDynamicLoading is `true`.

```xml
<PropertyGroup>
  <EnableComHosting>True</EnableComHosting>
</PropertyGroup>
```

For more information, see Expose .NET components to COM.

### EnableDynamicLoading

The `EnableDynamicLoading` property indicates that an assembly is a dynamically loaded component. The component could be a COM library or a non-COM library that can be used from a native host or used as a plugin. Setting this property to `true` has the following effects:

- A *.runtimeconfig.json* file is generated.
- RollForward is set to `LatestMinor`.
- NuGet references are copied locally.

```xml
<PropertyGroup>
  <EnableDynamicLoading>true</EnableDynamicLoading>
</PropertyGroup>
```
