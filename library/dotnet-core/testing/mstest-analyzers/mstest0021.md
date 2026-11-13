---
title: "MSTEST0021: Prefer Dispose over TestCleanup methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0021.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0021: Prefer Dispose over TestCleanup methods

| Property                            | Value                                   |
|-------------------------------------|-----------------------------------------|
| **Rule ID**                         | MSTEST0021                              |
| **Title**                           | Prefer Dispose over TestCleanup methods |
| **Category**                        | Design                                  |
| **Fix is breaking or non-breaking** | Non-breaking                            |
| **Enabled by default**              | No                                      |
| **Default severity**                | Info                                    |
| **Introduced in version**           | 3.4.0                                   |
| **Is there a code fix**             | Yes, starting with 3.7.0                |

## Cause

This rule raises a diagnostic when there is a void `[TestCleanup]` method or on any `[TestCleanup]` if the targeted framework supports `IAsyncDisposable` interface.

## Rule description

To express that a test-class instance owns resources, use the standard .NET `IDisposable` or `IAsyncDisposable` pattern. MSTest invokes the disposal methods as part of per-test cleanup, so resource release can follow the same pattern as the rest of your code.

`[TestCleanup]` is also supported. This rule expresses an opt-in convention, not a requirement for correct test execution. MSTEST0022 offers the opposite convention; choose the cleanup policy that fits your project rather than enabling both.

## How to fix violations

Replace `[TestCleanup]` method by `Dispose` or `DisposeAsync` pattern.

## When to suppress warnings

You usually don't want to suppress warnings from this rule if you decided to opt-in for it.

> **Note:**
> This rule is opt-in. It's not enabled even when using `<MSTestAnalysisMode>All</MSTestAnalysisMode>`. For more information about `MSTestAnalysisMode`, see MSTest code analysis.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0021
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0021
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0021.severity = none
```

For more information, see How to suppress code analysis warnings.
