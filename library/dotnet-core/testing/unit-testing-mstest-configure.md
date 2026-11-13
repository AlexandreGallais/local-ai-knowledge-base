---
title: "Configure MSTest (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-configure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Configure MSTest

MSTest, Microsoft Testing Framework, is a test framework for .NET applications. It allows you to write and execute tests, and provide test suites with integration to Visual Studio and Visual Studio Code Test Explorers, the .NET CLI, and many CI pipelines.

MSTest is a fully supported, open-source and a cross-platform test framework that works with all supported .NET targets (.NET Framework, .NET Core, .NET, UWP, WinUI, and so on) hosted on GitHub.

## Shared assembly fixture discovery

Shared assembly fixture providers don't require a `.runsettings` or `testconfig.json` entry. MSTest automatically searches referenced non-framework assemblies, including transitive references, for `AssemblyFixtureProviderAttribute`. The assembly-level marker identifies a fixture type that an assembly supplies; it isn't a consuming test project's discovery opt-in.

The search follows assembly references emitted into compiled metadata, not every `ProjectReference` or `PackageReference`. A fixture-only library that the compiler omits from that graph needs an explicit consumer-side provider marker. You don't need to call a library API at runtime to force a load.

Neither configuration file provides a setting to enable or disable this provider search. Assembly-resolution settings control where MSTest resolves dependencies, not whether it searches for fixture providers.

In MSTest 4.3.0 through 4.5.2, the automatic search can load otherwise-unused assemblies and lock DLLs on Windows with .NET Framework. For marker placement, local-method precedence, and the temporary both-method workaround for affected versions, see Shared assembly fixtures with AssemblyFixtureProvider.

> **Note:**
> The metadata-first discovery change (unreleased) doesn't add a configuration switch. Its runtime-resolution fallback can still load unmarked references. MSTest 4.5.2 doesn't include the change.

## Runsettings

A *.runsettings* file can be used to configure how unit tests are being run. To learn more about the runsettings and the configurations related to the platform, you can check out VSTest runsettings documentation or MSTest runner runsettings documentation.

### Parallelization settings

To enable MSTest in-assembly parallelization, configure the `Parallelize` entry under `MSTest`, including its `Workers` and `Scope` values, as described in the table in the next section. To force parallelization off for the run, set `<RunConfiguration><DisableParallelization>true</DisableParallelization></RunConfiguration>`. The `DisableParallelization` setting overrides an `[assembly: Parallelize]` attribute.

For the behavior of the parallelization attributes and a comparison of every configuration mechanism, see Configure parallelization.

### MSTest element

The following runsettings entries let you configure how MSTest behaves.

| Configuration | Default | Values |
|---------------|---------|--------|
|`AssemblyCleanupTimeout`|None|Specify globally the timeout to apply on each instance of assembly cleanup method. `[Timeout]` attribute specified on the assembly cleanup method overrides the global timeout.|
|`AssemblyInitializeTimeout`|None|Specify globally the timeout to apply on each instance of assembly initialize method. `[Timeout]` attribute specified on the assembly initialize method overrides the global timeout.|
|`AssemblyResolution`|false|You can specify paths to extra assemblies when finding and running unit tests. For example, use these paths for dependency assemblies that aren't in the same directory as the test assembly. To specify a path, use a **Directory Path** element. Paths can include environment variables.`<AssemblyResolution>  <Directory path="D:\myfolder\bin\" includeSubDirectories="false"/> </AssemblyResolution>`This feature is only applied when using a .NET Framework target.|
|`CaptureAssertionFailureDiagnostics`|false|Starting with MSTest 4.5 preview, capture bounded JSON diagnostics when an MSTest assertion fails. The artifacts include assertion values, source frames, concurrently active tests, and process state. MSTest attaches up to three captures per test attempt to an unsuccessful result and deletes captures for a passing result. UWP, WinUI, Native AOT, and other environments without dynamic code don't support this setting.|
|`CaptureTraceOutput`|`Result`|Capture text from the `Console.Write*` and `Trace.Write*` APIs and associate it with the current test. On .NET Framework, capture also includes `Debug.Write*` through shared trace listeners. Modern .NET doesn't route `Debug.Write*` through those listeners, so MSTest doesn't capture it. Starting with MSTest 4.4, use `None`, `Result`, or `Live`. `Live` also echoes `Console`, `Trace`, and `TestContext.Write*` output while the test runs. The earlier Boolean values remain supported: `true` maps to `Result`, and `false` maps to `None`.|
|`ClassCleanupLifecycle`|EndOfClass|If you want the class cleanup to occur at the end of assembly, set it to `EndOfAssembly`. (No longer supported starting from MSTest v4 as `EndOfClass` is the default and only ClassCleanup behavior)|
|`ClassCleanupTimeout`|None|Specify globally the timeout to apply on each instance of class cleanup method. `[Timeout]` attribute specified on the class cleanup method overrides the global timeout.|
|`ClassInitializeTimeout`|None|Specify globally the timeout to apply on each instance of class initialize method. `[Timeout]` attribute specified on the class initialize method overrides the global timeout.|
|`ConsiderFixturesAsSpecialTests`|false|To display `AssemblyInitialize`, `AssemblyCleanup`, `ClassInitialize`, `ClassCleanup` as individual entries in Visual Studio and Visual Studio Code `Test Explorer` and _.trx_ log, set this value to **true**|
|`DeleteDeploymentDirectoryAfterTestRunIsComplete`|true|To retain the deployment directory after a test run, set this value to **false**.|
|`DeploymentEnabled`|true|If you set the value to **false**, deployment items that you specify in your test method aren't copied to the deployment directory.|
|`DeployTestSourceDependencies`|true|A value indicating whether the test source references are to be deployed.|
|`EnableBaseClassTestMethodsFromOtherAssemblies`|true|A value indicating whether to enable discovery of test methods from base classes in a different assembly from the inheriting test class.|
|`ForcedLegacyMode`|false|In older versions of Visual Studio, the MSTest adapter was optimized to make it faster and more scalable. Some behavior, such as the order in which tests are run, might not be exactly as it was in previous editions of Visual Studio. Set the value to **true** to use the older test adapter.For example, you might use this setting if you have an *app.config* file specified for a unit test.We recommend that you consider refactoring your tests to allow you to use the newer adapter.|
|`GlobalTestCleanupTimeout`|`TestCleanupTimeout`|Starting with MSTest 4.4, specify the timeout for each global test cleanup method. When you omit this entry, MSTest uses `TestCleanupTimeout`. A `[Timeout]` attribute on the method overrides both values.|
|`GlobalTestInitializeTimeout`|`TestInitializeTimeout`|Starting with MSTest 4.4, specify the timeout for each global test initialize method. When you omit this entry, MSTest uses `TestInitializeTimeout`. A `[Timeout]` attribute on the method overrides both values.|
|`LaunchDebuggerOnTestFailure`|false|Starting with MSTest 4.2, when set to **true**, MSTest launches the debugger when a test fails.|
|`MapInconclusiveToFailed`|false|If a test completes with an inconclusive status, it's mapped to the skipped status in **Test Explorer**. If you want inconclusive tests to be shown as failed, set the value to **true**.|
|`MapNotRunnableToFailed`|true|A value indicating whether a not runnable result is mapped to failed test.|
|`OrderTestsByNameInClass`|false|If you want to run tests by test names both in Test Explorers and on the command line, set this value to **true**.|
|`Parallelize`||Used to set the parallelization settings:`Workers`: The number of threads/workers to be used for parallelization, which is by default **the number of processors on the current machine**.`Scope`: The scope of parallelization. You can set it to `MethodLevel`. By default, it's `ClassLevel`.`<Parallelize><Workers>32</Workers><Scope>MethodLevel</Scope></Parallelize>`|
|`RandomizeTestOrder`|false|Starting with MSTest 4.3, set this value to **true** to run tests in a random order, which helps surface hidden ordering dependencies between tests. This setting can't be combined with `OrderTestsByNameInClass`.|
|`RandomTestOrderSeed`||Starting with MSTest 4.3, when `RandomizeTestOrder` is **true**, set an integer seed to make the random order reproducible across runs. When unset, a new seed is used for each run.|
|`SettingsFile`||You can specify a test settings file to use with the MSTest adapter here. You can also specify a test settings file from the settings menu.If you specify this value, you must also set the `ForcedLegacyMode` to **true**.`<ForcedLegacyMode>true</ForcedLegacyMode>`|
|`TestCleanupTimeout`|None|Specify globally the timeout to apply on each instance of test cleanup method. `[Timeout]` attribute specified on the test cleanup method overrides the global timeout.|
|`TestInitializeTimeout`|None|Specify globally the timeout to apply on each instance of test initialize method. `[Timeout]` attribute specified on the test initialize method overrides the global timeout.|
|`TestTimeout`|None|Gets specified global test case timeout.|
|`TreatClassAndAssemblyCleanupWarningsAsErrors`|false|To see your failures in class cleanups as errors, set this value to **true**.|
|`TreatDiscoveryWarningsAsErrors`|false|To report test discovery warnings as errors, set this value to **true**.|

Timeout values must be positive integers in milliseconds. To run without a timeout, omit the entry instead of setting it to `0`. Global test fixture timeouts inherit the corresponding `TestInitializeTimeout` or `TestCleanupTimeout` value.

### `TestRunParameter` element

```xml
<TestRunParameters>
    <Parameter name="webAppUrl" value="http://localhost" />
</TestRunParameters>
```

Test run parameters provide a way to define variables and values that are available to the tests at runtime. Access the parameters using the MSTest `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.Properties` property:

```csharp
private string _appUrl;
public TestContext TestContext { get; set; }

[TestMethod]
public void HomePageTest()
{
    string _appUrl = TestContext.Properties["webAppUrl"];
}
```

To use test run parameters, add a public `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` property to your test class.

### Example *.runsettings* file

The following XML shows the contents of a typical *.runsettings* file. Copy this code and edit it to suit your needs.

Each element of the file is optional because it has a default value.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>

  <!-- Parameters used by tests at runtime -->
  <TestRunParameters>
    <Parameter name="webAppUrl" value="http://localhost" />
    <Parameter name="webAppUserName" value="Admin" />
    <Parameter name="<example-value>" <example-value>"<example-value>" />
  </TestRunParameters>

  <!-- MSTest -->
  <MSTest>
    <MapInconclusiveToFailed>True</MapInconclusiveToFailed>
    <CaptureTraceOutput>false</CaptureTraceOutput>
    <DeleteDeploymentDirectoryAfterTestRunIsComplete>False</DeleteDeploymentDirectoryAfterTestRunIsComplete>
    <DeploymentEnabled>False</DeploymentEnabled>
    <ConsiderFixturesAsSpecialTests>False</ConsiderFixturesAsSpecialTests>
    <AssemblyResolution>
      <Directory path="D:\myfolder\bin\" includeSubDirectories="false"/>
    </AssemblyResolution>
  </MSTest>

</RunSettings>
```
