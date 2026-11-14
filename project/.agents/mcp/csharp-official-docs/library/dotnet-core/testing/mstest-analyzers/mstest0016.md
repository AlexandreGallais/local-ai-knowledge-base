---
title: "MSTEST0016: Test class should have test method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0016.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0016: Test class should have test method

| Property                            | Value                                        |
|-------------------------------------|----------------------------------------------|
| **Rule ID**                         | MSTEST0016                                   |
| **Title**                           | Test class should have test method           |
| **Category**                        | Design                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                 |
| **Enabled by default**              | Yes                                          |
| **Default severity**                | Info                                         |
| **Introduced in version**           | 3.3.0                                        |
| **Is there a code fix**             | No                                           |

## Cause

A test class doesn't declare or inherit a test method and doesn't match the rule's fixture-only exemption.

## Rule description

A class marked with `[TestClass]` normally represents executable tests. If it has no test methods, it provides no test coverage and might indicate a missing `[TestMethod]` attribute or an incomplete refactor.

The rule exempts static classes that contain `[AssemblyInitialize]`, `[AssemblyCleanup]`, `[GlobalTestInitialize]`, or `[GlobalTestCleanup]` methods. Those containers provide lifecycle callbacks rather than tests of their own.

## How to fix violations

Add the missing `[TestMethod]` attribute to a real test or add the intended tests. If the class only contains assembly or global lifecycle callbacks, declare it static to match the fixture-only exemption.

## When to suppress warnings

Suppress the diagnostic if the class intentionally contains only shared base behavior or lifecycle callbacks and doesn't match the static-container exemption. Otherwise, check for missing test attributes. Don't add an empty test solely to silence the diagnostic.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0016
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0016
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0016.severity = none
```

For more information, see How to suppress code analysis warnings.
