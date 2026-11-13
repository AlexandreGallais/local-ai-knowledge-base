---
title: "MSTest TestContext"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-testcontext.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `TestContext` class

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` class gives useful information and tools to help manage test execution. It lets you access details about the test run and adjust the test environment. This class is part of the `Microsoft.VisualStudio.TestTools.UnitTesting` namespace.

## Accessing the `TestContext` object

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` object is available in the following contexts:

- As a parameter to AssemblyInitialize, the ClassInitialize methods. In this context, the properties related to the test run are not available.
- Starting with 3.6, optionally, as a parameter to AssemblyCleanup, the ClassCleanup methods. In this context, the properties related to the test run are not available.
- As a property of a test class. In this context, the properties related to the test run are available.
- As a constructor parameter of a test class (starting with v3.6). This way is recommended over using the property, because it gives access to the object in the constructor. While the property is only available after the constructor has run. This way also helps to ensure immutability of the object and allows the compiler to enforce that the object is not null.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MyTestClassTestContext
{
    public TestContext TestContext { get; set; }

    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [ClassInitialize]
    public static void ClassInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [TestMethod]
    public void MyTestMethod()
    {
        // Access TestContext properties and methods here
    }
}
```
Or with MSTest 3.6+:

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MyTestClassTestContextThroughCtor
{
    private readonly TestContext _testContext;

    public MyTestClassTestContextThroughCtor(TestContext testContext)
    {
        _testContext = testContext;
    }

    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [ClassInitialize]
    public static void ClassInitialize(TestContext context)
    {
        // Access TestContext properties and methods here. The properties related to the test run are not available.
    }

    [TestMethod]
    public void MyTestMethod()
    {
        // Access TestContext properties and methods here
    }
}
```
## The `TestContext` members

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` class provides properties about the test run along with methods to manipulate the test environment. This section covers the most commonly used properties and methods.

### Test run information

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` provides information about the test run, such as:

- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestName` – the name of the currently executing test.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.CurrentTestOutcome` - the result of the current test.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.FullyQualifiedTestClassName` - the full name of the test class.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestRunDirectory` - the directory where the test run is executed.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.DeploymentDirectory` - the directory where the deployment items are located. To populate this directory, use `DeploymentItemAttribute`.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.ResultsDirectory` - the directory where the test results are stored.  Typically a subdirectory of the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestRunDirectory`.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestRunResultsDirectory` - the directory where the test results are stored. Typically a subdirectory of the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.ResultsDirectory`.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestResultsDirectory` - the directory where the test results are stored. Typically a subdirectory of the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.ResultsDirectory`.
- Starting with MSTest 3.9, `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestRunCount` - the number of times the current test has run, counting from 1. The value is greater than 1 when a test is retried with `[Retry]`.

### Per-test temporary directory

Use `TestContext.TestTempDirectory` as private scratch space for a test. MSTest creates the directory only when you first access the property, and each test execution receives a unique directory. Each data row also receives its own directory, so parallel tests don't share paths.

```csharp
string path = Path.Combine(TestContext.TestTempDirectory!, "output.json");
File.WriteAllText(path, json);
```

MSTest creates the directory under `TestResultsDirectory` when possible and falls back to the system temporary directory when the results path is unavailable, too long, or read-only. MSTest deletes the directory after a passing test and retains it after any non-passing outcome. Set the `MSTEST_TEST_TEMP_DIRECTORY_RETAIN` environment variable to `1` or `true` to retain directories for all outcomes.

When a passing test registers a file from the directory with `AddResultFile`, MSTest retains the directory until the host collects the attachment. Cleanup is best effort and doesn't change the test outcome.

`TestTempDirectory` is available for .NET and .NET Framework targets, but not for UWP or WinUI targets. The property doesn't change the process current directory.

In MSTest 3.7 and later, the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` class also provides new properties helpful for `TestInitialize` and `TestCleanup` methods:

- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestData` - the data that will be provided to the parameterized test method, or `null` if the test is not parameterized.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestDisplayName` - the display name of the test method.
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestException` - the exception thrown by either the test method or test initialize, or `null` if the test method did not throw an exception.

### Data-driven tests

In MSTest 3.7 and later, the property `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.TestData` can be used to access the data for the current test during `TestInitialize` and `TestCleanup` methods.

When targeting .NET framework, the `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` enables you to retrieve and set data for each iteration in a data-driven test, using properties like `DataRow` and `DataConnection` (for DataSource-based tests).

Consider the following CSV file `TestData.csv`:

```csv
Number,Name
1,TestValue1
2,TestValue2
3,TestValue3
```

You can use the `DataSource` attribute to read the data from the CSV file:

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace YourNamespace
{
    [TestClass]
    public class CsvDataDrivenTest
    {
        public TestContext TestContext { get; set; }

        [TestMethod]
        [DataSource(
            "Microsoft.VisualStudio.TestTools.DataSource.CSV",
            "|DataDirectory|\\TestData.csv",
            "TestData#csv",
            DataAccessMethod.Sequential)]
        public void TestWithCsvDataSource()
        {
            // Access data from the current row
            int number = Convert.ToInt32(TestContext.DataRow["Number"]);
            string name = TestContext.DataRow["Name"].ToString();

            Console.WriteLine($"Number: {number}, Name: {name}");

            // Example assertions or logic
            Assert.IsTrue(number > 0);
            Assert.IsFalse(string.IsNullOrEmpty(name));
        }
    }
}
```
### Store and retrieve runtime data

You can use `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.Properties` to store custom key-value pairs that can be accessed across different methods in the same test session.

Starting with MSTest 4.4, the indexer consistently returns `null` when a custom key doesn't exist.

```csharp
TestContext.Properties["MyKey"] = "MyValue";
string value = TestContext.Properties["MyKey"]?.ToString();
```

> **Note:**
> Starting with MSTest 4.2, test categories from `[TestCategory]` are included in `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.Properties`.
>
> Starting with MSTest 4.3, custom properties added to `TestContext.Properties` in `[AssemblyInitialize]` flow to every class and test in the assembly, and properties added in `[ClassInitialize]` flow to every test in that class. This lets fixtures publish shared context that test methods can read.
>
> Starting with MSTest 4.3.3, `[TestProperty]` values, test categories, host-provided properties, and properties that a test adds remain scoped to that test and don't flow to sibling tests.

### Access `TestContext` from the current call stack

Starting with MSTest 4.2, `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.Current` returns the current test's `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` from anywhere in the call stack during test method execution. This API is experimental, uses the `[Experimental]` attribute, and might change in a future MSTest version.

### Associate data to a test

The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.AddResultFile(System.String)` method allows you to add a file to the test results, making it available for review in the test output. This can be useful if you generate files during your test (for example, log files, screenshots, or data files) that you want to attach to the test results.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class TestClassResultFile
{
    public TestContext TestContext { get; set; }

    [TestMethod]
    public void TestMethodWithResultFile()
    {
        // Simulate creating a log file for this test
        string logFilePath = Path.Combine(TestContext.TestRunDirectory, "TestLog.txt");
        File.WriteAllText(logFilePath, "This is a sample log entry for the test.");

        // Add the log file to the test result
        TestContext.AddResultFile(logFilePath);

        // Perform some assertions (example only)
        Assert.IsTrue(File.Exists(logFilePath), "The log file was not created.");
        Assert.IsTrue(new FileInfo(logFilePath).Length > 0, "The log file is empty.");
    }
}
```
Starting with MSTest 4.5 preview, the native MTP adapter preserves these result files as test attachments so MTP report extensions can include them.

You can also use `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.Write*` or `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.WriteLine*` methods to write custom messages directly to the test output. Starting with MSTest 4.4, the `Live` output capture mode echoes these messages while the test runs and still attaches them to the final test result. For more information, see Configure MSTest output.

### Cancellation token

Starting with MSTest 3.11, `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` exposes a `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext.CancellationToken` property that is signaled when the test times out or the test run is aborted. You should pass this token to async operations so that they can respond to cancellation cooperatively. This is especially important when using Timeout attributes.

> **Note:**
> In earlier MSTest versions, use `TestContext.CancellationTokenSource.Token` instead of `TestContext.CancellationToken`. For constructor injection, use `_testContext.CancellationTokenSource.Token` instead of `_testContext.CancellationToken`.

When `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` is accessed as a property:

```csharp
﻿using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class TestClassCancellationToken
{
    // MSTest automatically sets the TestContext property before each test runs.
    // MSTest.Analyzers includes a diagnostic suppressor that removes CS8618
    // (non-nullable property uninitialized) for this property.
    public TestContext TestContext { get; set; }

    [TestMethod]
    [Timeout(5000, CooperativeCancellation = true)]
    public async Task MyAsyncTest()
    {
        using var client = new HttpClient();
        var response = await client.GetAsync(
            "https://example.com", TestContext.CancellationToken);

        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```
When `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` is injected through the constructor (MSTest 3.6+):

```csharp
﻿using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class TestClassCancellationTokenCtor
{
    private readonly TestContext _testContext;

    public TestClassCancellationTokenCtor(TestContext testContext)
    {
        _testContext = testContext;
    }

    [TestMethod]
    [Timeout(5000, CooperativeCancellation = true)]
    public async Task MyAsyncTest()
    {
        using var client = new HttpClient();
        var response = await client.GetAsync(
            "https://example.com", _testContext.CancellationToken);

        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```
> **Tip:**
> MSTest analyzer rule MSTEST0049 helps identify async calls where `TestContext.CancellationToken` should be passed. It also provides a code fixer to apply the change automatically.

## Related analyzers

The following analyzers help ensure proper usage of the `TestContext` class:

- MSTEST0005 - TestContext property should have valid layout.
- MSTEST0024 - Do not store TestContext in a static member.
- MSTEST0033 - Suppresses CS8618 for TestContext property.
- MSTEST0048 - Avoid TestContext properties in fixture methods.
- MSTEST0049 - Flow TestContext CancellationToken.
- MSTEST0054 - Use CancellationToken property.
