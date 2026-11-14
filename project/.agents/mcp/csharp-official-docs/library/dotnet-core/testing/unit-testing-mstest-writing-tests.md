---
title: "Write tests with MSTest"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-writing-tests.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Write tests with MSTest

In this article, you learn about the APIs and conventions used by MSTest to help you write and shape your tests.

> **Note:**
> Attribute names ending with "Attribute" can use the short form. `TestClass` and `TestClassAttribute` are equivalent. Attributes with parameterless constructors can omit parentheses.

## Test structure

Every MSTest test class must have the `TestClass` attribute, and every test method must have the `TestMethod` attribute:

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class CalculatorTests
{
    [TestMethod]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();

        // Act
        int result = calculator.Add(2, 3);

        // Assert
        Assert.AreEqual(5, result);
    }
}
```

### `TestClassAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` marks a class that contains tests and, optionally, initialize or cleanup methods. You can extend this attribute to customize test class behavior.

### `TestMethodAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` marks a method as a test to run. Test methods must be:

- Instance methods (not static)
- Public
- Return `void`, `Task`, or `ValueTask` (MSTest v3.3+)
- Parameterless, unless using data-driven attributes

```csharp
[TestClass]
public class TestMethodExamples
{
    [TestMethod]
    public void SynchronousTest()
    {
        Assert.IsTrue(true);
    }

    [TestMethod]
    public async Task AsynchronousTest()
    {
        await Task.Delay(100);
        Assert.IsTrue(true);
    }
}
```

> **Warning:**
> Don't use `async void` for test methods. Use `async Task` or `async ValueTask` instead.

### `DiscoverInternalsAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.DiscoverInternalsAttribute` assembly attribute enables MSTest to discover `internal` test classes and methods. By default, only `public` tests are discovered. This attribute is particularly useful when you have parameterized tests that use internal types as parameters:

```csharp
[assembly: DiscoverInternals]

internal record TestInput(int Value, string Description);

[TestClass]
public class CalculatorTests
{
    internal static IEnumerable<TestInput> TestData
    {
        get
        {
            yield return new TestInput(1, "one");
            yield return new TestInput(2, "two");
        }
    }

    [TestMethod]
    [DynamicData(nameof(TestData))]
    internal void Add_WithTestInput_ReturnsExpected(TestInput input)
    {
        var calculator = new Calculator();
        int result = calculator.Add(input.Value, 1);
        Assert.AreEqual(input.Value + 1, result);
    }
}
```

Without `DiscoverInternals`, the test method and its internal `TestInput` parameter type wouldn't be discovered by the test runner.

## Core concepts

MSTest documentation is organized by topic:

| Topic | Description |
|-------|-------------|
| Assertions | Verify expected results with Assert classes |
| Data-driven testing | Run tests with multiple inputs (`DataRow`, `CombinatorialData`, `DynamicData`) |
| Test lifecycle | Setup and cleanup at assembly, class, and test levels |
| Execution control | Threading, parallelization, timeouts, retries, and conditional execution |
| Test organization | Categories, priorities, owners, and metadata |
| TestContext | Access test runtime information |
| Deployment items | Copy files and folders alongside test assemblies |

## Attribute quick reference

| Category | Attributes | See |
|----------|-----------|------|
| Test identification | `TestClass`, `TestMethod`, `DiscoverInternals` | This page |
| Data-driven | `DataRow`, `CombinatorialData`, `CombinatorialValues`, `CombinatorialRange`, `CombinatorialRandomData`, `DynamicData`, `TestDataRow` | Data-driven testing |
| Lifecycle | `AssemblyInitialize`, `ClassInitialize`, `TestInitialize`, and cleanup counterparts | Test lifecycle |
| Threading | `STATestClass`, `STATestMethod`, `UITestMethod` | Execution control |
| Parallelization | `Parallelize`, `DoNotParallelize` | Execution control |
| Timeout/Retry | `Timeout`, `Retry` | Execution control |
| Conditional | `Ignore`, `OSCondition`, `CICondition` | Execution control |
| Metadata | `TestCategory`, `TestProperty`, `Owner`, `Priority` | Test organization |
| Work tracking | `WorkItem`, `GitHubWorkItem` | Test organization |
| Test resources | `DeploymentItem` | Deployment items |

## Assertions

Use the Assert classes of the `Microsoft.VisualStudio.TestTools.UnitTesting` namespace to verify specific functionality. A test method exercises code in your application, but it reports correctness only when you include Assert statements.

MSTest assertions are divided into:

- **`Assert` class**: General-purpose assertions (`AreEqual`, `IsTrue`, `ThrowsException`)
- **`StringAssert` class**: String-specific assertions (`Contains`, `Matches`, `StartsWith`)
- **`CollectionAssert` class**: Collection assertions (`Contains`, `AllItemsAreUnique`, `AreEquivalent`)

## Testing private members

You can test private members using reflection wrapper classes:

- `Microsoft.VisualStudio.TestTools.UnitTesting.PrivateObject`: For private instance methods
- `Microsoft.VisualStudio.TestTools.UnitTesting.PrivateType`: For private static methods

> **Tip:**
> Consider whether private methods need direct testing. Often, testing through public interfaces provides better coverage and more maintainable tests.

## See also

- Get started with MSTest
- MSTest analyzers
- Unit testing best practices
- Run selective unit tests
