---
title: "MSTest SDK configuration (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-sdk.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTest SDK configuration

This article covers advanced configuration options for MSTest.Sdk. For basic setup and getting started, see Get started with MSTest.

> **Important:**
> By default, MSTest.Sdk uses the MSTest runner with MTP, including with dotnet test. This requires modifying your CI and local CLI calls, and also impacts the available entries of the _.runsettings_. You can keep the old integrations and tools by switching to VSTest.
>
> MSTest.Sdk sets `EnableMSTestRunner` and `TestingPlatformDotnetTestSupport` to true by default. For more information about dotnet test and its different modes, see Testing with dotnet test.

## Test utility helper libraries

If the project that uses MSTest.Sdk is intended to be a test utility helper library, and doesn't by itself contain any runnable tests, the project should have `<IsTestApplication>false</IsTestApplication>`.

## Select the runner

By default, MSTest SDK relies on MTP, but you can switch to VSTest by adding the property `<UseVSTest>true</UseVSTest>`.

## Test Windows application models

Starting with MSTest.Sdk 4.5, the default MTP runner supports the following Windows application models:

- Classic UWP projects that target `uap10.0`.
- Modern UWP projects that use .NET 10 and set `UseUwp` to `true`.
- Packaged full-trust WinUI 3 projects.
- Unpackaged WinUI 3 projects.
- WinUI 3 `packagedClassicApp` projects that set `TrustLevel="appContainer"`.

MSTest.Sdk supplies compatible MTP 2.5 components and starts a full-trust app-model sidecar for packaged and AppContainer test hosts. The sidecar registers the package, activates the selected application by AUMID, authorizes the exact package SID for AppContainer communication, and recovers result artifacts from package storage.

UWP projects still require the Visual Studio UWP workload and desktop MSBuild for build-time support. They don't require `Microsoft.NET.Test.Sdk`, `vstest.console`, or the Visual Studio UWP test runtime provider.

For project configuration, run commands, and samples, see Test UWP and WinUI 3 apps with MSTest and MTP.

Starting with MSTest.Sdk 4.5 preview, set `EnableWindowsUIAutomation` to `true` to add the matching `MSTest.Windows.UIAutomation` package to a Windows-targeted project. This feature launches and automates an external unpackaged Win32, Windows Forms, or WPF application rather than hosting tests inside a UWP or WinUI app. For details, see Test Windows desktop apps with MSTest UI Automation.

## Extend MTP

You can customize the MTP experience through a set of NuGet package extensions. To simplify and improve this experience, MSTest SDK introduces two features:

- Microsoft.Testing.Platform profile
- Enable or disable extensions

Starting with MSTest 4.4, the MSTest adapter uses its native MTP integration and no longer depends on `Microsoft.Testing.Extensions.VSTestBridge`. Reference the bridge explicitly only when the MTP test application must run a framework through its VSTest adapter.

### Microsoft.Testing.Platform profile

The concept of *profiles* allows you to select the default set of configurations and extensions that will be applied to your test project.

You can set the profile using the property `TestingExtensionsProfile` with one of the following three profiles:

* `None` - No extensions are enabled.

* `Default` - Enables the recommended extensions for this version of MSTest.SDK. This is the default when the property isn't set explicitly.

  Enables the following extensions:

  * Code Coverage
  * Trx Report
  * Azure DevOps Report (MSTest.Sdk 4.3.0+)
  * GitHub Actions Report (MSTest.Sdk 4.3.0+; the package was prerelease in 4.3.x and follows the MTP release version starting in 4.4)

* `AllMicrosoft` - Enables the Microsoft extensions selected for broad out-of-the-box use, including extensions with a restrictive license. Experimental and API-only extensions can still require explicit opt-in.

  Enables all extensions from the `Default` profile, plus the following extensions:

  * Crash Dump
  * Fakes (MSTest.Sdk 3.7.0+)
  * Hang Dump
  * Hot Reload
  * HTML Report
  * Retry

  In MSTest.Sdk versions 3.11.0 through 4.2.x, the Azure DevOps Report extension is included only in `AllMicrosoft`.

> **Note:**
> The profiles reference the Azure DevOps Report and GitHub Actions Report packages, but reporting remains disabled at runtime. Pass `--report-azdo` to enable Azure DevOps reporting. To enable GitHub Actions reporting, run the tests on GitHub Actions and pass `--report-gh`.

Here's a full example, using the `None` profile:

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

    <PropertyGroup>
        <TargetFramework>net10.0</TargetFramework>
        <TestingExtensionsProfile>None</TestingExtensionsProfile>
    </PropertyGroup>

</Project>
```

| Extension/Profile                                                                                 | None  |      Default       |    AllMicrosoft     |
| ------------------------------------------------------------------------------------------------- | :---: | :----------------: | :-----------------: |
| Code Coverage         |       | :heavy_check_mark: | :heavy_check_mark:  |
| Crash Dump               |       |                    | :heavy_check_mark:  |
| Fakes                        |       |                    | :heavy_check_mark:¹ |
| Hang Dump                 |       |                    | :heavy_check_mark:  |
| Hot Reload               |       |                    | :heavy_check_mark:  |
| HTML Report             |       |                    | :heavy_check_mark:  |
| GitHub Actions Report |       | :heavy_check_mark:³ | :heavy_check_mark:³ |
| Retry                        |       |                    | :heavy_check_mark:  |
| Trx                      |       | :heavy_check_mark: | :heavy_check_mark:  |
| Azure DevOps Report |       | :heavy_check_mark:³ | :heavy_check_mark:² |

¹ MSTest.Sdk 3.7.0+
² MSTest.Sdk 3.11.0+
³ MSTest.Sdk 4.3.0+

### Enable or disable extensions

Extensions can be enabled and disabled by MSBuild properties with the pattern `Enable[NugetPackageNameWithoutDots]`.

For example, to enable the crash dump extension (NuGet package Microsoft.Testing.Extensions.CrashDump), you can use the following property `EnableMicrosoftTestingExtensionsCrashDump` set to `true`:

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

<PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <EnableMicrosoftTestingExtensionsCrashDump>true</EnableMicrosoftTestingExtensionsCrashDump>
</PropertyGroup>

</Project>
```

For a list of all available extensions, see MTP features.

Some MTP extensions remain opt-in and aren't included in the `Default` or `AllMicrosoft` profiles:

- Starting with MSTest.Sdk 4.3, set `<EnableMicrosoftTestingExtensionsJUnitReport>true</EnableMicrosoftTestingExtensionsJUnitReport>`, then pass `--report-junit`.
- Starting with MSTest.Sdk 4.4, set `<EnableMicrosoftTestingExtensionsCtrfReport>true</EnableMicrosoftTestingExtensionsCtrfReport>`, then pass `--report-ctrf`.
- To reference the OpenTelemetry extension, set `<EnableMicrosoftTestingExtensionsOpenTelemetry>true</EnableMicrosoftTestingExtensionsOpenTelemetry>`. Because the extension requires API configuration, register it in your custom entry point as described in OpenTelemetry.

These extensions are available only with MTP.

> **Warning:**
> It's important to review the licensing terms for each extension as they might vary.

Enabled and disabled extensions are combined with the extensions provided by your selected extension profile.

This property pattern can be used to enable an additional extension on top of the implicit `Default` profile (as seen in the previous CrashDumpExtension example).

You can also disable an extension that's coming from the selected profile. For example, disable the `MS Code Coverage` extension by setting `<EnableMicrosoftTestingExtensionsCodeCoverage>false</EnableMicrosoftTestingExtensionsCodeCoverage>`:

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

    <PropertyGroup>
        <TargetFramework>net10.0</TargetFramework>
        <EnableMicrosoftTestingExtensionsCodeCoverage>false</EnableMicrosoftTestingExtensionsCodeCoverage>
    </PropertyGroup>

</Project>
```

In MSTest.Sdk 4.3.0 and later, the `Default` profile references the Azure DevOps Report and GitHub Actions Report packages. To remove either package reference, set `<EnableMicrosoftTestingExtensionsAzureDevOpsReport>false</EnableMicrosoftTestingExtensionsAzureDevOpsReport>` or `<EnableMicrosoftTestingExtensionsGitHubActionsReport>false</EnableMicrosoftTestingExtensionsGitHubActionsReport>`. If you keep the package references, Azure DevOps reporting starts only when you pass `--report-azdo`. GitHub Actions reporting starts only when you run the tests on GitHub Actions and pass `--report-gh`.

## Features

Outside of the selection of the runner and runner-specific extensions, `MSTest.Sdk` also provides additional features to simplify and enhance your testing experience.

### Test with Aspire

Aspire is an opinionated, cloud-ready stack for building observable, production ready, distributed applications. Aspire is delivered through a collection of NuGet packages that handle specific cloud-native concerns. For more information, see the Aspire docs.

> **Note:**
> This feature is available from MSTest.Sdk 3.4.0.

By setting the property `EnableAspireTesting` to `true`, you can bring all dependencies and default `using` directives you need for testing with `Aspire` and `MSTest`.

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

    <PropertyGroup>
        <TargetFramework>net10.0</TargetFramework>
        <EnableAspireTesting>true</EnableAspireTesting>
    </PropertyGroup>

</Project>
```

### Test with Playwright

Playwright enables reliable end-to-end testing for modern web apps. For more information, see the official Playwright docs.

> **Note:**
> This feature is available from MSTest.Sdk 3.4.0.

By setting the property `EnablePlaywright` to `true` you can bring in all the dependencies and default `using` directives you need for testing with `Playwright` and `MSTest`.

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

    <PropertyGroup>
        <TargetFramework>net10.0</TargetFramework>
        <EnablePlaywright>true</EnablePlaywright>
    </PropertyGroup>

</Project>
```

## Migrate to MSTest SDK

Consider the following steps that are required to migrate to the MSTest SDK.

### Update your project

When migrating an existing MSTest test project to MSTest SDK, start by replacing the `Sdk="Microsoft.NET.Sdk"` entry at the top of your test project with `Sdk="MSTest.Sdk"`

```diff
- Sdk="Microsoft.NET.Sdk"
+ Sdk="MSTest.Sdk"
```

Add the version to your `global.json`:

```json
{
    "msbuild-sdks": {
        "MSTest.Sdk": "4.1.0"
    }
}
```

You can then start simplifying your project.

Remove default properties:

```diff
- <EnableMSTestRunner>true</EnableMSTestRunner>
- <OutputType>Exe</OutputType>
- <IsPackable>false</IsPackable>
- <IsTestProject>true</IsTestProject>
```

Remove default package references:

```diff
- <PackageReference Include="MSTest"
- <PackageReference Include="MSTest.TestFramework"
- <PackageReference Include="MSTest.TestAdapter"
- <PackageReference Include="MSTest.Analyzers"
- <PackageReference Include="Microsoft.NET.Test.Sdk"
```

Finally, based on the extensions profile you're using, you can also remove some of the `Microsoft.Testing.Extensions.*` packages.

### Update your CI

Once you've updated your projects, if you're using MTP (default) and if you rely on `dotnet test` to run your tests, you must update your CI configuration. For more information and to guide your understanding of all the required changes, see dotnet test integration.

If you're using the VSTest mode of `dotnet test`, here's an example update when using the `DotNetCoreCLI` task in Azure DevOps:

The default MSTest.Sdk extension profile supplies the `Microsoft.Testing.Extensions.TrxReport` and `Microsoft.Testing.Extensions.CodeCoverage` packages required by the added options. If you select the `None` profile, enable or reference both extensions before you use the options.

```diff
\- task: DotNetCoreCLI@2
  inputs:
    command: 'test'
    projects: '**/**.sln'
-    arguments: '--configuration Release'
+    arguments: '--configuration Release -- --report-trx --results-directory $(Agent.TempDirectory) --coverage'
```

## Reflection source generator

MSTest 4.3 introduced the reflection source generator in the independently versioned, experimental `MSTest.SourceGeneration` package. Starting with MSTest 4.4, the package graduates from experimental status and uses the MSTest version.

Native AOT projects include the source generator automatically. For a non-NativeAOT project that uses MSTest.Sdk, opt in with `<EnableMSTestSourceGeneration>true</EnableMSTestSourceGeneration>`. MSTest.Sdk aligns the `MSTest.SourceGeneration`, `MSTest.TestFramework`, and `MSTest.TestAdapter` versions through `MSTestVersion`.

The SDK also supports source generation in reusable test libraries and projects that use Central Package Management. It supplies matching `MSTest.TestAdapter` runtime hooks and generates the required `PackageVersion` items.

.NET Standard doesn't support these runtime hooks. When you enable source generation for a .NET Standard target, the SDK reports this error:

> MSTest source generation is not supported for .NET Standard target frameworks because the required MSTest.TestAdapter runtime hooks are unavailable.

The source generator discovers tests at compile time. When the generator is active, test classes must declare `[TestClass]` directly instead of inheriting it. The MSTEST0069 analyzer flags classes that rely on an inherited `[TestClass]`.

Starting with MSTest 4.3.2, `MSTestSourceGenMode` defaults to `ReflectionFree` for trimmed and Native AOT projects. This mode uses generated metadata and invokers where it supports the test shape. On runtimes that support reflection, MSTest falls back to reflection for unsupported or missing generated entries.

Starting with MSTest 4.4, reflection-free generation materializes complete inherited attribute metadata, including `AttributeUsage` and `AllowMultiple`. On MTP, it can bypass <example-value> discovery and validation for plain synchronous `[TestMethod]` and `[DataRow]` methods. Async tests, custom test method attributes, `DynamicData`, custom `ITestDataSource` implementations, and ambiguous test shapes use the fallback path. VSTest also retains its existing path.

Reflection-free mode reports these diagnostics:

| ID | Unsupported test shape |
| --- | --- |
| `AOTSG0001` | Static test class |
| `AOTSG0002` | Open generic test class, including a class nested in a generic type |
| `AOTSG0003` | Class that generated code can't access, including a file-local class or private or private-protected nesting |
| `AOTSG0004` | Generic test method |
| `AOTSG0005` | Test method with a `ref`, `in`, or `out` parameter |
