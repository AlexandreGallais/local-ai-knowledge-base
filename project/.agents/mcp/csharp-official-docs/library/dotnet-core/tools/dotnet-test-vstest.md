---
title: "dotnet test command with VSTest (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-test-vstest.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet test with VSTest

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet test` - .NET test driver used to execute unit tests with VSTest.

## Synopsis

```dotnetcli
dotnet test [<PROJECT> | <SOLUTION> | <DIRECTORY> | <DLL> | <EXE>]
    [--test-adapter-path <ADAPTER_PATH>]
    [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]
    [--blame]
    [--blame-crash]
    [--blame-crash-dump-type <DUMP_TYPE>]
    [--blame-crash-collect-always]
    [--blame-hang]
    [--blame-hang-dump-type <DUMP_TYPE>]
    [--blame-hang-timeout <TIMESPAN>]
    [-c|--configuration <CONFIGURATION>]
    [--collect <DATA_COLLECTOR_NAME>]
    [-d|--diag <LOG_FILE>]
    [--disable-build-servers]
    [-f|--framework <FRAMEWORK>]
    [-e|--environment <NAME="VALUE">]
    [--filter <EXPRESSION>]
    [--interactive]
    [-l|--logger <LOGGER>]
    [--no-build]
    [--no-dependencies]
    [--nologo]
    [--no-restore]
    [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>]
    [--results-directory <RESULTS_DIR>]
    [-r|--runtime <RUNTIME_IDENTIFIER>]
    [-s|--settings <SETTINGS_FILE>]
    [-t|--list-tests]
    [--tl:[auto|on|off]]
    [-v|--verbosity <LEVEL>]
    [<args>...]
    [[--] <RunSettings arguments>]

dotnet test -h|--help
```

## Description

The `dotnet test` command is used to execute unit tests in a given solution. The `dotnet test` command builds the solution and runs a test host application for each test project in the solution using `VSTest`. The test host executes tests in the given project using a test framework, for example: MSTest, NUnit, or xUnit, and reports the success or failure of each test. If all tests are successful, the test runner returns 0 as an exit code; otherwise if any test fails, it returns 1.

> **Note:**
> `dotnet test` was originally designed to support only `VSTest`-based test projects. Recent versions of the test frameworks are adding support for Microsoft.Testing.Platform (MTP). This alternative test platform is more lightweight and faster than `VSTest` and supports `dotnet test` with different command line options. For more information, see dotnet test with MTP.

For multi-targeted projects, tests are run for each targeted framework. The test host and the unit test framework are packaged as NuGet packages and are restored as ordinary dependencies for the project. Starting with the .NET 9 SDK, these tests are run in parallel by default. To disable parallel execution, set the `TestTfmsInParallel` MSBuild property to `false`. For more information, see Run tests in parallel and the example command line later in this article.

Test projects specify the test runner using an ordinary `<PackageReference>` element, as seen in the following sample project file:

_Code sample not included: ../../../samples/snippets/csharp/xunit-test/xunit-test.csproj._

Where `Microsoft.NET.Test.Sdk` is the test host, `xunit` is the test framework. And `xunit.runner.visualstudio` is a test adapter, which allows the xUnit framework to work with the test host.

## Implicit restore

You don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the `dotnet restore` documentation.

### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see Advertising manifests.

## Arguments

- **`PROJECT | SOLUTION | DIRECTORY | DLL | EXE`**

  - Path to the test project.
  - Path to the solution.
  - Path to a directory that contains a project or a solution.
  - Path to a test project *.dll* file.
  - Path to a test project *.exe* file.

  If not specified, the effect is the same as using the `DIRECTORY` argument to specify the current directory.
