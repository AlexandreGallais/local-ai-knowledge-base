---
title: "Microsoft.Testing.Platform (MTP) config options (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-config.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) configuration settings

MTP supports the use of configuration files and environment variables to configure the behavior of the test platform. This article describes the configuration settings that you can use to configure the test platform.

## testconfig.json

The test platform uses a configuration file named *[appname].testconfig.json* to configure the behavior of the test platform. The *testconfig.json* file is a JSON file that contains configuration settings for the test platform.

The *testconfig.json* file has the following structure:

```json
{
    "platformOptions": {
        "resultDirectory": "./TestResults"
    }
}
```

The platform will automatically detect and load the *[appname].testconfig.json* file located in the output directory of the test project (close to the executable).

When using Microsoft.Testing.Platform.MSBuild, you can simply create a *testconfig.json* file that will be automatically renamed to *[appname].testconfig.json* and moved to the output directory of the test project.

Starting with MTP 1.5, you can use the command-line argument `--config-file` to specify the path to the *testconfig.json*. This file takes precedence over the *[appname].testconfig.json* file.

> **Note:**
> The *[appname].testconfig.json* file will get overwritten on subsequent builds.

### Use a centralized testconfig.json

If you want a single *testconfig.json* shared across multiple test projects, you can place it in a central location and pass it via `--config-file`. When MSBuild is available (for example, `dotnet test` or `dotnet run`), you can use the `TestingPlatformCommandLineArguments` MSBuild property to automatically pass the argument. Adding this to a *Directory.Build.props* at the repository root ensures all test projects use the same configuration:

```xml
<PropertyGroup>
  <TestingPlatformCommandLineArguments>
    $(TestingPlatformCommandLineArguments) --config-file $(MSBuildThisFileDirectory)testconfig.json
  </TestingPlatformCommandLineArguments>
</PropertyGroup>
```

### Configuration precedence

When the same setting can be specified in multiple ways, MTP resolves it in the following order (first match wins):

1. Command-line arguments (for example, `--results-directory`)
1. Environment variables
1. *testconfig.json* settings
1. Built-in defaults

### Platform options

The `platformOptions` section of the *testconfig.json* file configures the core behavior of the test platform. The following table lists all supported platform options:

| Entry | Default | Description |
|-------|---------|-------------|
| `resultDirectory` | `TestResults` | The directory where the test results are placed. Can be a relative path (resolved from MTP's working directory) or an absolute path. The `--results-directory` command-line option takes precedence. |
| `exitProcessOnUnhandledException` | `false` | When set to `true`, the test host process exits immediately on unhandled exceptions instead of allowing graceful shutdown. The `TESTINGPLATFORM_EXIT_PROCESS_ON_UNHANDLED_EXCEPTION` environment variable (values `1` or `0`) takes precedence. |

> **Note:**
> Additional internal platform options exist for advanced scenarios (such as named-pipe timeouts for test host controllers). These options are intended for infrastructure use and are not covered here.

Example:

```json
{
  "platformOptions": {
    "resultDirectory": "../../TestResults",
    "exitProcessOnUnhandledException": false
  }
}
```

### Environment variables in testconfig.json

> **Note:**
> Available in MTP starting with version 2.3.0.

The `environmentVariables` section sets environment variables for the test process before it starts. Use string values for each variable.

```json
{
  "environmentVariables": {
    "DOTNET_ENVIRONMENT": "Development",
    "FEATURE_FLAG": "true"
  }
}
```

### CLI options in testconfig.json

Before MTP 2.3.0, extension features such as crash dump, hang dump, retry, TRX reports, and code coverage aren't configurable via *testconfig.json*. These features are configured exclusively through command-line arguments.

Starting with MTP 2.3.0, MTP can read CLI options from *testconfig.json* through `IConfiguration`. This support includes extension options, so you can use JSON entries for options that you don't want to pass on the command line each run. Command-line arguments still take precedence.

Configuration doesn't install or register an extension. Each test application must reference the package that provides an extension option, either directly or through a test SDK configuration or profile. Otherwise, the option remains unrecognized whether you put it in *testconfig.json* or on the command line.

Use the `commandLineOptions` object for active options. Omit the leading `--` from each key. Use `true` for a zero-argument option, and use `false` to disable an option. For one argument, use a string or number. For repeated or multiple arguments, use an array:

```json
{ "commandLineOptions": {
  "report-trx": true,
  "report-trx-filename": "results.trx",
  "filter-uid": ["test-1", "test-2"]
} }
```

MTP treats a string or number scalar as the first argument of an argument-bearing option. To pass a Boolean argument, use an array such as `[true]` or `[false]`. The array distinguishes the argument from a Boolean presence value.

MTP validates configured entries like command-line entries. Unknown options, invalid values, and values with the wrong arity fail validation. An explicit command-line option overrides the corresponding `commandLineOptions` entry.

Bootstrap-only options run before MTP loads configuration. Don't put `config-file`, `diagnostic`, `diagnostic-output-directory`, `diagnostic-file-prefix`, `diagnostic-verbosity`, `diagnostic-synchronous-write`, or `enable-dynamic-extensions` in `commandLineOptions`.

### Passive command-line option defaults

> **Important:**
> `commandLineOptionDefaults` is available starting with MTP 2.4.

Use `commandLineOptionDefaults` to supply an argument only when an enabled feature requests that option and no higher-priority value exists. A passive default doesn't enable an option, register an extension, or activate a feature. Omit the leading `--` from each key.

```json
{ "commandLineOptionDefaults": {
  "report-trx-filename": "{asm}.trx",
  "show-test-results": ["failed", "skipped"]
} }
```

MTP resolves an option value by using the first match in this priority order:

- An explicit command-line value.
- An active `commandLineOptions` entry.
- A `commandLineOptionDefaults` entry in *testconfig.json*.
- An MSBuild-provided default.

For an MSBuild-provided default, add a `TestingPlatformCommandLineOptionDefault` item. The `Include` value must omit leading hyphens:

```xml
<TestingPlatformCommandLineOptionDefault Include="report-trx-filename"
                                         Value="{asm}.trx" />
```

For a complete reference of command-line options, see MTP CLI options reference.

### Test framework-specific settings

Test frameworks can define their own configuration sections in the *testconfig.json* file. Refer to the documentation for your test framework:

- **MSTest**: Configure MSTest — testconfig.json
- **xUnit.net v3**: xUnit.net testconfig.json
- **NUnit**: See NUnit documentation for the latest Microsoft.Testing.Platform support.
- **TUnit**: See TUnit documentation for the latest Microsoft.Testing.Platform support.

### Example testconfig.json

The following example shows a *testconfig.json* file that configures platform options and MSTest settings:

```json
{
  "platformOptions": {
    "resultDirectory": "./TestResults"
  },
  "mstest": {
    "parallelism": {
      "enabled": true,
      "workers": 4,
      "scope": "method"
    },
    "timeout": {
      "test": 30000
    },
    "execution": {
      "considerFixturesAsSpecialTests": true
    }
  }
}
```

### Migrating from .runsettings to testconfig.json

If you're migrating from a *.runsettings* file, the following table maps common settings to their *testconfig.json* equivalents or alternatives:

| .runsettings setting | testconfig.json equivalent | Notes |
|---|---|---|
| `RunConfiguration/ResultsDirectory` | `platformOptions.resultDirectory` | |
| `RunConfiguration/MaxCpuCount` | No equivalent | Process-level parallelism is controlled by `dotnet test --max-parallel-test-modules` or MSBuild `/m` option. |
| `MSTest/*` | `mstest.*` | See Configure MSTest — testconfig.json. |
| `xUnit/*` | `xUnit.*` | See xUnit.net testconfig.json. |
| `LoggerRunSettings/Loggers` | CLI options | Use the option from the installed report extension. For example, `--report-trx` requires `Microsoft.Testing.Extensions.TrxReport`. Starting with MTP 2.3.0, MTP can read CLI options from *testconfig.json*. See Test reports. |
| `DataCollectionRunSettings` (blame) | CLI options | Use `--crashdump` from `Microsoft.Testing.Extensions.CrashDump` or `--hangdump` from `Microsoft.Testing.Extensions.HangDump`. Starting with MTP 2.3.0, MTP can read CLI options from *testconfig.json*. See Crash and hang dumps. |
| `DataCollectionRunSettings` (coverage) | CLI options | Use `--coverage` from `Microsoft.Testing.Extensions.CodeCoverage`. Starting with MTP 2.3.0, MTP can read CLI options from *testconfig.json*. See Code coverage. |
| `TestRunParameters` | `--test-parameter` CLI | Use `--test-parameter key=value` on the command line. |

## MSBuild configuration

> **Important:**
> `TestingPlatformEnvironmentVariable` is available starting with MTP 2.4.

To set an environment variable on the test process that `InvokeTestingPlatform` launches, add a `TestingPlatformEnvironmentVariable` item:

```xml
<TestingPlatformEnvironmentVariable Include="MY_OPTIONS"
                                    Value="first;second" />
```

The `Value` metadata preserves semicolons instead of splitting them into MSBuild items. Declared values overlay the environment that the MSBuild process inherits. Without these items, the launched process inherits the environment unchanged.

Starting with MTP 2.4, `InvokeTestingPlatform` also derives the architecture-specific `DOTNET_ROOT_<ARCH>` variable from `DOTNET_HOST_PATH` when it launches a compatible apphost. Set `TestingPlatformDisableAppHostDotnetRoot` to `true` to opt out. An applicable `TestingPlatformEnvironmentVariable` item remains authoritative.
