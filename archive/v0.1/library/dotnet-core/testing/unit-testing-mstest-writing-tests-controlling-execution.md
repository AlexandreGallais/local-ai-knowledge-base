---
title: "Test execution and control in MSTest (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-controlling-execution.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test execution and control in MSTest

MSTest provides attributes to control how tests execute, including parallelization, threading models, timeouts, retries, and conditional execution based on platform or environment.

## Threading attributes

Threading attributes control which thread model test methods use. These attributes are essential when testing COM components, UI elements, or code with specific threading requirements.

### `STATestClassAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.STATestClassAttribute` runs all test methods in a class (including `ClassInitialize` and `ClassCleanup`) in a single-threaded apartment (STA). Use this attribute when testing COM objects that require STA.

```csharp
[STATestClass]
public class ComInteropTests
{
    [TestMethod]
    public void TestComComponent()
    {
        // This test runs in an STA thread
        var comObject = new SomeComObject();
        // Test COM interactions
    }
}
```

> **Note:**
> This attribute is only supported on Windows in MSTest v3.6 and later.

### `STATestMethodAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.STATestMethodAttribute` runs a specific test method in a single-threaded apartment. Use this attribute for individual tests that need STA while other tests in the class don't.

```csharp
[TestClass]
public class MixedThreadingTests
{
    [STATestMethod]
    public void TestRequiringSTA()
    {
        // This test runs in an STA thread
    }

    [TestMethod]
    public void RegularTest()
    {
        // This test uses default threading
    }
}
```

> **Note:**
> This attribute is only supported on Windows in MSTest v3.6 and later.

#### Preserve STA context for async continuations

Starting with MSTest 4.1, the `STATestMethodAttribute` includes a `UseSTASynchronizationContext` property that ensures async continuations run on the same STA thread. When enabled, the attribute creates a custom `SynchronizationContext` that posts continuations back to the STA thread, which is essential for testing UI components that require STA threading throughout their async operations.

```csharp
[TestClass]
public class UIComponentTests
{
    [STATestMethod(UseSTASynchronizationContext = true)]
    public async Task TestAsyncUIOperation()
    {
        // Initial code runs on STA thread
        var control = new MyControl();
        
        await control.LoadDataAsync();
        
        // Continuation also runs on STA thread,
        // ensuring UI operations remain valid
        Assert.IsTrue(control.IsDataLoaded);
    }
}
```

> **Tip:**
> Use `UseSTASynchronizationContext = true` when testing Windows Forms or WPF components that perform async operations and expect their continuations to run on the same thread.

### `UITestMethodAttribute`

The `UITestMethod` attribute schedules test execution on the UI thread. This attribute is designed for testing UWP and WinUI applications that require UI thread access.

```csharp
[TestClass]
public class WinUITests
{
    [UITestMethod]
    public void TestUIComponent()
    {
        // This test runs on the UI thread
        var button = new Button();
        button.Content = "Click me";
        Assert.IsNotNull(button.Content);
    }
}
```

> **Note:**
> This attribute requires the appropriate MSTest adapter for UWP or WinUI platforms. For more information, see the platform support section.

## Parallelization attributes

Parallelization attributes control whether and how tests run concurrently, improving test execution time.

### Configure parallelization

MSTest runs tests sequentially within each test assembly by default. Use one of the following mechanisms to explicitly enable or disable in-assembly parallelization:

| Mechanism | Enable parallelization | Disable parallelization |
|-----------|------------------------|-------------------------|
| Source attributes | Apply `[assembly: Parallelize]`, and optionally set its scope and worker count. | Apply `[assembly: DoNotParallelize]` to disable parallelization for the assembly. Apply `[DoNotParallelize]` to a class or method to opt only those tests out after you enable assembly parallelization. |
| *.runsettings* | Configure the MSTest `Parallelize` entry. | Set `RunConfiguration.DisableParallelization` to `true`. This setting forces parallelization off even when the assembly has a `[Parallelize]` attribute. |
| *testconfig.json* | Set `mstest.parallelism.enabled` to `true`, and optionally configure `scope` and `workers`. | Set `mstest.parallelism.enabled` to `false`. |
| MSBuild properties | Set `MSTestParallelizeScope` to `ClassLevel` or `MethodLevel`, and optionally set `MSTestParallelizeWorkers`. | Set `MSTestParallelizeScope` to `None`. These properties generate the corresponding assembly attribute, so don't also declare the attribute in source. |

### `ParallelizeAttribute`

By default, MSTest runs tests sequentially. The `Microsoft.VisualStudio.TestTools.UnitTesting.ParallelizeAttribute` assembly-level attribute enables parallel test execution.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[assembly: Parallelize(Workers = 0, Scope = ExecutionScope.MethodLevel)]
```

#### Parallelization scope

| Scope | Behavior |
|-------|----------|
| `ClassLevel` | Multiple test classes run in parallel, but tests within a class run sequentially |
| `MethodLevel` | Individual test methods can run in parallel, regardless of their class |

#### Worker threads

The `Workers` property specifies the maximum number of threads for parallel execution:

- `0` (default): Use the number of logical processors on the machine
- Any positive integer: Use that specific number of threads

```csharp
// Parallelize at class level with 2 worker threads
[assembly: Parallelize(Workers = 2, Scope = ExecutionScope.ClassLevel)]
```

> **Tip:**
> To choose a configuration mechanism, see Configure parallelization.

> **Tip:**
> Enable parallelization at the assembly level by default, even if many tests currently require sequential execution. This approach encourages writing new tests that support parallel execution from the start. Use the MSTEST0001 analyzer to ensure that the assembly explicitly declares its parallelization intent with `[assembly: Parallelize]` or `[assembly: DoNotParallelize]`. Once parallelization is enabled, review each test class to determine whether it safely supports concurrent execution. Often, excluding just a few classes or methods with `DoNotParallelize` is sufficient, allowing the majority of your tests to run in parallel for significantly faster test execution.

### `DoNotParallelizeAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.DoNotParallelizeAttribute` prevents parallel execution for specific assemblies, classes, or methods. Use this attribute when tests share state or resources that can't be safely accessed concurrently.

When you enable in-assembly parallelization, MSTest partitions each test source (assembly) into parallelizable and nonparallelizable tests. MSTest runs the parallelizable set first, then runs the `DoNotParallelize` set one test at a time at the end of that source's run. In runs that include multiple test sources, each source has its own deferred tail. Because deferred tests can't overlap with other tests in the same source, a slow deferred test usually increases that source's critical path by about its own duration.

Because MSTest runs deferred tests only after the parallelizable phase finishes, a canceled or aborted run can end before MSTest executes deferred tests. The execution order described here is an internal implementation detail and isn't a public contract. It might change in a future version of MSTest.

```csharp
[assembly: Parallelize(Scope = ExecutionScope.MethodLevel)]

[TestClass]
public class ParallelTests
{
    [TestMethod]
    public void CanRunInParallel()
    {
        // This test can run with others
    }
}

[TestClass]
[DoNotParallelize]
public class SequentialTests
{
    [TestMethod]
    public void MustRunSequentially()
    {
        // This class's tests run sequentially
    }
}

[TestClass]
public class MixedTests
{
    [TestMethod]
    public void CanRunInParallel()
    {
        // This test can run with others
    }

    [TestMethod]
    [DoNotParallelize]
    public void MustBeIsolated()
    {
        // This specific test doesn't run in parallel
    }
}
```

> **Note:**
> You only need `DoNotParallelize` when you've enabled in-assembly parallelization. When parallelization is disabled (the default), `DoNotParallelize` has no effect.

### `ResourceLockAttribute`

Use `[ResourceLock]` to serialize only tests that access the same named resource. Unlike `[DoNotParallelize]`, a resource lock doesn't block tests that use unrelated resources. The default `ReadWrite` mode is exclusive, while multiple tests that request `ResourceAccessMode.Read` for the same resource can run together.

```csharp
private const string Database = "integration-database";

[TestMethod]
[ResourceLock(Database, Mode = ResourceAccessMode.Read)]
public void ReadsSharedSchema() { }
```

For process-wide state, use the constants in `WellKnownResources`: `CurrentDirectory`, `EnvironmentVariables`, and `Console`. Lock names use ordinal, case-sensitive equality and coordinate tests only within one test source or assembly. They don't coordinate tests from separate assemblies, processes, or machines, even when those tests use the same key.

Lock scope follows the configured parallelization scope:

- With `ClassLevel`, MSTest combines every lock declared on the class and its methods, then holds the strongest mode for the entire class lifecycle.
- With `MethodLevel`, MSTest acquires locks for each test, including its test initialization and cleanup.
- When parallelization is disabled, resource locks have no effect.

If a test also uses `[DoNotParallelize]`, `[DoNotParallelize]` takes precedence and MSTest ignores its resource locks. A test that waits for a contended lock occupies a worker, so heavy lock contention can still reduce throughput.

> **Tip:**
> MSTest 4.4 adds parallel-safety analyzers MSTEST0073 through MSTEST0077 to help you declare stable lock keys and protect shared process state.

## Test dependencies

Use `[DependsOn]` for integration or end-to-end tests that must run after other tests. Dependencies form a directed acyclic graph, so independent branches can still run in parallel.

```csharp
[TestMethod]
public void CreateCart() { }

[TestMethod, DependsOn(nameof(CreateCart))]
public void PlaceOrder() { }
```

Apply multiple `[DependsOn]` attributes for fan-in, or apply the attribute to several tests for fan-out. You can reference a method in the same class, every test in another class, or one method in another class. Apply `[DependsOn]` to a test class to give every test in that class the dependency. When a dependency targets a data-driven test, MSTest waits for all its data rows.

By default, a failed prerequisite skips its dependents, and the skip propagates. MSTest evaluates `ProceedOnFailure` per dependent test, not per edge. To run a dependent after failed prerequisites, set `ProceedOnFailure = true` on every `[DependsOn]` declaration for that test. One declaration left at the default causes MSTest to skip the dependent. MSTest reports dependency cycles before execution and fails the tests in the cycle. If a dependency isn't part of the selected run, MSTest warns and ignores the missing edge so filters and single-test runs still work.

With Microsoft.Testing.Platform, you can also declare dependencies under `mstest.execution.dependencies` in `testconfig.json`:

- Use `chains` for straight sequences.
- Use `nodes` for fan-in, fan-out, and `proceedOnFailure`.

```json
{
  "mstest": { "execution": { "dependencies": {
    "chains": [["Contoso.Setup.CreateDatabase", "Contoso.Tests.ImportData"]],
    "nodes": [{ "test": "Contoso.Reports.*", "dependsOn": ["Contoso.Tests.ImportData"], "proceedOnFailure": true }]
  }}}
}
```

Reference one test with its `Namespace.Class.Method` name, or reference every test in a class with `Namespace.Class.*`. MSTest merges configuration dependencies with dependencies declared through attributes.

The `testconfig.json` form works only with Microsoft.Testing.Platform. The `[DependsOn]` attribute works with both Microsoft.Testing.Platform and VSTest. For build-time validation, enable MSTEST0078.

> **Tip:**
> Prefer independent tests, fixtures, or per-test setup for unit tests. Dependencies make tests harder to run in isolation, so reserve them for suites where the sequence itself is part of the scenario.
