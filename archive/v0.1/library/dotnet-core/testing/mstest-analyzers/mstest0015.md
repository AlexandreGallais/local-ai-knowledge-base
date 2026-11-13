---
title: "MSTEST0015: Test method should not be ignored"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0015.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0015: Test method should not be ignored

| Property                            | Value                                        |
|-------------------------------------|----------------------------------------------|
| **Rule ID**                         | MSTEST0015                                   |
| **Title**                           | Test method should not be ignored            |
| **Category**                        | Design                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                 |
| **Enabled by default**              | Yes (from 3.3 to 3.7). No (starting with 3.8)|
| **Default severity**                | Info                                         |
| **Introduced in version**           | 3.3.0                                        |
| **Is there a code fix**             | No                                           |

## Cause

A test method is marked with `[Ignore]`.

## Rule description

An ignored test doesn't execute its assertions, so it stops detecting regressions in the behavior it covers. This rule helps you notice tests that were disabled temporarily and never restored, or excluded unintentionally.

`[Ignore]` is a supported MSTest feature, not an invalid test signature. Starting with MSTest 3.8, this rule is opt-in so you can choose whether your project permits ignored tests.

## How to fix violations

Ensure that the test method isn't ignored.

## When to suppress warnings

Suppress a diagnostic only if the exclusion is intentional and your project permits it. Record the reason in the `[Ignore]` attribute; MSTEST0066 can enforce that justification. Don't suppress an unintended exclusion, because the test still won't run.

> **Note:**
> This rule is opt-in. It's not enabled even when using `<MSTestAnalysisMode>All</MSTestAnalysisMode>`. For more information about `MSTestAnalysisMode`, see MSTest code analysis.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0015
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0015
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0015.severity = none
```

For more information, see How to suppress code analysis warnings.
