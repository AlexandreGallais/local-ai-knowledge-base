---
title: "MSTEST0023: Do not negate boolean assertions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0023.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0023: Do not negate boolean assertions

| Property                            | Value                                    |
|-------------------------------------|------------------------------------------|
| **Rule ID**                         | MSTEST0023                               |
| **Title**                           | Do not negate boolean assertions         |
| **Category**                        | Usage                                    |
| **Fix is breaking or non-breaking** | Non-breaking                             |
| **Enabled by default**              | Yes                                      |
| **Default severity**                | Info (Warning in 4.0)                    |
| **Introduced in version**           | 3.4.0                                    |
| **Is there a code fix**             | No                                       |

## Cause

This rule raises a diagnostic when a call to `Assert.IsTrue` or `Assert.IsFalse` contains a negated argument.

## Rule description

MSTest assertion library contains opposite APIs that makes it easier to test `true` and `false` cases. It is recommend to use the right API for the right case as it is improving readability and also provides better information in case of failure.

## How to fix violations

When negating argument in a `Assert.IsTrue` call, you should use `Assert.IsFalse`.
When negating argument in a `Assert.IsFalse` call, you should use `Assert.IsTrue`.

## When to suppress warnings

Do not suppress warnings from this rule.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0023
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0023
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0023.severity = none
```

For more information, see How to suppress code analysis warnings.
