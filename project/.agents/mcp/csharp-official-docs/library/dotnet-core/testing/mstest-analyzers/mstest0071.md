---
title: "MSTEST0071: Test method should not specify a display name equal to its name"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0071.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0071: Test method should not specify a display name equal to its name

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0071                                          |
| **Title**                           | Test method should not specify a display name equal to its name |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Info                                               |
| **Introduced in version**           | 4.3.0                                              |
| **Is there a code fix**             | Yes                                                |

## Cause

A test method sets a `DisplayName` (on `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` or `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute`) to a value that's identical to the test method name.

## Rule description

Setting a `DisplayName` to a value that's identical to the method name is redundant, because the method name is already used as the display name by default. The redundant `DisplayName` can be removed without changing how the test is reported.

```csharp
[TestClass]
public class MyTestClass
{
    [TestMethod("Test")] // Violation: same as the method name.
    public void Test()
    {
    }
}
```

## How to fix violations

Remove the redundant `DisplayName`.

```csharp
[TestClass]
public class MyTestClass
{
    [TestMethod]
    public void Test()
    {
    }
}
```

A code fix is available.

## When to suppress warnings

It's safe to suppress this warning if you intentionally set the display name explicitly, for example to keep it stable if the method is later renamed.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0071
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0071
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0071.severity = none
```

For more information, see How to suppress code analysis warnings.
