---
title: "MSTEST0020: Prefer constructors over TestInitialize methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0020.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0020: Prefer constructors over TestInitialize methods

| Property                            | Value                                           |
|-------------------------------------|-------------------------------------------------|
| **Rule ID**                         | MSTEST0020                                      |
| **Title**                           | Prefer constructors over TestInitialize methods |
| **Category**                        | Design                                          |
| **Fix is breaking or non-breaking** | Non-breaking                                    |
| **Enabled by default**              | No                                              |
| **Default severity**                | Info                                            |
| **Introduced in version**           | 3.4.0                                           |
| **Is there a code fix**             | Yes                                             |

## Cause

This rule raises a diagnostic when there is a void `[TestInitialize]` method.

## Rule description

For synchronous setup, a constructor lets you assign `readonly` fields and lets the compiler check that non-nullable members are initialized before construction completes. The compiler doesn't know that MSTest will call a later `[TestInitialize]` method, so setup there doesn't provide the same constructor-initialization guarantees.

`[TestInitialize]` is still supported and is appropriate for asynchronous setup. This rule expresses an opt-in convention, not a runtime requirement. MSTEST0019 offers the alternative convention for test-initialization methods; don't enable both competing conventions.

## How to fix violations

Replace `[TestInitialize]` returning `void` by constructors.

## When to suppress warnings

You usually don't want to suppress warnings from this rule if you decided to opt-in for it.

> **Note:**
> This rule is opt-in. It's not enabled even when using `<MSTestAnalysisMode>All</MSTestAnalysisMode>`. For more information about `MSTestAnalysisMode`, see MSTest code analysis.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0020
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0020
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0020.severity = none
```

For more information, see How to suppress code analysis warnings.
