---
title: "Run and debug tests with Microsoft.Testing.Platform (MTP)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-run-and-debug.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Run and debug tests

MTP test projects are built as executables that can be run (or debugged) directly. There's no extra test running console or command. The app exits with a nonzero exit code if there's an error, which is typical for most executables. For more information on the known exit codes, see MTP exit codes.

> **Tip:**
> You can ignore a specific exit code using the `--ignore-exit-code` command line option.
>
> You can also set command line options that apply to a specific test project in the project file using the `TestingPlatformCommandLineArguments` MSBuild property. One common use case is for test projects that have all the tests ignored, which will normally exit with exit code 8 (the test session ran zero tests). In this scenario, you can add the following under a `PropertyGroup` in your project file:
>
> ```xml
> <TestingPlatformCommandLineArguments>$(TestingPlatformCommandLineArguments) --ignore-exit-code 8</TestingPlatformCommandLineArguments>
> ```

> **Important:**
> By default, MTP collects telemetry. For more information and options on opting out, see MTP telemetry.

> **Note:**
> Available in MTP starting with version 2.3.0.
>
> For a graceful stop, press `Ctrl`+`C` once to request cancellation. Running tests can finish teardown. To terminate immediately, press `Ctrl`+`C` again.

## .NET CLI

Publishing the test project using `dotnet publish` and running the app directly is another way to run your tests. For example, executing the `./Contoso.MyTests.exe`. In some scenarios it's also viable to use `dotnet build` to produce the executable, but there can be edge cases to consider, such Native AOT.

### Use `dotnet run`

The `dotnet run` command can be used to build and run your test project. This is the easiest, although sometimes slowest, way to run your tests. Using `dotnet run` is practical when you're editing and running tests locally, because it ensures that the test project is rebuilt when needed. `dotnet run` will also automatically find the project in the current folder.

```dotnetcli
dotnet run --project Contoso.MyTests
```

For more information on `dotnet run`, see dotnet run.

### Use `dotnet exec`

The `dotnet exec` or `dotnet` command is used to execute (or run) an already built test project, this is an alternative to running the application directly. `dotnet exec` requires path to the built test project dll.

```dotnetcli
dotnet exec Contoso.MyTests.dll
```

or

```dotnetcli
dotnet Contoso.MyTests.dll
```

> **Note:**
> Providing the path to the test project executable (_*.exe_) results in an error:
>
> ```Output
> Error:
>   An assembly specified in the application dependencies manifest
>   (Contoso.MyTests.deps.json) has already been found but with a different
>   file extension:
>     package: 'Contoso.MyTests', version: '1.0.0'
>     path: 'Contoso.MyTests.dll'
>     previously found assembly: 'S:\t\Contoso.MyTests\bin\Debug\net10.0\Contoso.MyTests.exe'
> ```

For more information on `dotnet exec`, see dotnet exec.

### Use `dotnet test`

Starting with the .NET 10 SDK, `dotnet test` has a dedicated MTP mode. Select MTP through `global.json`, or use the `DOTNET_TEST_RUNNER` environment variable with .NET 11 or later. The dedicated mode supports projects, solutions, built test modules, and additional input types in newer SDK versions.

```dotnetcli
dotnet test --test-modules Contoso.MyTests.dll
```

For runner selection and migration from the VSTest-compatible mode, see Testing with `dotnet test`.

## Visual Studio

The MTP tests can be run (and debugged) in Visual Studio, they integrate with Test Explorer, and can also be run directly as startup project.

### Run the app with Visual Studio

MTP test project are built as executables, and can be run directly. This runs all the tests in the given executable, unless a filter is provided.

1. Navigate the test project you want to run in Solution Explorer, right select it and select **Set as Startup Project**.
1. Select **Debug** > **Start without Debugging** (or use `Ctrl`+`F5`) to run the selected test project.

Console window pops up with the execution and summary of your test run.

### Debug the app directly in Visual Studio

MTP test project can be debugged directly. To debug all the tests in the given executable, unless a filter is provided:

1. Navigate the test project you want to run in Solution Explorer, right select it and select **Set as Startup Project**.
1. Set breakpoint into the test that you'd like to debug.
1. Go to **Debug** > **Start Debugging** (or press `F5`) to debug the selected test project.

All tests are executed until your test with a breakpoint is reached. Step through your test to debug it. Once you're done debugging the app resumes running all remaining tests, unless you stop it.

### Use Test Explorer

To run a test, navigate to **Test Explorer**, select the test (or tests) to run. Right select it, and choose **Run**. Similarly to debug a test, select the test (or tests) in **Test Explorer**, right select and choose **Debug**.

> **Note:**
> Automatic update of tests without building the project isn't available.

## Visual Studio Code

The C# extension along with C# Dev Kit allows you to debug/run tests in Visual Studio code, as well as adds integration with Visual Studio Code's Test Explorer.

### Run the app with Visual Studio Code

MTP test project are built as executables, and can be run directly. This runs all the tests in the given executable, unless a filter is provided.

1. Navigate to a test file that you want to run tests for.
1. Use `Ctrl`+`F5` to run the selected test project. If you have multiple projects a popup will ask you to select the one to run.

Console window pops up with the execution and summary of your test run.

### Debug the app directly in Visual Studio Code

MTP test project are built as executables, and can be run directly. This runs all the tests in the given executable, unless a filter is provided.

1. Navigate to a test file that you want to run tests for.
1. Use `F5` to debug the selected test project. If you have multiple projects a popup will ask you to select the one to run.

> **Tip:**
> There are several other ways to run a dotnet project using C# DevKit, such as running from solution explorer
> or creating corresponding launch configurations. These are specified in the Visual Studio Code documentation.

As the project is run the output tab pops up with the execution and summary of your test run.

### Use Test Explorer

To run a test, navigate to **Test Explorer**, select the test (or tests) to run. Right select it, and choose **Run**. Similarly to debug a test, select the test (or tests) in **Test Explorer**, right select and choose **Debug**.

> **Note:**
> Automatic update of tests without building the project isn't available.

## Continuous integration (CI)

To run multiple test projects in parallel, invoke `dotnet test` once for the solution instead of adding a pipeline step for every test executable. When you add an MTP test project to the solution, the same command includes it without a pipeline change.

### Run a solution in Azure Pipelines

Use the .NET 10 SDK or later and MTP 1.7 or later. All test projects in the solution must support MTP; VSTest-only test projects aren't supported in this mode. For earlier SDK versions, see Run MTP projects with VSTest mode.

At the repository root, create a `global.json` file with the following content. If the file already exists, add the `test` section and ensure its SDK settings select .NET 10 or later.

```json
{
    "test": {
        "runner": "Microsoft.Testing.Platform"
    }
}
```

For TRX reports, each test project must reference `Microsoft.Testing.Extensions.TrxReport`, either directly or through a test SDK configuration or profile that includes it. For details, see Visual Studio test reports (TRX).

Add the following `azure-pipelines.yml` file to your repository. The example assumes that `Contoso.sln` and `global.json` are at the repository root. Replace `Contoso.sln` with the repository-relative path of your solution.

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UseDotNet@2
  displayName: Install .NET SDK
  inputs:
    packageType: sdk
    version: 10.0.x

- task: DotNetCoreCLI@2
  displayName: Run solution tests
  inputs:
    command: test
    projects: Contoso.sln
    arguments: --configuration Release --max-parallel-test-modules 4
    workingDirectory: $(Build.SourcesDirectory)
    publishTestResults: true
```
The `DotNetCoreCLI@2` task invokes `dotnet test` once for the solution. The command restores dependencies, builds the solution, and runs its MTP test modules in parallel. By default, `dotnet test` runs up to `System.Environment.ProcessorCount` modules at once. The example uses `--max-parallel-test-modules 4` to limit concurrency to four modules. Adjust the limit to match your agent's CPU, memory, and other resources.

> **Important:**
> Select a solution file in `projects`, not a project-file pattern such as `**/*.csproj`. The task invokes `dotnet test` separately for each matched file, one after another. A single solution invocation lets `dotnet test` coordinate parallel execution across its test projects.

Module-level parallelism is separate from parallel execution of tests within a module. To configure parallel tests within an assembly, use your test framework's settings. For MSTest, see ParallelizeAttribute.

With `publishTestResults: true`, the task adds `--report-trx` and `--results-directory` and publishes the reports to the pipeline run's **Tests** tab, even if tests fail. A nonzero `dotnet test` exit code also fails the task and pipeline.

> **Note:**
> MTP support in `DotNetCoreCLI@2` requires task version 2.263.0 or later. Keep `global.json` in the task's working directory so both the task and the .NET SDK select MTP.

### Run a solution with a script

For task versions without MTP support, or to control the CLI command directly, use a script and publish the TRX reports in a separate step. The same .NET SDK, `global.json`, and TRX extension requirements apply.

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UseDotNet@2
  displayName: Install .NET SDK
  inputs:
    packageType: sdk
    version: 10.0.x

- task: CmdLine@2
  displayName: Run solution tests
  inputs:
    script: >-
      dotnet test --solution Contoso.sln
      --configuration Release
      --max-parallel-test-modules 4
      --results-directory "$(Agent.TempDirectory)"
      --report-trx
    workingDirectory: $(Build.SourcesDirectory)

- task: PublishTestResults@2
  displayName: Publish test results
  condition: succeededOrFailed()
  inputs:
    testResultsFormat: VSTest
    testResultsFiles: '**/*.trx'
    searchFolder: $(Agent.TempDirectory)
    failTaskOnFailedTests: true
    failTaskOnMissingResultsFile: true
```
The `succeededOrFailed()` condition publishes results after a successful or failed test run. The script's nonzero exit code still fails the pipeline. To avoid report overwrites across modules, don't assign the same TRX file name to every module. For naming and isolation options, see Report file names.

### Run a single test executable

For a single test project, build or publish the project before you invoke its executable directly:

```yml
- task: CmdLine@2
  displayName: "Run Contoso.MyTests"
  inputs:
    script: '.\Contoso.MyTests\bin\Debug\net10.0\Contoso.MyTests.exe'
```

---

## See also

- MTP overview
- MTP CLI options reference
- Testing with `dotnet test`
- `dotnet test` with MTP
- Run tests with MSTest
