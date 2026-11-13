---
title: "MSTEST0032: Review or remove the assertion as its condition is known to be always true."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0032.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0032: Review or remove the assertion as its condition is known to be always true

| Property                            | Value                                                                       |
|-------------------------------------|-----------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0032                                                                  |
| **Title**                           | Review or remove the assertion as its condition is known to be always true. |
| **Category**                        | Usage                                                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                                                |
| **Enabled by default**              | Yes                                                                         |
| **Default severity**                | Warning starting with 4.0.0, Info before                                    |
| **Introduced in version**           | 3.5.0                                                                       |
| **Is there a code fix**             | No                                                                          |

## Cause

This rule raises a diagnostic when a call to an assertion produces an always-true condition.

## Rule description

An assertion that always passes, such as `Assert.IsTrue(true)`, can't detect a regression in the code under test. It can make a test appear to verify behavior while checking only a constant or a value against itself.

Review the assertion for a copy-and-paste error, a missing comparison, or the wrong variable. Assert a condition based on the actual result, or remove an assertion that has no behavior to verify.

## How to fix violations

Ensure that calls to `Assert.IsTrue`, `Assert.IsFalse`, `Assert.AreEqual`, `Assert.AreNotEqual`, `Assert.IsNull` or `Assert.IsNotNull` aren't producing always-true conditions.

## When to suppress warnings

It's _not_ recommended to suppress warnings from this rule.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0032
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0032
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0032.severity = none
```

For more information, see How to suppress code analysis warnings.
