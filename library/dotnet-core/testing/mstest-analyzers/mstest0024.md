---
title: "MSTEST0024: Do not store TestContext in a static member"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0024.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0024: Do not store TestContext in a static member

| Property                            | Value                                       |
|-------------------------------------|---------------------------------------------|
| **Rule ID**                         | MSTEST0024                                  |
| **Title**                           | Do not store TestContext in a static member |
| **Category**                        | Usage                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                |
| **Enabled by default**              | Yes                                         |
| **Default severity**                | Warning starting with 4.0.0, Info before    |
| **Introduced in version**           | 3.4.0                                       |
| **Is there a code fix**             | No                                          |

## Cause

This rule raises a diagnostic when an assignment to a `static` member of a `TestContext` parameter is done.

Starting with MSTest 4.4, the rule also detects coalescing assignments, such as `s_testContext ??= testContext`, and deconstruction assignments that store `TestContext` in a static member.

## Rule description

The `TestContext` passed to `[AssemblyInitialize]` or `[ClassInitialize]` describes that fixture's lifecycle, not the currently executing test. MSTest doesn't update a cached fixture context to turn it into the context for each later test.

For example, `TestName` and data-row properties belong to per-test execution and aren't available in class or assembly fixtures. A saved fixture context can't supply those values for the current test. Static caching also encourages concurrent tests to share a context that isn't theirs. To access per-test information, use the test instance's `TestContext`; share specific fixture data instead of the context object.

## How to fix violations

Do not store the `[AssemblyInitialize]` or `[ClassInitialize]` `TestContext` parameter.

## When to suppress warnings

You can suppress warnings from this rule if you are sure of the behavior does match what you want to do.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0024
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0024
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0024.severity = none
```

For more information, see How to suppress code analysis warnings.
