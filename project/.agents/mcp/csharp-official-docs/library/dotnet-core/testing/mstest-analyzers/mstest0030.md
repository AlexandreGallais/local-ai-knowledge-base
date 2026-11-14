---
title: "MSTEST0030: Type containing `[TestMethod]` should be marked with `[TestClass]`"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0030.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0030: Type containing `[TestMethod]` should be marked with `[TestClass]`

| Property                            | Value                                                              |
|-------------------------------------|--------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0030                                                         |
| **Title**                           | Type containing `[TestMethod]` should be marked with `[TestClass]` |
| **Category**                        | Usage                                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                                       |
| **Enabled by default**              | Yes                                                                |
| **Default severity**                | Warning starting with 4.0.0, Info before                           |
| **Introduced in version**           | 3.5.0                                                              |
| **Is there a code fix**             | No                                                                 |

## Cause

Type containing `[TestMethod]` should be marked with `[TestClass]`, otherwise the test method will be silently ignored.

## Rule description

`[TestClass]` identifies the fixture that owns test instances and class-level lifecycle callbacks. MSTest discovers those containers before it enumerates their test methods. `[TestMethod]` alone doesn't establish a fixture, so a concrete class without `[TestClass]` doesn't contribute its own tests.

If a class only supplies test implementations for derived classes, declare it abstract to express that it isn't a runnable fixture of its own. Mark each concrete test class with `[TestClass]`.

## How to fix violations

Mark a concrete class that owns tests with `[TestClass]`. If the class only supplies shared base behavior, declare it abstract and mark the concrete derived test classes with `[TestClass]`.

## When to suppress warnings

It's safe to suppress the diagnostic if you are sure that your class is being inherited and that the tests declared on this class should only be run in the context of subclasses. Nonetheless, we recommend marking the class as abstract.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0030
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0030
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0030.severity = none
```

For more information, see How to suppress code analysis warnings.
