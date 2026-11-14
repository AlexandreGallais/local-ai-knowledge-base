---
title: "MSTEST0064: Prefer async assertion methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0064.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0064: Prefer async assertion methods

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0064                                         |
| **Title**                           | Prefer async assertion methods                     |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Info                                               |
| **Introduced in version**           | 4.3.0                                              |
| **Is there a code fix**             | No                                                 |

> **Note:**
> This rule is available starting with MSTest 4.3.

## Cause

A test method uses `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.Throws*` or `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.ThrowsExactly*` to assert an exception is thrown by code that is asynchronous and blocks the asynchronous operation using `GetAwaiter().GetResult()`.

## Rule description

When asserting an exception is thrown by asynchronous code, prefer the async assertion methods `Assert.ThrowsAsync` and `Assert.ThrowsExactlyAsync` over blocking the asynchronous operation with `GetAwaiter().GetResult()`. Blocking on async code can cause deadlocks in some synchronization contexts and is harder to read than the equivalent `await`-based assertion.

```csharp
[TestClass]
public class TestClass
{
    [TestMethod]
    public async Task Test_ThrowsOnAsyncCall()
    {
        // Violation: blocks the async call inside Assert.Throws.
        Assert.Throws<InvalidOperationException>(() => DoAsync().GetAwaiter().GetResult());
    }

    private static async Task DoAsync()
    {
        await Task.Yield();
        throw new InvalidOperationException();
    }
}
```

## How to fix violations

Use the asynchronous assertion method and `await` it:

```csharp
[TestClass]
public class TestClass
{
    [TestMethod]
    public async Task Test_ThrowsOnAsyncCall()
    {
        await Assert.ThrowsAsync<InvalidOperationException>(() => DoAsync());
    }

    private static async Task DoAsync()
    {
        await Task.Yield();
        throw new InvalidOperationException();
    }
}
```

The same applies to `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.ThrowsExactly*`, which has an `Assert.ThrowsExactlyAsync` counterpart.

## When to suppress warnings

You can suppress this warning when the containing test method cannot be made `async` (for example, a synchronous test overload required by a base class or interface signature) and you need to keep the blocking call.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0064
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0064
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0064.severity = none
```

For more information, see How to suppress code analysis warnings.
