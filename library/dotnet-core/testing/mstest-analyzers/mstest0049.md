---
title: "MSTEST0049: Flow TestContext cancellation token"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0049.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0049: Flow TestContext cancellation token

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0049                                                                               |
| **Title**                           | Flow TestContext cancellation token                                                     |
| **Category**                        | Usage                                                                                    |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Info                                                                                     |
| **Introduced in version**           | 3.10.0                                                                                   |
| **Is there a code fix**             | Yes                                                                                      |

## Cause

A method call within a test context doesn't use the `System.Threading.CancellationToken` available from `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` when the called method has a parameter or overload that accepts a `System.Threading.CancellationToken`.

## Rule description

When `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` is available in your test methods, you should flow its `System.Threading.CancellationToken` to async operations. This enables cooperative cancellation when timeouts occur and ensures proper resource cleanup. The `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` cancellation token is especially important when using cooperative cancellation with timeout attributes.

This rule triggers when:

- A method call has an optional `System.Threading.CancellationToken` parameter that isn't explicitly provided.
- A method call has an overload that accepts a `System.Threading.CancellationToken` but the non-cancellable overload is used instead.

## How to fix violations

Use the provided code fixer to automatically pass the `System.Threading.CancellationToken` from `Microsoft.VisualStudio.TestTools.UnitTesting.TestContext` to method calls that support cancellation. You can also manually update method calls to include `TestContext.CancellationToken` as a parameter.

> **Note:**
> The following examples use `TestContext.CancellationToken`, which is available in MSTest 3.11 and later. In MSTest 3.10, use `TestContext.CancellationTokenSource.Token` instead. For constructor injection, use `_testContext.CancellationTokenSource.Token` instead of `_testContext.CancellationToken`.

### Example: TestContext property

The following code triggers MSTEST0049 because `Task.Delay` and `HttpClient.GetAsync` accept a `System.Threading.CancellationToken` but none is passed:

```csharp
[TestClass]
public class MyTestClass
{
    public TestContext TestContext { get; set; }

    [TestMethod]
    public async Task TestMethod()
    {
        using var client = new HttpClient();
        // MSTEST0049: these calls accept a CancellationToken but none is passed
        await Task.Delay(1000);
        var response = await client.GetAsync("https://example.com");
    }
}
```

The fix is to pass `TestContext.CancellationToken` to each call:

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
            "<example-value>", TestContext.CancellationToken);

        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```
### Example: constructor injection (MSTest 3.6+)

With constructor injection, use the `_testContext` field to access the cancellation token:

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
            "<example-value>", _testContext.CancellationToken);

        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```
## When to suppress warnings

Suppress this warning if you intentionally don't want to support cancellation for specific operations, or if the operation should continue even when the test is cancelled.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0049
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0049
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0049.severity = none
```

For more information, see How to suppress code analysis warnings.
