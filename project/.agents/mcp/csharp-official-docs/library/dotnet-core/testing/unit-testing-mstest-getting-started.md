---
title: "Get started with MSTest"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-getting-started.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Get started with MSTest

The recommended way to create an MSTest project is to use the MSTest.Sdk, an MSBuild project SDK that provides a first-class experience for testing with MSTest. It includes all the recommended defaults and simplifies the project configuration.

## Create a project with MSTest.Sdk

To create an MSTest project, set the `Sdk` attribute to `MSTest.Sdk` along with the MSTest version in your project file:

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
  </PropertyGroup>

</Project>
```

> **Note:**
> `4.1.0` is given as an example and can be replaced with any newer version.

To simplify version management across multiple test projects, we recommend specifying the SDK version in a _global.json_ file at the solution level:

```xml
<Project Sdk="MSTest.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
  </PropertyGroup>

</Project>
```

```json
{
    "msbuild-sdks": {
        "MSTest.Sdk": "4.1.0"
    }
}
```

For more information, see Use MSBuild project SDKs.

When you `build` the project, all needed components are restored and installed using the standard NuGet workflow. You can use the same tooling (for example, `dotnet test` or Visual Studio) as any other test project.

> **Tip:**
> By default, MSTest.Sdk uses the MSTest runner with MTP. For advanced configuration options such as extension profiles, switching to VSTest, or integrating with Aspire and Playwright, see MSTest SDK configuration.

## Alternative: Use the MSTest NuGet package

If you prefer not to use MSTest.Sdk, you can use the MSTest NuGet meta-package, which includes:

- `MSTest.TestFramework`, `MSTest.TestAdapter`, and `MSTest.Analyzers` for core MSTest functionality.
- `Microsoft.NET.Test.Sdk` for VSTest integration and test host support.
- `Microsoft.Testing.Extensions.CodeCoverage` and `Microsoft.Testing.Extensions.TrxReport` for MTP extensions.

## NuGet packages overview

MSTest functionality is split across multiple NuGet packages:

| Package | Description |
|---------|-------------|
| MSTest.TestFramework | Contains the attributes and classes used to define MSTest tests. |
| MSTest.TestAdapter | Contains the test adapter that discovers and runs MSTest tests. |
| MSTest.Analyzers | Contains analyzers that help you write high-quality tests. |

> **Note:**
> If you're creating a test infrastructure project intended as a helper library for multiple test projects, install `MSTest.TestFramework` and `MSTest.Analyzers` directly into that project.

## Language-specific tutorials

For detailed step-by-step tutorials in your preferred .NET language:

- Getting started with C#: Create your first C# test project and write basic tests
- Getting started with F#: Test F# code with MSTest
- Getting started with Visual Basic: Test Visual Basic code with MSTest

## Sample projects

The MSTest team maintains sample projects in the microsoft/testfx repository demonstrating various features and scenarios:

| Sample | Description | Link |
|--------|-------------|------|
| **Simple1** | Basic <example-value> runner setup | View on GitHub |
| **DemoMSTestSdk** | MSTest SDK project setup | View on GitHub |
| **UwpMtpApp** | Modern .NET UWP testing with Microsoft.Testing.Platform | View on GitHub |
| **ClassicUwpMtpApp** | Classic `uap10.0` UWP testing with Microsoft.Testing.Platform | View on GitHub |
| **UwpVSTestApp** | Legacy UWP testing with VSTest | View on GitHub |
| **WinUIMtpPackagedApp** | Packaged WinUI 3 testing with Microsoft.Testing.Platform | View on GitHub |
| **WinUIMtpUnpackagedApp** | Unpackaged WinUI 3 testing with Microsoft.Testing.Platform | View on GitHub |
| **WinUIMtpAppContainerApp** | AppContainer WinUI 3 testing with Microsoft.Testing.Platform | View on GitHub |
| **WinUIVSTestApp** | WinUI 3 testing with VSTest | View on GitHub |
| **NativeAotRunner** | Native AOT compilation | View on GitHub |
| **RunInDocker** | Containerized test execution | View on GitHub |
