---
title: "Run tests with MSTest"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-running-tests.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Run tests with MSTest

> **Tip:**
> Before choosing a runner configuration, see Test platforms overview.

There are several ways to run MSTest tests depending on your needs. You can run tests from an IDE (for example, Visual Studio, Visual Studio Code, or JetBrains Rider), or from the command line, or from a CI service (such as GitHub Actions or Azure DevOps).

Historically, MSTest relied on VSTest for running tests in all contexts but starting with version 3.2.0, MSTest has its own test runner. This new runner is more lightweight and faster than VSTest, and it's the recommended way to run MSTest tests.

## VSTest vs MTP

MSTest supports running tests with both VSTest and Microsoft.Testing.Platform (MTP). The support for MTP is powered by the MSTest runner, which can run tests in all contexts (for example, continuous integration (CI) pipelines, CLI, Visual Studio Test Explorer, and VS Code Text Explorer). The MSTest runner is embedded directly in your MSTest test projects, and there are no other app dependencies, such as `vstest.console` or `dotnet test`, needed to run your tests. However, you can still run your tests using `dotnet test`.

The MSTest runner is open source and builds on the MTP library. You can find `Microsoft.Testing.Platform` code in the microsoft/testfx GitHub repository. The MSTest runner comes bundled with `MSTest in 3.2.0` or newer.

With the .NET 10 SDK and later versions, select the dedicated MTP mode of `dotnet test` in `global.json`. Starting with .NET 11, you can override that selection for the current process with the `DOTNET_TEST_RUNNER` environment variable. For the supported inputs, SDK-version requirements, and MTP-specific options, see `dotnet test` with MTP.

## Programmatic test discovery and execution

For a custom test UI, integration-test service, or report generator, choose the interface that matches your test platform:

| Requirement | Interface | Details |
|---|---|---|
| Discover and run MTP tests from .NET code, with metadata and live results. | MTP server-mode client | Starting with MTP 2.4, `Microsoft.Testing.Platform.ServerMode.Client.Sources` provides typed discovery and execution methods. The package injects internal C# types; other .NET languages can call a C# wrapper. |
| Discover MTP tests through a command-line process and consume structured metadata. | `--list-tests json` | Available in MTP 2.3 or later. Read the JSON document, then run selected tests with `--filter-uid`. The text format isn't a machine-readable API. |
| Keep an existing VSTest discovery and execution integration. | `Microsoft.TestPlatform.TranslationLayer` | Use `VsTestConsoleWrapper` with `vstest.console` and a compatible VSTest adapter. The wrapper speaks the VSTest protocol, not the native MTP protocol. |
| Consume test metadata or produce custom reports inside the test process. | MTP extensions | Implement an `IDataConsumer` to consume the messages that a test framework publishes. This extension point isn't an external test-client API. |

MTP supports discovery as well as execution. You don't need to parse terminal output or build a `Process.Start` wrapper to use its typed server-mode client. For a complete C# example and a Visual Basic <example-value>, see Discover and run tests from .NET.

Discovery can include MSTest categories and custom `TestProperty` metadata. The available fields depend on the framework and transport; neither API serializes every arbitrary in-memory property. See Consume updates and metadata.

For an existing `VsTestConsoleWrapper` integration, keep a VSTest-compatible project configuration and adapter until you migrate the client. A framework's VSTest compatibility doesn't make the VSTest translation layer a client for every MTP test application. For the scope of the compatibility layer, see VSTest Bridge.

## Enable MTP in an MSTest project

Use MSTest SDK to greatly simplify your project configuration, version management, and alignment of MTP and its extensions.

`MSTest.Sdk` replaces `Microsoft.NET.Sdk` as the project SDK, and MTP is enabled by default:

```xml
<Project Sdk="MSTest.Sdk/4.1.0">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

> **Note:**
> `MSTest.Sdk` works only when your project can use `Microsoft.NET.Sdk` as its base SDK. If your project requires a different SDK, don't replace the `<Project Sdk="...">` value with `MSTest.Sdk`.
>
> For example, some ASP.NET Core integration test projects use `Microsoft.NET.Sdk.Web`. `MSTest.Sdk` derives from `Microsoft.NET.Sdk`, so it doesn't import the ASP.NET Core SDK targets that `Microsoft.NET.Sdk.Web` provides.

You can also configure MSTest manually instead of using `MSTest.Sdk`. Manual configuration is required when your project needs a different top-level SDK (for example, `Microsoft.NET.Sdk.Web`), but you can also choose it with the standard `Microsoft.NET.Sdk`. Add the `EnableMSTestRunner` property and set `OutputType` to `Exe` in your project file. Then add the MSTest references that your project requires. Ensure that you're using MSTest 3.2.0 or newer, and update to the latest MSTest version available.

Consider the following example project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <!-- Enable Microsoft.Testing.Platform, this is an opt-in feature -->
    <EnableMSTestRunner>true</EnableMSTestRunner>
    <TestingPlatformDotnetTestSupport>true</TestingPlatformDotnetTestSupport>

    <!--
      Displays error on console in addition to the log file. Note that this feature comes with a performance impact.
      For more information, visit https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test#show-failure-per-test
      -->
    <TestingPlatformShowTestsFailure>true</TestingPlatformShowTestsFailure>

    <OutputType>Exe</OutputType>

    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <!--
      MSTest meta package is the recommended way to reference MSTest.
      It's equivalent to referencing:
          Microsoft.NET.Test.Sdk
          MSTest.TestAdapter
          MSTest.TestFramework
          MSTest.Analyzers
      Starting with 3.8, it also includes:
          Microsoft.Testing.Extensions.TrxReport
          Microsoft.Testing.Extensions.CodeCoverage
    -->
    <PackageReference Include="MSTest" Version="4.1.0" />
  </ItemGroup>

</Project>
```

> **Tip:**
> To ensure all test projects in your solution use the MSTest runner, set the `EnableMSTestRunner` and `TestingPlatformDotnetTestSupport` properties in *Directory.Build.props* file instead of individual project files.

## Configurations and filters

### .runsettings

MTP supports the runsettings through the command-line option `--settings`. For the full list of supported MSTest entries, see Configure MSTest: Runsettings. The following commands show various usage examples.

Using `dotnet run`:

```dotnetcli
dotnet run --project Contoso.MyTests -- --settings config.runsettings
```

Using `dotnet exec`:

```dotnetcli
dotnet exec Contoso.MyTests.dll --settings config.runsettings
```

-or-

```dotnetcli
dotnet Contoso.MyTests.dll --settings config.runsettings
```

Using the executable:

```dotnetcli
Contoso.MyTests.exe --settings config.runsettings
```

### Tests filter

You can provide the tests filter seamlessly using the command line option `--filter`. The following commands show some examples.

Using `dotnet run`:

```dotnetcli
dotnet run --project Contoso.MyTests -- --filter "FullyQualifiedName~UnitTest1|TestCategory=CategoryA"
```

Using `dotnet exec`:

```dotnetcli
dotnet exec Contoso.MyTests.dll --filter "FullyQualifiedName~UnitTest1|TestCategory=CategoryA"
```

-or-

```dotnetcli
dotnet Contoso.MyTests.dll --filter "FullyQualifiedName~UnitTest1|TestCategory=CategoryA"
```

Using the executable:

```dotnetcli
Contoso.MyTests.exe --filter "FullyQualifiedName~UnitTest1|TestCategory=CategoryA"
```

## See also

- Run MSTest tests in Azure Pipelines
- Testing with `dotnet test`
- `dotnet test` with MTP
- `dotnet test` with VSTest
- MTP CLI options reference
- MTP server mode
- Test UWP and WinUI 3 apps with MSTest and MTP
- Test Windows desktop apps with MSTest UI Automation
- Filter tests
- Order unit tests
