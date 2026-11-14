---
title: "MSTEST0053: Avoid using Assert methods with format parameters"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0053.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0053: Avoid using Assert methods with format parameters

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0053                                                                               |
| **Title**                           | Avoid using Assert methods with format parameters                                        |
| **Category**                        | Usage                                                                                    |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Warning                                                                                  |
| **Introduced in version**           | 3.11.0                                                                                   |
| **Is there a code fix**             | Yes                                                                                      |

> **Note:**
> This analyzer is no longer relevant for MSTest 4 as the assertion APIs with format parameters were removed.

## Cause

An assertion method call uses the `message` and `parameters` arguments for string formatting instead of using string interpolation.

## Rule description

Format-parameter overloads refer to message values by numeric position, so a change to the argument list can leave a placeholder associated with the wrong value. The compiler doesn't check that each numeric placeholder refers to the value you intended.

String interpolation places each expression next to the message text that describes it and lets the compiler check the referenced variables. That makes failure messages easier to read and refactor. The format-parameter overloads are also removed in MSTest 4, so interpolation avoids a dependency on those older APIs.

## How to fix violations

Replace calls that use message format parameters with string interpolation.

For example, change this:

```csharp
[TestMethod]
public void TestMethod()
{
    int expected = 5;
    int actual = GetValue();
    Assert.AreEqual(expected, actual, "Expected {0} but got {1}", expected, actual);
}
```

To this:

```csharp
[TestMethod]
public void TestMethod()
{
    int expected = 5;
    int actual = GetValue();
    Assert.AreEqual(expected, actual, $"Expected {expected} but got {actual}");
}
```

## When to suppress warnings

Don't suppress warnings from this rule. These overloads are removed in MSTest v4 and are not recommended.
