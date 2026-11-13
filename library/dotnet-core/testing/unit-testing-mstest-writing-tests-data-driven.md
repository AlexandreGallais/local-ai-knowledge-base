---
title: "Data-driven testing in MSTest (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-data-driven.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Data-driven testing in MSTest

Data-driven testing lets you run the same test method with multiple sets of input data. Instead of writing separate test methods for each test case, define your test logic once and supply different inputs through attributes or external data sources.

## Overview

MSTest provides several attributes for data-driven testing:

| Attribute | Use case | Best for |
|-----------|----------|----------|
| `DataRow` | Inline test data | Simple, static test cases |
| `CombinatorialData` | A Cartesian product of parameter values | Exhaustive combinations of independent inputs |
| `DynamicData` | Data from methods, properties, or fields | Complex or computed test data |
| `DataSource` | External data files or databases | Legacy scenarios with external data sources |

MSTest also provides the following types to extend data-driven scenarios:

- `TestDataRow<T>`: A return type for `ITestDataSource` implementations (including `DynamicData`) that adds metadata support such as display names, categories, and ignore messages to individual test cases.
- `ITestDataSource`: An interface you can implement on a custom attribute to create fully custom data source attributes.

> **Note:**
> Built-in combinatorial testing is available starting with MSTest 4.4. For earlier MSTest versions, use the community-maintained Combinatorial.MSTest package.

## `DataRowAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute` lets you run the same test method with multiple different inputs. Apply one or more `DataRow` attributes to a test method that's decorated with the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute`.

The number and types of arguments must exactly match the test method signature.

> **Tip:**
> Related analyzers:
>
> - MSTEST0014 validates that `DataRow` arguments match the test method signature.
> - MSTEST0042 detects duplicate `DataRow` entries that would run the same test case multiple times.

### Basic usage

```csharp
[TestClass]
public class CalculatorTests
{
    [TestMethod]
    [DataRow(1, 2, 3)]
    [DataRow(0, 0, 0)]
    [DataRow(-1, 1, 0)]
    [DataRow(100, 200, 300)]
    public void Add_ReturnsCorrectSum(int a, int b, int expected)
    {
        var calculator = new Calculator();
        Assert.AreEqual(expected, calculator.Add(a, b));
    }
}
```

### Supported argument types

`DataRow` supports various argument types including primitives, strings, arrays, and null values:

```csharp
[TestClass]
public class DataRowExamples
{
    [TestMethod]
    [DataRow(1, "message", true, 2.0)]
    public void TestWithMixedTypes(int i, string s, bool b, float f)
    {
        // Test with different primitive types
    }

    [TestMethod]
    [DataRow(new string[] { "line1", "line2" })]
    public void TestWithArray(string[] lines)
    {
        Assert.AreEqual(2, lines.Length);
    }

    [TestMethod]
    [DataRow(null)]
    public void TestWithNull(object o)
    {
        Assert.IsNull(o);
    }

    [TestMethod]
    [DataRow(new string[] { "a", "b" }, new string[] { "c", "d" })]
    public void TestWithMultipleArrays(string[] input, string[] expected)
    {
        // Starting with MSTest v3, two arrays don't need wrapping
    }
}
```

> **Note:**
> Starting with MSTest v3.10, use `DateOnly` and `TimeOnly` as `DataRow` arguments and in `DynamicData` parameterized tests.

### Using params for variable arguments

Use the `params` keyword to accept a variable number of arguments:

```csharp
[TestClass]
public class ParamsExample
{
    [TestMethod]
    [DataRow(1, 2, 3, 4)]
    [DataRow(10, 20)]
    [DataRow(5)]
    public void TestWithParams(params int[] values)
    {
        Assert.IsTrue(values.Length > 0);
    }
}
```

### Generic test methods

Starting with MSTest v3.8, a `TestMethod` can have type parameters. The framework infers type arguments from `DataRow` or `DynamicData` values:

```csharp
[TestMethod]
[DataRow(42)]
[DataRow("alpha")]
public void Value_RoundTrips<T>(T value)
{
    Assert.AreEqual(value, value);
}
```

### Custom display names

Set the `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute.DisplayName` property to customize how test cases appear in Test Explorer:

```csharp
[TestClass]
public class DisplayNameExample
{
    [TestMethod]
    [DataRow(1, 2, DisplayName = "Functional Case FC100.1")]
    [DataRow(3, 4, DisplayName = "Edge case: small numbers")]
    public void TestMethod(int i, int j)
    {
        Assert.IsTrue(i < j);
    }
}
```

> **Tip:**
> For more control over test metadata, consider using TestDataRow\<T> with `DynamicData`. `TestDataRow<T>` supports display names along with test categories and ignore messages for individual test cases.

### Ignoring specific test cases

Starting with MSTest v3.8, use the `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute.IgnoreMessage` property to skip specific data rows:

```csharp
[TestClass]
public class IgnoreDataRowExample
{
    [TestMethod]
    [DataRow(1, 2)]
    [DataRow(3, 4, IgnoreMessage = "Temporarily disabled - bug #123")]
    [DataRow(5, 6)]
    public void TestMethod(int i, int j)
    {
        // Only the first and third data rows run
        // The second is skipped with the provided message
    }
}
```

## `CombinatorialDataAttribute`

Starting with MSTest 4.4, the `CombinatorialData` attribute generates the Cartesian product of the values for each test method parameter. Use the types in the `Microsoft.VisualStudio.TestTools.UnitTesting.Combinatorial` namespace.

Provide values for each parameter with one of the following options:

| Value source | Behavior |
|--------------|----------|
| Inferred values | Uses `true` and `false` for `bool`; `0` and `1` for `int`; all defined values for an enum; and `null` plus the inferred values for a nullable version of one of these supported types. |
| `CombinatorialValues` | Uses the explicit values that you pass to the attribute. |
| `CombinatorialRange` | Generates `int` or `uint` values from a starting value and count, or from inclusive endpoints and a step. |
| `CombinatorialRandomData` | Generates unique `int` values. Set `Count`, `Minimum`, `Maximum`, and optionally `Seed` to control the values. |

The following test combines two inferred `bool` values, two explicit values, three range values, and two seeded random values. MSTest generates 24 test cases from these independent parameter sets.

```csharp
[TestMethod]
[CombinatorialData]
public void Calculate_UsesEveryCombination(
    bool enabled,
    [CombinatorialValues(1, 3)] int factor,
    [CombinatorialRange(2, 6, 2)] int value,
    [CombinatorialRandomData(Count = 2, Minimum = 10, Maximum = 20, Seed = 42)] int offset)
{
    int result = enabled ? (factor * value) + offset : value + offset;

    Assert.IsTrue(result >= 12);
}
```
```vb
<TestMethod>
<CombinatorialData>
Public Sub Calculate_UsesEveryCombination(
    enabled As Boolean,
    <CombinatorialValues(1, 3)> factor As Integer,
    <CombinatorialRange(2, 6, 2)> value As Integer,
    <CombinatorialRandomData(Count:=2, Minimum:=10, Maximum:=20, Seed:=42)> offset As Integer)

    Dim result = If(enabled, (factor * value) + offset, value + offset)

    Assert.IsTrue(result >= 12)
End Sub
```
Apply no more than one combinatorial value provider to each parameter. For a parameter type whose values MSTest can't infer, apply `CombinatorialValues`, `CombinatorialRange`, `CombinatorialRandomData`, or a custom attribute that implements `ICombinatorialValuesProvider`.

`CombinatorialData` creates an exhaustive Cartesian product. It doesn't support pairwise generation, permutations, exclusions between parameter values, member-backed values, or class data. Use `DynamicData` or a custom `ITestDataSource` when values depend on each other or when you need to filter the generated test cases.

> **Note:**
> Starting with MSTest 4.5 preview, automatically generated data-driven display names escape control characters and unpaired surrogate characters. Valid surrogate pairs remain unchanged, and literal escape-sequence text stays distinct from the control character that it represents.

## `DynamicDataAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.DynamicDataAttribute` lets you provide test data from methods, properties, or fields. Use this attribute when test data is complex, computed dynamically, or too verbose for inline `DataRow` attributes.

### Supported data source types

The data source can return any `IEnumerable<T>` where `T` is one of the types listed in the following table. Any collection implementing `IEnumerable<T>` works, including `List<T>`, arrays like `T[]`, or custom collection types. Choose based on your needs:

| Return type | Type safety | Metadata support | Best for |
|-------------|-------------|------------------|----------|
| `ValueTuple` (for example, `(int, string)`) | Compile-time | No | Most scenarios - simple syntax with full type checking |
| `Tuple<...>` | Compile-time | No | When you can't use `ValueTuple` |
| `TestDataRow<T>` | Compile-time | Yes | Test cases needing display names, categories, or ignore messages |
| `object[]` | Runtime only | No | Legacy code - avoid for new tests |

> **Tip:**
> For new test data methods, use `ValueTuple` for simple cases or `TestDataRow<T>` when you need metadata. Avoid `object[]` because it lacks compile-time type checking and can cause runtime errors from type mismatches.

### Data sources

The data source can be a method or property and, starting with MSTest v3.11, a field. These sources are interchangeable, so choose based on your preference:

> **Note:**
> Starting with MSTest v3.8, `DynamicData` auto-detects the data source type. You don't need to specify `DynamicDataSourceType` explicitly.

```csharp
[TestClass]
public class DynamicDataExample
{
    // Method - best for computed or yielded data
    public static IEnumerable<(int Value, string Name)> GetTestData()
    {
        yield return (1, "first");
        yield return (2, "second");
    }

    // Property - concise for static data
    public static IEnumerable<(int Value, string Name)> TestDataProperty =>
    [
        (1, "first"),
        (2, "second")
    ];

    // Field - simplest for static data
    public static IEnumerable<(int Value, string Name)> TestDataField =
    [
        (1, "first"),
        (2, "second")
    ];

    [TestMethod]
    [DynamicData(nameof(GetTestData))]
    public void TestWithMethod(int value, string name)
    {
        Assert.IsTrue(value > 0);
    }

    [TestMethod]
    [DynamicData(nameof(TestDataProperty))]
    public void TestWithProperty(int value, string name)
    {
        Assert.IsTrue(value > 0);
    }

    [TestMethod]
    [DynamicData(nameof(TestDataField))]
    public void TestWithField(int value, string name)
    {
        Assert.IsTrue(value > 0);
    }
}
```

> **Note:**
> Data source methods, properties, and fields must be `public static` and return an `IEnumerable<T>` of a supported type.

> **Note:**
> Starting with MSTest v3.11, the data source can be a field. Earlier versions support methods and properties.

> **Tip:**
> Related analyzer: MSTEST0018 validates that the data source exists, is accessible, and has the correct signature.

### Data source from a different class

Specify a different class using the type parameter:

```csharp
public class TestDataProvider
{
    public static IEnumerable<(int, string)> GetTestData()
    {
        yield return (1, "first");
        yield return (2, "second");
    }
}

[TestClass]
public class DynamicDataExternalExample
{
    [TestMethod]
    [DynamicData(nameof(TestDataProvider.GetTestData), typeof(TestDataProvider))]
    public void TestMethod(int value1, string value2)
    {
        Assert.IsTrue(value1 > 0);
    }
}
```

### Parameterized `DynamicData` source methods

Starting with MSTest v3.10, pass values to a `DynamicData` source method with the `Arguments` property:

```csharp
[TestMethod]
[DynamicData(nameof(GetValues), Arguments = new object[] { true })]
public void Value_IsPositive(int value, bool expected) => Assert.AreEqual(expected, value > 0);

public static IEnumerable<(int Value, bool Expected)> GetValues(bool includeZero) =>
    includeZero ? [(1, true), (0, false)] : [(1, true)];
```

### Custom display names

Customize test case display names using the `Microsoft.VisualStudio.TestTools.UnitTesting.DynamicDataAttribute.DynamicDataDisplayName` property:

```csharp
using System.Reflection;

[TestClass]
public class DynamicDataDisplayNameExample
{
    [TestMethod]
    [DynamicData(nameof(GetTestData), DynamicDataDisplayName = nameof(GetDisplayName))]
    public void TestMethod(int value1, string value2)
    {
        Assert.IsTrue(value1 > 0);
    }

    public static IEnumerable<(int, string)> GetTestData()
    {
        yield return (1, "first");
        yield return (2, "second");
    }

    public static string GetDisplayName(MethodInfo methodInfo, object[] data)
    {
        return $"{methodInfo.Name} with value {data[0]} and '{data[1]}'";
    }
}
```

> **Note:**
> The display name method must be `public static`, return a `string`, and accept two parameters: `MethodInfo` and `object[]`.

> **Tip:**
> For a simpler approach to custom display names, consider using TestDataRow\<T> with its `DisplayName` property instead of a separate method.

### Ignoring all test cases from a data source

Starting with MSTest v3.8, use `Microsoft.VisualStudio.TestTools.UnitTesting.DynamicDataAttribute.IgnoreMessage` to skip all test cases:

```csharp
[TestClass]
public class IgnoreDynamicDataExample
{
    [TestMethod]
    [DynamicData(nameof(GetTestData), IgnoreMessage = "Feature not ready")]
    public void TestMethod(int value1, string value2)
    {
        // All test cases from GetTestData are skipped
    }

    public static IEnumerable<(int, string)> GetTestData()
    {
        yield return (1, "first");
        yield return (2, "second");
    }
}
```

> **Tip:**
> To ignore individual test cases, use `TestDataRow<T>` with its `IgnoreMessage` property. See the TestDataRow\<T> section.
