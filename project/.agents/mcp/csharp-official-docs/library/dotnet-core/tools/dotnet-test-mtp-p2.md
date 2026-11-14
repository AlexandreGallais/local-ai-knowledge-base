---
title: "dotnet test command with Microsoft.Testing.Platform (MTP) (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-test-mtp.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet test command with Microsoft.Testing.Platform (MTP) (part 2 of 3)

## Options

> **Note:**
> You can use only one of the following options at a time: `--project`, `--solution`, or `--test-modules`. These options can't be combined.
> In addition, when you use `--test-modules`, you can't specify `--arch`, `--configuration`, `--device`, `--framework`, `--list-devices`, `--os`, `--runtime`, or `--use-current-runtime`. These options require project evaluation or aren't relevant for an already-built module.

- **`PROJECT_OR_TRAVERSAL_PATH`**

  Specifies a project or traversal project to run. Starting with .NET 11, `dotnet test` supports `Microsoft.Build.Traversal` projects, such as `dirs.proj`, and recursively runs their referenced test projects.

  Starting with .NET 12 Preview 1, the argument can also identify a C# file-based MTP test app. File-based test apps don't support `--device`.

- **`--project <PROJECT_PATH>`**

  Specifies the path of the project file to run (folder name or full path). If not specified, it defaults to the current directory.

- **`--solution <SOLUTION_PATH>`**

  Specifies the path of the solution file to run (folder name or full path). If not specified, it defaults to the current directory.

- **`--test-modules <EXPRESSION>`**

  Filters test modules using file globbing. Only tests belonging to those test modules run. Because this option doesn't evaluate projects, use it to run already-built test applications when project restore state isn't available. Starting with .NET 11, prefix a pattern with `!` to exclude matching modules. Separate multiple patterns with semicolons; whitespace around each pattern is ignored.

- **`--root-directory <ROOT_PATH>`**

  Specifies the root directory of the `--test-modules` option. It can only be used with the `--test-modules` option.

- **`--max-parallel-test-modules <NUMBER>`**

  Specifies the maximum number of test modules that can run in parallel. The default is `System.Environment.ProcessorCount`.

- **`--config-file <CONFIG_FILE>`**

  Specifies the configuration file to use for test execution. If a relative path is provided, it's converted to an absolute path based on the current directory. For more information about the configuration file settings, see testconfig.json.

- **`--results-directory <RESULTS_DIRECTORY>`**

  Specifies the directory where test results are stored. If the directory doesn't exist, it's created. If a relative path is provided, it's converted to an absolute path based on the current directory. For defaults and layout overrides, see Results and artifacts.

- **`--results-directory-layout <flat|per-module>`**

  Specifies how a multi-module run organizes files under the results directory. The default, `flat`, writes all results to the same directory. `per-module` writes each module's results to `<project>/<target-framework>_<runtime-or-architecture>`, which prevents reports with the same relative file name from overwriting one another. A shared absolute extension output path, such as an absolute `--coverage-output` path, bypasses this layout.

  Available starting with .NET 11. The option is also available in .NET SDK 10.0.402 and later updates in the 10.0.4xx feature band.

- **`--diagnostic-output-directory <DIAGNOSTIC_OUTPUT_DIRECTORY>`**

  Specifies the directory where diagnostic output is stored. If the directory doesn't exist, it's created. If a relative path is provided, it's converted to an absolute path based on the current directory.

- **`--minimum-expected-tests <NUMBER>`**

  Specifies a positive minimum number of tests for the whole run. If the aggregated test count is less than the specified minimum, the test run fails with exit code 9. The global count includes skipped tests. For more information about exit codes, see MTP exit codes.

  Because this option appears before `--`, it's a global (whole-run) option. To require a minimum for each test module instead, pass the option after `--` so that it's forwarded to every test module. For more information, see Whole-run and per-module minimums.

  > **Note:**
  > The global minimum requires the .NET 10 SDK (10.0.100) or a later version.

- **`--maximum-failed-tests <NUMBER>`**

  Stops the complete run after it reaches the specified number of failed, errored, timed-out, or canceled tests. The run exits with code 13.

  Available starting with .NET 11 and requires MTP 2.4 or later.

- **`--timeout <DURATION>`**

  Stops the complete run after the specified duration while at least one test application is running. Specify a positive number followed by a unit, such as `500ms`, `90s`, `10m`, `2h`, or `1d`. A timed-out run exits with code 3.

  Available starting with .NET 11 and requires MTP 2.4 or later.

- **`-e|--environment <NAME="VALUE">`**

  Sets an environment variable for the test process. Specify the option multiple times to set multiple variables. Command-line values override values from a launch profile.

  Use .NET SDK 10.0.110 or later when no launch profile exists or when you specify `--no-launch-profile`; earlier .NET 10 SDK versions can ignore the variables in those cases. Starting with .NET 11, the variables also flow to capability-aware build, device selection, deployment, and run-argument targets.

- **`-a|--arch <ARCHITECTURE>`**

Specifies the target architecture. This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--arch x86` sets the RID to `win-x86`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6 Preview 7.

- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see Artifacts Output Layout. This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.

  Available for MTP mode starting with .NET 11.

- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. The default for most projects is `Debug`, but you can override the build configuration settings in your project.

- **`-f|--framework <FRAMEWORK>`**

  The target framework moniker (TFM) of the target framework to run tests for. The target framework must also be specified in the project file.

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  The target runtime to test for.

  Short form `-r` available starting in .NET SDK 7.

  > **Note:**
  > Running tests for a solution with a global `RuntimeIdentifier` property (explicitly or via `--arch`, `--runtime`, or `--os`) isn't supported. Set `RuntimeIdentifier` on an individual project level instead.

- **`--use-current-runtime|--ucr`**

  Uses the current runtime as the target runtime during restore and build.

  Available starting with .NET 11. You can't combine this option with `--test-modules`.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`--no-build`**

  Specifies that the test project isn't built before being run. It also implicitly sets the `--no-restore` flag.

- **`--no-dependencies`**

  Skips building project-to-project references.

  Available starting with .NET 11.

- **`--no-restore`**

  Specifies that an implicit restore isn't executed when running the command.

- **`--nologo|--no-logo|--no-banner`**

  Suppresses the .NET and MTP startup banners. The `-nologo` and `/nologo` forms and the `DOTNET_NOLOGO` environment variable are also supported.

  Available in MTP mode starting with .NET 11.

- **`--no-ansi`**

  Disables outputting ANSI escape characters to screen.

- **`--no-progress`**

  Disables reporting progress to screen.

- **`--no-artifact-post-processing`**

  Disables post-processing of compatible artifacts after a multi-module run. Starting with .NET 11 and MTP 2.4, registered artifact post-processors can combine compatible reports, such as TRX results. If post-processing fails, the SDK preserves the original artifacts and the test exit code.

- **`--output <VERBOSITY_LEVEL>`**

  Specifies the output verbosity for test results. Valid values are `Minimal`, `Normal`, and `Detailed`. The default is `Normal`. `Minimal` requires MTP 2.4 preview.

- **`--show-test-results <OUTCOME>`**

  Selects result blocks by outcome. In MTP 2.4 preview, use `passed`, `failed`, `skipped`, `all`, or `none`. The `failed` value also includes errors, timeouts, and cancellations.

  Combine `passed`, `failed`, and `skipped` with commas, spaces, or repeated `--show-test-results` options. Don't combine `all` or `none` with another value. This explicit option overrides the `--output` preset regardless of option order.

- **`--list-tests [text|json]`**

  Lists discovered tests without executing them. Omit the value or specify `text` for human-readable output. Starting with .NET 11, specify `json` for a versioned JSON document that groups tests by assembly, target framework, and architecture and includes available identifiers, source locations, methods, parameters, and traits.

- **`--no-launch-profile`**

  Don't attempt to use launchSettings.json to configure the application. By default, `launchSettings.json` is used, which can apply environment variables and command-line arguments to the test executable.

- **`--no-launch-profile-arguments`**

  Don't use arguments specified by `commandLineArgs` in launch profile to run the application.

- **`--device <DEVICE_ID>`**

  Selects a device, emulator, or simulator for each target framework in an Android or iOS test project. The MTP path also supports macOS and Mac Catalyst test projects. If input is interactive and more than one device is available, `dotnet test` can prompt you to select one.

  Available starting with .NET 11. For multi-targeted projects, use .NET 11 or later so device discovery evaluates each target framework correctly. Browser WebAssembly test projects aren't supported by this option.

- **`--list-devices`**

  Lists available devices for a project without running tests. Specify a project rather than a solution.

  Available starting with .NET 11.

- **`--collect-test-map`** and **`--affected-tests`**

  Collect a repository test map or run tests affected by a change. These experimental options require a separately distributed extension and the `DOTNET_CLI_ENABLE_AFFECTED_TESTS=1` environment variable. You can't combine the two options. Affected-test workflows also don't support device testing, parallel test modules, or minimum-test policies.

  Available starting with .NET 11.

- **`--property:<NAME>=<VALUE>`**

  Sets one or more MSBuild properties. Specify multiple properties by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

  The short form `-p` can be used for `--property`. The same applies for `/property:property=value` and its short form is `/p`.
  More information about the available arguments can be found in the dotnet msbuild documentation.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`args`**

  Specifies extra arguments to pass to the test application(s). Use a space to separate multiple arguments. For more information and examples on what to pass, see MTP overview and MTP features.

  > **Tip:**
  > To specify extra arguments for specific projects, use the `TestingPlatformCommandLineArguments` MSBuild property. This property is especially useful when your solution mixes test frameworks (for example, MSTest and xUnit.net) or when only some projects reference a particular extension. For more information, see Solutions with mixed test frameworks or extensions.

> **Note:**
> To enable trace logging to a file, use the environment variable `DOTNET_CLI_TEST_TRACEFILE` to provide the path to the trace file.
>
> Starting with .NET 11, `dotnet test -bl` uses one MSBuild session for multi-project, multi-targeted, and device runs so the binary log contains the complete build.

## Output and cancellation behavior

Starting with .NET 11, interactive ANSI output shows tests that are currently running and reports per-assembly test counts. The progress display remains disabled when output is redirected, ANSI or progress output is disabled, or the environment isn't interactive.

Starting with .NET 11, the first `Ctrl`+`C` stops scheduling new test applications and requests cooperative cancellation. Press `Ctrl`+`C` again to terminate the child processes immediately. An aborted run exits with code 3.

Live test-host output requires an MTP host that supports protocol 1.1 or later. Older hosts keep output captured and replay it for a failed module. Starting with .NET 11, failure summaries truncate captured standard output longer than 40 lines to the first 30 and last 10 lines; diagnostic logs retain the complete output.

For multi-module runs, `dotnet test` evaluates the zero-test result across the complete run starting with .NET 11. A module with no tests doesn't fail the run if another module executes tests successfully, unless an explicit minimum-test policy requires more tests.

## Results and artifacts

With .NET SDK 10.0.200 or later and MTP 2.3.1 or later, the default results directory is `TestResults` beneath the directory where you invoke `dotnet test`. The SDK supplies that directory through `DOTNET_CLI_TEST_COMMAND_WORKING_DIRECTORY`, which MTP uses as its working directory and the base for default results. Previously, each test application used its own output directory as the base.

With the default `flat` layout, test applications from the same invocation share the results directory. To isolate their relative report paths, use `--results-directory-layout per-module`. For coverage-specific file names and collision risks, see Coverage output files.

When the SDK artifacts output layout is enabled, .NET 11 and later versions place MTP reports, coverage files, and diagnostics under `<ArtifactsPath>/test/<project>/<pivot>` by default. An explicit `--results-directory` or `--results-directory-layout` takes precedence.

Starting with .NET 11 and MTP 2.4, compatible extensions can post-process artifacts from a multi-module run. For example, the TRX extension can create a merged report while preserving the per-module reports. For extension and report requirements, see MTP test reports.
