---
title: "Order unit tests"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/order-unit-tests.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Order unit tests

Occasionally, you may want to have unit tests run in a specific order. Ideally, the order in which unit tests run should _not_ matter, and it is best practice to avoid ordering unit tests. Regardless, there may be a need to do so. In that case, this article demonstrates how to order test runs.

> **Note:**
> Test ordering and test parallelization are separate concerns. Specifying an execution order determines the sequence in which tests start, but if parallelization is enabled, multiple tests can still run concurrently. To guarantee that tests run one at a time in the specified order, you must also disable parallelization.

If you prefer to browse the source code, see the order .NET Core unit tests sample repository.

> **Tip:**
> In addition to the ordering capabilities outlined in this article, consider creating custom playlists with Visual Studio as an alternative.

**mstest:**

## Order alphabetically

> **Note:**
> MSTest runs tests sequentially within a class by default. If you configure parallelism using the `<Parallelize>` setting in a `.runsettings` file, tests across classes can run concurrently, and ordering affects only the sequence within each class. For all ways to enable or disable MSTest parallelization, see Configure parallelization.

MSTest discovers tests in the same order in which they are defined in the test class.

When running through Test Explorer (in Visual Studio, or in Visual Studio Code), the tests are ordered in alphabetical order based on their test name.

When running outside of Test Explorer, tests are executed in the order in which they are defined in the test class.

> **Note:**
> A test named `Test14` will run before `Test2` even though the number  `2` is less than `14`. This is because test name ordering uses the text name of the test.

```csharp
﻿using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MSTest.Project;

[TestClass]
public class ByAlphabeticalOrder
{
    public static bool Test1Called;
    public static bool Test2Called;
    public static bool Test3Called;

    [TestMethod]
    public void Test2()
    {
        Test2Called = true;

        Assert.IsTrue(Test1Called);
        Assert.IsFalse(Test3Called);
    }

    [TestMethod]
    public void Test1()
    {
        Test1Called = true;

        Assert.IsFalse(Test2Called);
        Assert.IsFalse(Test3Called);
    }

    [TestMethod]
    public void Test3()
    {
        Test3Called = true;

        Assert.IsTrue(Test1Called);
        Assert.IsTrue(Test2Called);
    }
}
```
Starting with MSTest 3.6, a new runsettings option lets you run tests by test names both in Test Explorers and on the command line. To enable this feature, add the `OrderTestsByNameInClass` setting to your runsettings file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>

  <MSTest>
    <OrderTestsByNameInClass>true</OrderTestsByNameInClass>
  </MSTest>

</RunSettings>
```

## Order randomly

In MSTest 4.3 and later, run tests in a random order to surface hidden ordering dependencies between tests. To enable random order, set the `RandomizeTestOrder` setting to **true** in your runsettings file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>

  <MSTest>
    <RandomizeTestOrder>true</RandomizeTestOrder>
  </MSTest>

</RunSettings>
```

To make the random order reproducible, set the `RandomTestOrderSeed` setting to an integer seed. MSTest then replays the same order on every run. When you leave the seed unset, MSTest generates a new seed for each run. Don't combine `RandomizeTestOrder` with `OrderTestsByNameInClass`, because MSTest applies only one ordering mode at a time. For more information, see Configure MSTest.

**xunit:**

The xUnit test framework allows for more granularity and control of test run order. You implement the `ITestCaseOrderer` and `ITestCollectionOrderer` interfaces to control the order of test cases for a class, or test collections.

> **Note:**
> xUnit runs test classes in parallel by default. Tests within a single class always run sequentially, so `ITestCaseOrderer` controls the sequence within that class. To disable parallelism across all classes, apply `[assembly: CollectionBehavior(DisableTestParallelization = true)]` at the assembly level, for example in `AssemblyInfo.cs` or in any source file in your test project.

## Order by test case alphabetically

To order test cases by their method name, you implement the `ITestCaseOrderer` and provide an ordering mechanism.

```csharp
﻿using Xunit.Abstractions;
using Xunit.Sdk;

namespace XUnit.Project.Orderers;

public class AlphabeticalOrderer : ITestCaseOrderer
{
    public IEnumerable<TTestCase> OrderTestCases<TTestCase>(
        IEnumerable<TTestCase> testCases) where TTestCase : ITestCase =>
        testCases.OrderBy(testCase => testCase.TestMethod.Method.Name);
}
```
Then in a test class you set the test case order with the `TestCaseOrdererAttribute`.

```csharp
﻿using Xunit;

namespace XUnit.Project;

[TestCaseOrderer(
    ordererTypeName: "XUnit.Project.Orderers.AlphabeticalOrderer",
    ordererAssemblyName: "XUnit.Project")]
public class ByAlphabeticalOrder
{
    public static bool Test1Called;
    public static bool Test2Called;
    public static bool Test3Called;

    [Fact]
    public void Test1()
    {
        Test1Called = true;

        Assert.False(Test2Called);
        Assert.False(Test3Called);
    }

    [Fact]
    public void Test2()
    {
        Test2Called = true;

        Assert.True(Test1Called);
        Assert.False(Test3Called);
    }

    [Fact]
    public void Test3()
    {
        Test3Called = true;

        Assert.True(Test1Called);
        Assert.True(Test2Called);
    }
}
```
## Order by collection alphabetically

To order test collections by their display name, you implement the `ITestCollectionOrderer` and provide an ordering mechanism.

```csharp
﻿using Xunit;
using Xunit.Abstractions;

namespace XUnit.Project.Orderers;

public class DisplayNameOrderer : ITestCollectionOrderer
{
    public IEnumerable<ITestCollection> OrderTestCollections(
        IEnumerable<ITestCollection> testCollections) =>
        testCollections.OrderBy(collection => collection.DisplayName);
}
```
Since test collections potentially run in parallel, you must explicitly disable test parallelization of the collections with the `CollectionBehaviorAttribute`. Then specify the implementation to the `TestCollectionOrdererAttribute`.

```csharp
﻿using Xunit;

// Need to turn off test parallelization so we can validate the run order
[assembly: CollectionBehavior(DisableTestParallelization = true)]
[assembly: TestCollectionOrderer(
    ordererTypeName: "XUnit.Project.Orderers.DisplayNameOrderer",
    ordererAssemblyName: "XUnit.Project")]

namespace XUnit.Project;

[Collection("Xzy Test Collection")]
public class TestsInCollection1
{
    public static bool Collection1Run;

    [Fact]
    public static void Test()
    {
        Assert.True(TestsInCollection2.Collection2Run);     // Abc
        Assert.True(TestsInCollection3.Collection3Run);     // Mno
        Assert.False(TestsInCollection1.Collection1Run);    // Xyz

        Collection1Run = true;
    }
}

[Collection("Abc Test Collection")]
public class TestsInCollection2
{
    public static bool Collection2Run;

    [Fact]
    public static void Test()
    {
        Assert.False(TestsInCollection2.Collection2Run);    // Abc
        Assert.False(TestsInCollection3.Collection3Run);    // Mno
        Assert.False(TestsInCollection1.Collection1Run);    // Xyz

        Collection2Run = true;
    }
}

[Collection("Mno Test Collection")]
public class TestsInCollection3
{
    public static bool Collection3Run;

    [Fact]
    public static void Test()
    {
        Assert.True(TestsInCollection2.Collection2Run);     // Abc
        Assert.False(TestsInCollection3.Collection3Run);    // Mno
        Assert.False(TestsInCollection1.Collection1Run);    // Xyz

        Collection3Run = true;
    }
}
```
## Order by custom attribute

To order xUnit tests with custom attributes, you first need an attribute to rely on. Define a `TestPriorityAttribute` as follows:

```csharp
﻿namespace XUnit.Project.Attributes;

[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
public class TestPriorityAttribute : Attribute
{
    public int Priority { get; private set; }

    public TestPriorityAttribute(int priority) => Priority = priority;
}
```
Next, consider the following `PriorityOrderer` implementation of the `ITestCaseOrderer` interface.

```csharp
﻿using Xunit.Abstractions;
using Xunit.Sdk;
using XUnit.Project.Attributes;

namespace XUnit.Project.Orderers;

public class PriorityOrderer : ITestCaseOrderer
{
    public IEnumerable<TTestCase> OrderTestCases<TTestCase>(
        IEnumerable<TTestCase> testCases) where TTestCase : ITestCase
    {
        string assemblyName = typeof(TestPriorityAttribute).AssemblyQualifiedName!;
        var sortedMethods = new SortedDictionary<int, List<TTestCase>>();
        foreach (TTestCase testCase in testCases)
        {
            int priority = testCase.TestMethod.Method
                .GetCustomAttributes(assemblyName)
                .FirstOrDefault()
                ?.GetNamedArgument<int>(nameof(TestPriorityAttribute.Priority)) ?? 0;

            GetOrCreate(sortedMethods, priority).Add(testCase);
        }

        foreach (TTestCase testCase in
            sortedMethods.Keys.SelectMany(
                priority => sortedMethods[priority].OrderBy(
                    testCase => testCase.TestMethod.Method.Name)))
        {
            yield return testCase;
        }
    }

    private static TValue GetOrCreate<TKey, TValue>(
        IDictionary<TKey, TValue> dictionary, TKey key)
        where TKey : <example-value>
        where TValue : new() =>
        dictionary.TryGetValue(key, out TValue? result)
            ? result
            : (dictionary[key] = new TValue());
}
```
Then in a test class you set the test case order with the `TestCaseOrdererAttribute` to the `PriorityOrderer`.

```csharp
﻿using Xunit;
using XUnit.Project.Attributes;

namespace XUnit.Project;

[TestCaseOrderer(
    ordererTypeName: "XUnit.Project.Orderers.PriorityOrderer",
    ordererAssemblyName: "XUnit.Project")]
public class ByPriorityOrder
{
    public static bool Test1Called;
    public static bool Test2ACalled;
    public static bool Test2BCalled;
    public static bool Test3Called;

    [Fact, TestPriority(5)]
    public void Test3()
    {
        Test3Called = true;

        Assert.True(Test1Called);
        Assert.True(Test2ACalled);
        Assert.True(Test2BCalled);
    }

    [Fact, TestPriority(0)]
    public void Test2B()
    {
        Test2BCalled = true;

        Assert.True(Test1Called);
        Assert.True(Test2ACalled);
        Assert.False(Test3Called);
    }

    [Fact]
    public void Test2A()
    {
        Test2ACalled = true;

        Assert.True(Test1Called);
        Assert.False(Test2BCalled);
        Assert.False(Test3Called);
    }

    [Fact, TestPriority(-5)]
    public void Test1()
    {
        Test1Called = true;

        Assert.False(Test2ACalled);
        Assert.False(Test2BCalled);
        Assert.False(Test3Called);
    }
}
```

**nunit:**

## Order by priority

> **Note:**
> NUnit runs tests sequentially within a single thread by default. Unless you've applied `[Parallelizable]` attributes, the `[Order]` attribute alone is sufficient to guarantee serial execution in the specified sequence.

To order tests explicitly, NUnit provides an `OrderAttribute`. Tests with this attribute are started before tests without. The order value is used to determine the order to run the unit tests.

```csharp
﻿using NUnit.Framework;

namespace NUnit.Project;

public class ByOrder
{
    public static bool Test1Called;
    public static bool Test2ACalled;
    public static bool Test2BCalled;
    public static bool Test3Called;

    [Test, Order(5)]
    public void Test1()
    {
        Test1Called = true;

        Assert.That(Test2ACalled, Is.False);
        Assert.That(Test2BCalled, Is.True);
        Assert.That(Test3Called, Is.True);
    }

    [Test, Order(0)]
    public void Test2B()
    {
        Test2BCalled = true;

        Assert.That(Test1Called, Is.False);
        Assert.That(Test2ACalled, Is.False);
        Assert.That(Test3Called, Is.True);
    }

    [Test]
    public void Test2A()
    {
        Test2ACalled = true;

        Assert.That(Test1Called, Is.True);
        Assert.That(Test2BCalled, Is.True);
        Assert.That(Test3Called, Is.True);
    }

    [Test, Order(-5)]
    public void Test3()
    {
        Test3Called = true;

        Assert.That(Test1Called, Is.False);
        Assert.That(Test2ACalled, Is.False);
        Assert.That(Test2BCalled, Is.False);
    }
}
```

**tunit:**

## Order by dependency

TUnit runs tests in parallel by default and doesn't guarantee an order between them. To make one test run after another, apply the `[DependsOn]` attribute to the dependent test. TUnit runs the dependent test only after the tests it depends on finish, while tests without dependencies still run in parallel. You can apply `[DependsOn]` multiple times to the same test.

```csharp
namespace TUnit.Project;

public class ByDependency
{
    public static bool Test1Called;
    public static bool Test2Called;

    [Test]
    public async Task Test1()
    {
        Test1Called = true;

        await Assert.That(Test2Called).IsFalse();
    }

    [Test]
    [DependsOn(nameof(Test1))]
    public async Task Test2()
    {
        Test2Called = true;

        await Assert.That(Test1Called).IsTrue();
    }

    [Test]
    [DependsOn(nameof(Test1))]
    [DependsOn(nameof(Test2))]
    public async Task Test3()
    {
        await Assert.That(Test1Called).IsTrue();
        await Assert.That(Test2Called).IsTrue();
    }
}
```
If a dependency fails, TUnit skips the dependent test. To run the dependent test anyway, set `ProceedOnFailure` to `true`, for example `[DependsOn(nameof(Test1), ProceedOnFailure = true)]`. A dependent test can read the results of the tests it depends on through `TestContext.Current.Dependencies.GetTests`.

When the test you depend on is overloaded, specify its parameter types:

```csharp
namespace TUnit.Project;

public class ByOverloadedDependency
{
    [Test]
    public void Setup()
    {
    }

    [Test]
    [Arguments("value", 1)]
    public void Setup(string text, int number)
    {
    }

    [Test]
    [DependsOn(nameof(Setup), [typeof(string), typeof(int)])]
    public void DependentTest()
    {
    }
}
```
> **Note:**
> Tests should ideally be independent of each other. Reserve `[DependsOn]` for scenarios where independent tests are impractical, such as expensive multi-step workflows.

## Next steps

> Unit test code coverage
