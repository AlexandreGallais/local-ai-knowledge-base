---
title: "Configure MSTest (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-configure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configure MSTest (part 2 of 2)

## testconfig.json

When running your tests with MSTest, you can use a `testconfig.json` file to configure the behavior of the test runner. The `testconfig.json` file is a JSON file that contains the configuration settings for the test runner. The file is used to configure the test runner and the test execution environment. For more information, refer to MTP testconfig.json documentation.

Starting with MSTest 3.7, you can also configure MSTest runs in the same configuration file. The following sections describe the settings that you can use in the `testconfig.json` file.

Starting with MSTest 4.3.3, .NET Framework runs also accept comments and trailing commas in `testconfig.json`.

### MSTest element

MSTest settings are grouped by functionality that are described in the sections that follow.

| Entry | Default | Description |
|-------|---------|-------------|
| enableBaseClassTestMethodsFromOtherAssemblies | true | A value indicating whether to enable discovery of test methods from base classes in a different assembly from the inheriting test class. |
| classCleanupLifecycle | EndOfAssembly | If you want the class cleanup to occur at the end of the class, set it to **EndOfClass**. |

#### `assemblyResolution` settings

All the settings in this section belong to the `assemblyResolution` element.

| Entry | Default | Description |
|-------|---------|-------------|
| paths | None | You can specify paths to extra assemblies when finding and running unit tests. For example, use these paths for dependency assemblies that aren't in the same directory as the test assembly. You can specify a path in the shape `{ "path": "...", "includeSubDirectories": "true/false" }`. |

Example:

```json
{
  "mstest": {
    "assemblyResolution": {
        { "path": "...", "includeSubDirectories": "true/false" }
    }
  }
}
```

#### `deployment` settings

All the settings in this section belong to the `deployment` element.

| Entry | Default | Description |
|-------|---------|-------------|
| deleteDeploymentDirectoryAfterTestRunIsComplete | true | To retain the deployment directory after a test run, set this value to **false**. |
| deployTestSourceDependencies | true | Indicates whether the test source references are to be deployed. |
| enabled | true | If you set the value to **false**, deployment items that you specify in your test method aren't copied to the deployment directory. |

Example:

```json
{
  "mstest": {
    "deployment": {
        "deleteDeploymentDirectoryAfterTestRunIsComplete": true,
        "deployTestSourceDependencies": true,
        "enabled": true
    }
  }
}
```

#### `output` settings

All the settings in this section belong to the `output` element.

| Entry | Default | Description |
|-------|---------|-------------|
| captureTrace | `Result` | Capture `Console` and `Trace` output and associate it with the current test. On .NET Framework, capture also includes `Debug` output through shared trace listeners. Modern .NET `Debug.Write*` output isn't captured. Starting with MSTest 4.4, use `None`, `Result`, or `Live`. `Live` also echoes output, including `TestContext.Write*` messages, while the test runs. The Boolean values remain supported: `true` maps to `Result`, and `false` maps to `None`. |

Example:

```json
{
  "mstest": {
    "output": {
        "captureTrace": false
    }
  }
}
```

#### `parallelism` settings

All the settings in this section belong to the `parallelism` element.

For the behavior of the parallelization attributes and a comparison of every configuration mechanism, see Configure parallelization.

| Entry | Default | Description |
|-------|---------|-------------|
| enabled | false | Enable test parallelization. |
| scope | class | The scope of parallelization. You can set it to `method`. The default, `class`, corresponds to running all tests of a given class sequentially but multiple classes in parallel. |
| workers | 0 | The number of threads/workers to be used for parallelization. The default value maps to the number of processors on the current machine. |

Example:

```json
{
  "mstest": {
    "parallelism": {
        "enabled": true,
        "scope": "method",
        "workers": 32
    }
  }
}
```

#### `execution` settings

All the settings in this section belong to the `execution` element.

| Entry | Default | Description |
|-------|---------|-------------|
| considerEmptyDataSourceAsInconclusive | false | When set to `true`, an empty data source is considered as inconclusive. |
| considerFixturesAsSpecialTests | false | To display `AssemblyInitialize`, `AssemblyCleanup`, `ClassInitialize`, `ClassCleanup` as individual entries in Visual Studio and Visual Studio Code `Test Explorer` and _.trx_ log, set this value to **true**. |
| captureAssertionFailureDiagnostics | false | Starting with MSTest 4.5 preview, capture up to three JSON assertion-failure diagnostic artifacts per test attempt. The setting maps to `CaptureAssertionFailureDiagnostics` in *.runsettings*. |
| dependencies | | Starting with MSTest 4.4, declare test dependency `chains` and `nodes`. This setting is available only with Microsoft.Testing.Platform. For more information, see Test dependencies. |
| mapInconclusiveToFailed | false | If a test completes with an inconclusive status, it's mapped to the skipped status in **Test Explorer**. If you want inconclusive tests to be shown as failed, set the value to **true**. |
| launchDebuggerOnTestFailure | false | Starting with MSTest 4.2, when set to `true`, MSTest launches the debugger when a test fails. |
| mapNotRunnableToFailed | true | A value indicating whether a not runnable result is mapped to failed test. |
| orderTestsByNameInClass | false | Run tests in alphabetical order within each class. Starting with MSTest 4.3, use `mstest.execution.orderTestsByNameInClass`. The earlier `mstest.orderTestsByNameInClass` key still works but produces a deprecation warning. |
| randomizeTestOrder | false | Starting with MSTest 4.3, set this value to `true` to run tests in a random order, which helps surface hidden ordering dependencies between tests. This setting can't be combined with `orderTestsByNameInClass`. |
| randomTestOrderSeed | | Starting with MSTest 4.3, when `randomizeTestOrder` is `true`, set an integer seed to make the random order reproducible across runs. When unset, a new seed is used for each run. |
| treatClassAndAssemblyCleanupWarningsAsErrors | false | To see your failures in class cleanups as errors, set this value to **true**. |
| treatDiscoveryWarningsAsErrors | false | To report test discovery warnings as errors, set this value to **true**. |

Example:

```json
{
  "mstest": {
    "execution": {
        "considerEmptyDataSourceAsInconclusive": false,
        "considerFixturesAsSpecialTests": false,
        "mapInconclusiveToFailed": true,
        "mapNotRunnableToFailed": true,
        "treatClassAndAssemblyCleanupWarningsAsErrors": false,
        "treatDiscoveryWarningsAsErrors": false
    }
  }
}
```

The generated files use names such as `mstest-assertion-failure-state-attempt-1-invocation-1-capture-1.json`. Diagnostics are best effort and never replace or hide the original assertion failure.

> **Important:**
> Assertion-failure diagnostic artifacts can contain source file paths, test names, assertion values, and process metadata. If you publish these files as CI artifacts, restrict access to them and use the shortest retention period that meets your needs.

#### `timeout` settings

All the settings in this section belong to the `timeout` element.

| Entry | Default | Description |
|-------|---------|-------------|
| assemblyCleanup | None | Specify globally the timeout to apply on each instance of assembly cleanup method. |
| assemblyInitialize | None | Specify globally the timeout to apply on each instance of assembly initialize method. |
| classCleanup | None | Specify globally the timeout to apply on each instance of class cleanup method. |
| classInitialize | None | Specify globally the timeout to apply on each instance of class initialize method. |
| globalTestCleanup | `testCleanup` | Starting with MSTest 4.4, specify the timeout for each global test cleanup method. When you omit this entry, MSTest uses `testCleanup`. |
| globalTestInitialize | `testInitialize` | Starting with MSTest 4.4, specify the timeout for each global test initialize method. When you omit this entry, MSTest uses `testInitialize`. |
| test | None | Specify globally the test timeout. |
| testCleanup | None | Specify globally the timeout to apply on each instance of test cleanup method. |
| testInitialize | None | Specify globally the timeout to apply on each instance of test initialize method. |
| useCooperativeCancellation | false | When set to `true`, in case of timeout, MSTest will only trigger cancellation of the `CancellationToken` but will not stop observing the method. This behavior is more performant but relies on the user to correctly flow the token <example-value> all paths. |

> **Note:**
> Timeout values must be positive integers in milliseconds. To run without a timeout, omit the entry instead of setting it to `0`. Global test fixture timeouts inherit the corresponding `testInitialize` or `testCleanup` value, so omit both entries when you don't want a timeout on a global fixture. A `[Timeout]` attribute on a method overrides the configured timeout.

Example:

```json
{
  "mstest": {
    "timeout": { "globalTestInitialize": 30000, "globalTestCleanup": 30000 }
  }
}
```

### Example *testconfig.json* file

The following JSON shows the contents of a typical *.testconfig.json* file. Copy this code and edit it to suit your needs.

Each element of the file is optional because it has a default value.

```json
{
  "platformOptions": {
    "resultDirectory": "./TestResults"
  },
  "mstest": {
    "execution": {
        "mapInconclusiveToFailed": true,
        "disableAppDomain": true,
        "considerFixturesAsSpecialTests": false
    },
    "parallelism": {
        "enabled": true,
        "scope": "method"
    },
    "output": {
        "captureTrace": false
    }
  }
}
```

## MSBuild properties

Starting with MSTest 4.3, opt in to assembly-level parallelization from your project file or `Directory.Build.props` without authoring an `[assembly: Parallelize]` attribute. These properties emit the corresponding assembly attribute during build, so they require `GenerateAssemblyInfo` to be `true` (the default for SDK-style projects).

For the behavior of the generated attributes and a comparison of every configuration mechanism, see Configure parallelization.

| Property | Default | Description |
|----------|---------|-------------|
| `MSTestParallelizeScope` | | The parallelization scope. Set it to `MethodLevel` or `ClassLevel` to emit `[assembly: Parallelize(Scope = ExecutionScope.MethodLevel)]` (or `ExecutionScope.ClassLevel`), or to `None` to emit `[assembly: DoNotParallelize]`. |
| `MSTestParallelizeWorkers` | | The maximum number of worker threads, emitted as the `Workers` value of `[assembly: Parallelize]`. A value of `0` maps to the number of processors on the current machine. This property can't be set when `MSTestParallelizeScope` is `None`. |

MSTest validates both properties during the build. Invalid scope values, non-integer worker counts, and a worker count combined with a `None` scope fail the build. Don't also declare `[assembly: Parallelize]` or `[assembly: DoNotParallelize]` in source, because the generated attribute would duplicate it. When `GenerateAssemblyInfo` is `false`, declare the attribute in source instead.

The following example enables method-level parallelization with four workers for every test project that imports the `Directory.Build.props` file:

```xml
<Project>
  <PropertyGroup>
    <MSTestParallelizeScope>MethodLevel</MSTestParallelizeScope>
    <MSTestParallelizeWorkers>4</MSTestParallelizeWorkers>
  </PropertyGroup>
</Project>
```
