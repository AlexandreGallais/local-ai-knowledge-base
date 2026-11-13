---
title: "Data-driven testing in MSTest (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-data-driven.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Data-driven testing in MSTest (part 2 of 2)

## `TestDataRow`

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataRow`1` class provides enhanced control over test data in data-driven tests. Use `System.Collections.Generic.IEnumerable`1` of `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataRow`1` as your data source return type to specify:

> **Note:**
> MSTest introduced `TestDataRow<T>` in version 3.8.

- **Custom display names**: Set a unique display name per test case using the `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataRow`1.DisplayName` property.
- **Test categories**: Attach metadata to individual test cases using the `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataRow`1.TestCategories` property.
- **Ignore messages**: Skip specific test cases with reasons using the `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataRow`1.IgnoreMessage` property.
- **Type-safe data**: Use generics for strongly-typed test data.

### Basic usage

```csharp
[TestClass]
public class TestDataRowExample
{
    [TestMethod]
    [DynamicData(nameof(GetTestDataRows))]
    public void TestMethod(int value1, string value2)
    {
        Assert.IsTrue(value1 > 0);
    }

    public static IEnumerable<TestDataRow<(int, string)>> GetTestDataRows()
    {
        yield return new TestDataRow<(int, string)>((1, "first"))
        {
            DisplayName = "Test Case 1: Basic scenario",
        };

        yield return new TestDataRow<(int, string)>((2, "second"))
        {
            DisplayName = "Test Case 2: Edge case",
            TestCategories = ["HighPriority", "Critical"],
        };

        yield return new TestDataRow<(int, string)>((3, "third"))
        {
            IgnoreMessage = "Not yet implemented",
        };
    }
}
```

## `DataSourceAttribute`

> **Note:**
> `DataSource` is only available in .NET Framework. For .NET (Core) projects, use `DataRow` or `DynamicData` instead.

The `Microsoft.VisualStudio.TestTools.UnitTesting.DataSourceAttribute` connects tests to external data sources like CSV files, XML files, or databases.

For detailed information, see:

- Create a data-driven unit test
- Use a configuration file to define a data source

## `ITestDataSource`

The `Microsoft.VisualStudio.TestTools.UnitTesting.ITestDataSource` interface lets you create completely custom data source attributes. Implement this interface when you need behavior that the built-in attributes don't support, such as generating test data based on environment variables, configuration files, or other runtime conditions.

### Interface members

The interface defines two methods:

| Method | Purpose |
|--------|--------|
| `GetData(MethodInfo)` | Returns test data as `IEnumerable<object?[]>` |
| `GetDisplayName(MethodInfo, object?[]?)` | Returns the display name for a test case |

### Creating a custom data source attribute

To create a custom data source, define an attribute class that inherits from `Attribute` and implements `ITestDataSource`:

```csharp
using System.Globalization;
using System.Reflection;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
public class MyDataSourceAttribute : Attribute, ITestDataSource
{
    public IEnumerable<object?[]> GetData(MethodInfo methodInfo)
    {
        // Return test data based on your custom logic
        yield return [1, "first"];
        yield return [2, "second"];
        yield return [3, "third"];
    }

    public string? GetDisplayName(MethodInfo methodInfo, object?[]? data)
    {
        return data is null
            ? null
            : string.Format(CultureInfo.CurrentCulture, "{0} ({1})", methodInfo.Name, string.Join(",", data));
    }
}

[TestClass]
public class CustomDataSourceExample
{
    [TestMethod]
    [MyDataSource]
    public void TestWithCustomDataSource(int value, string name)
    {
        Assert.IsTrue(value > 0);
        Assert.IsNotNull(name);
    }
}
```

### Real-world example: Environment-based test data

This example shows a custom attribute that generates test data based on target frameworks, filtering based on the operating system:

```csharp
using System.Globalization;
using System.Reflection;

[AttributeUsage(AttributeTargets.Method)]
public class TargetFrameworkDataAttribute : Attribute, ITestDataSource
{
    private readonly string[] _frameworks;

    public TargetFrameworkDataAttribute(params string[] frameworks)
    {
        _frameworks = frameworks;
    }

    public IEnumerable<object?[]> GetData(MethodInfo methodInfo)
    {
        bool isWindows = OperatingSystem.IsWindows();

        foreach (string framework in _frameworks)
        {
            // Skip .NET Framework on non-Windows platforms
            if (!isWindows && framework.StartsWith("net4", StringComparison.Ordinal))
            {
                continue;
            }

            yield return [framework];
        }
    }

    public string? GetDisplayName(MethodInfo methodInfo, object?[]? data)
    {
        return data is null
            ? null
            : string.Format(CultureInfo.CurrentCulture, "{0} ({1})", methodInfo.Name, data[0]);
    }
}

[TestClass]
public class CrossPlatformTests
{
    [TestMethod]
    [TargetFrameworkData("net48", "net8.0", "net9.0")]
    public void TestOnMultipleFrameworks(string targetFramework)
    {
        // Test runs once per applicable framework
        Assert.IsNotNull(targetFramework);
    }
}
```

> **Tip:**
> For simple cases where you just need to customize display names or add metadata, consider using TestDataRow\<T> with `DynamicData` instead of implementing `ITestDataSource`. Reserve custom `ITestDataSource` implementations for scenarios that require dynamic filtering or complex data generation logic.

## Unfolding strategy

Data-driven test attributes support the `Microsoft.VisualStudio.TestTools.UnitTesting.TestDataSourceUnfoldingStrategy` property, which controls how test cases appear in Test Explorer and TRX results. This property also determines whether you can run individual test cases independently.

### Discovery and execution phases

MSTest processes data-driven tests in two distinct phases:

- **Discovery phase**: MSTest evaluates all data source attributes (`DataRow`, `DynamicData`, `ITestDataSource`) to determine the list of test cases. This evaluation happens *before* any of the regular MSTest lifecycle hooks run—`AssemblyInitialize`, `ClassInitialize`, and other setup methods haven't executed yet.
- **Execution phase**: MSTest runs the normal lifecycle (assembly initialization, class initialization, test initialization, test method, cleanup) and executes each test case with its data.

Because data sources are evaluated during discovery, your data-generation code can't rely on any state set up by `AssemblyInitialize` or `ClassInitialize`. If your data source depends on setup logic (for example, reading from a database connection initialized in `ClassInitialize`), the data source evaluation fails during discovery.

### Available strategies

| Strategy | Behavior |
|----------|----------|
| `Auto` (default) | MSTest determines the best unfolding strategy. |
| `Unfold` | All test cases are expanded and shown individually. |
| `Fold` | All test cases are collapsed into a single test node. |

### Folded vs. unfolded tests

The unfolding strategy affects how test results are reported in Test Explorer and TRX output:

- **Unfolded tests**: Each data row appears as a separate, independent test entry in Test Explorer and TRX. You can run, debug, or filter individual test cases. Each entry has its own pass/fail status.
- **Folded tests**: All data rows appear as a single test node in Test Explorer. One entry appears in TRX, with multiple results associated with that single test case. You can't run or filter individual data rows independently.

### Exception during discovery causes folding

When MSTest evaluates a data source during discovery and the evaluation throws an exception, the test falls back to a folded state regardless of the configured unfolding strategy. Because the framework can't enumerate the individual test cases, it registers the test method as a single (folded) entry.

At execution time, MSTest evaluates the data source again as part of the normal lifecycle. If the exception was caused by missing setup state (for example, a dependency that `ClassInitialize` provides), the data source might succeed during execution because the lifecycle hooks have now run.

> **Note:**
> When debugging a test that throws during discovery, you might see an exception (for example, a `NullReferenceException`) before the test starts. This exception comes from the discovery-phase evaluation. Press **Continue** in the debugger—the test then executes normally because the execution phase runs the full MSTest lifecycle, including initialization methods. For more details, see microsoft/testfx#7774.

### When to change the strategy

For most scenarios, the default `Auto` behavior provides the best balance. Consider changing the unfolding strategy when you have specific requirements:

- Use `Fold` if your data sources depend on runtime state or setup logic that isn't available during discovery.
- Use `Fold` for non-deterministic data sources that return different values on each evaluation.
- Use `Fold` to reduce overhead when performance is a concern with large numbers of test cases.

### Example usage

```csharp
[TestClass]
public class UnfoldingExample
{
    [TestMethod(UnfoldingStrategy = TestDataSourceUnfoldingStrategy.Unfold)] // That's the default behavior
    [DataRow(1, "one")]
    [DataRow(2, "two")]
    [DataRow(3, "three")]
    public void TestMethodWithUnfolding(int value, string text)
    {
        // Each test case appears individually in Test Explorer
    }

    [TestMethod(UnfoldingStrategy = TestDataSourceUnfoldingStrategy.Fold)]
    [DataRow(1, "one")]
    [DataRow(2, "two")]
    [DataRow(3, "three")]
    public void TestMethodWithFolding(int value, string text)
    {
        // All test cases appear as a single collapsed node
    }
}
```

## Best practices

- **Choose the right attribute**: Use `DataRow` for simple, inline data, `CombinatorialData` for exhaustive combinations of independent inputs, and `DynamicData` for complex or computed data.
- **Name your test cases**: Use `DisplayName` to make test failures easier to identify.
- **Keep data sources close**: Define data sources in the same class when possible for better maintainability.
- **Use meaningful data**: Choose test data that exercises edge cases and boundary conditions.

## See also

- Write tests in MSTest
- TestContext class
- MSTEST0014: DataRow should be valid
- MSTEST0018: DynamicData should be valid
- MSTEST0042: Duplicate DataRow
- MSTEST0052: Avoid explicit DynamicDataSourceType
- MSTEST0062: Avoid out/ref test method parameters
