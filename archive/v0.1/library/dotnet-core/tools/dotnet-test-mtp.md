---
title: "dotnet test command with Microsoft.Testing.Platform (MTP) (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-test-mtp.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet test with Microsoft.Testing.Platform (MTP)

**This article applies to:** ✔️ .NET 10 SDK and later versions

## Name

`dotnet test` - .NET test driver used to execute unit tests with MTP.

## Synopsis

```dotnetcli
dotnet test
    [<PROJECT_OR_TRAVERSAL_PATH>]
    [--project <PROJECT_PATH>]
    [--solution <SOLUTION_PATH>]
    [--test-modules <EXPRESSION>]
    [--root-directory <ROOT_PATH>]
    [--max-parallel-test-modules <NUMBER>]
    [--config-file <CONFIG_FILE>]
    [--results-directory <RESULTS_DIRECTORY>]
    [--results-directory-layout <flat|per-module>]
    [--diagnostic-output-directory <DIAGNOSTIC_OUTPUT_DIRECTORY>]
    [--minimum-expected-tests <NUMBER>]
    [--maximum-failed-tests <NUMBER>]
    [--timeout <DURATION>]
    [-e|--environment <NAME="VALUE">]
    [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]
    [-c|--configuration <CONFIGURATION>]
    [-f|--framework <FRAMEWORK>]
    [--os <OS>]
    [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--use-current-runtime|--ucr]
    [-v|--verbosity <LEVEL>]
    [--no-build]
    [--no-dependencies]
    [--no-restore]
    [--nologo|--no-logo|--no-banner]
    [--no-ansi]
    [--no-progress]
    [--no-artifact-post-processing]
    [--output <VERBOSITY_LEVEL>]
    [--show-test-results <OUTCOME>]
    [--list-tests [text|json]]
    [--no-launch-profile]
    [--no-launch-profile-arguments]
    [--device <DEVICE_ID>]
    [--list-devices]
    [--collect-test-map]
    [--affected-tests]
    [<args>...]

dotnet test -h|--help
```

## Description

With MTP, `dotnet test` operates faster than with VSTest. The test-related arguments are no longer fixed, as they are tied to the registered extensions in the test project(s). Moreover, MTP supports a globbing filter when running tests. For more information, see MTP.

> **Important:**
> Extension-specific options aren't built into MTP. Each targeted test application must register the extension that provides an option. Add the extension's NuGet package directly, or use a test SDK configuration or profile that includes the package. Otherwise, the test run fails with exit code 5 because the option is unrecognized. Run `dotnet test --help` to see the options available to the selected test applications, and see Extension options by scenario to find the package for an option.

> **Warning:**
> When MTP is opted in via `global.json`, `dotnet test` expects all test projects to use MTP. It is an error if any of the test projects use VSTest.

### Version requirements

The MTP mode of `dotnet test` requires the .NET 10 SDK and MTP 1.7 or later. Options added after .NET 10 have individual SDK version requirements in the following sections. Some options also require a newer MTP package because the SDK coordinates the complete run while each test application implements the corresponding capability.

## Implicit restore

You don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the `dotnet restore` documentation.

> **Important:**
> When you run a project or solution with `--no-restore`, keep both the restore-generated project state in the `obj` folder and the matching global packages folder available. Test framework and platform package imports set the MSBuild properties that `dotnet test` uses to identify MTP test applications. The `--no-build` option also implies `--no-restore`. If the test environment contains built test applications but not the project restore state, use `--test-modules` instead. For more information, see `No test projects were found`.
