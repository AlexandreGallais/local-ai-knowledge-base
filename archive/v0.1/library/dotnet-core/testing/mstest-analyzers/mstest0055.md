---
title: "MSTEST0055: Do not ignore the return value of string methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0055.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0055: Do not ignore the return value of string methods

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0055                                                                               |
| **Title**                           | Do not ignore the return value of string methods                                         |
| **Category**                        | Usage                                                                                    |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Warning                                                                                  |
| **Introduced in version**           | 3.11.0                                                                                   |
| **Is there a code fix**             | No                                                                                       |

## Cause

A call to `System.String.Contains*`, `System.String.StartsWith*`, or `System.String.EndsWith*` is made and its return value is ignored.

## Rule description

Those methods don't have any side effects and ignoring the return result is always wrong. It's more likely that the original intent of those calls are to assert that they are true.

## How to fix violations

Capture and use the return value from string methods, or use a proper assertion method.

For example, change this:

```csharp
[TestMethod]
public void TestMethod()
{
    string value = "Hello world";
    value.StartsWith("Hello");
}
```

To this:

```csharp
[TestMethod]
public void TestMethod()
{
    string value = "Hello world";
    Assert.IsTrue(value.StartsWith("Hello")); // or, Assert.StartsWith("Hello", value);
}
```

## When to suppress warnings

Don't suppress warnings from this rule. Calling string methods without using their return value is always a bug or a dead code.
