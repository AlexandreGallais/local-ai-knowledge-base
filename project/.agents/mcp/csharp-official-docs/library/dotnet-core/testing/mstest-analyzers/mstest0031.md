---
title: "MSTEST0031: `System.ComponentModel.DescriptionAttribute` has no effect on test methods."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0031.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0031: `System.ComponentModel.DescriptionAttribute` has no effect on test methods

| Property                            | Value                                                                       |
|-------------------------------------|-----------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0031                                                                  |
| **Title**                           | `System.ComponentModel.DescriptionAttribute` has no effect on test methods. |
| **Category**                        | Usage                                                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                                                |
| **Enabled by default**              | Yes                                                                         |
| **Default severity**                | Warning starting with 4.0.0, Info before                                    |
| **Introduced in version**           | 3.5.0                                                                       |
| **Is there a code fix**             | No                                                                          |

## Cause

'System.ComponentModel.DescriptionAttribute' has no effect in the context of tests.

## Rule description

`System.ComponentModel.DescriptionAttribute` and `Microsoft.VisualStudio.TestTools.UnitTesting.DescriptionAttribute` share the same short name but serve different consumers. MSTest reads its own attribute for test metadata; the component-model attribute doesn't supply a test description.

The wrong namespace can therefore produce code that compiles but loses the intended description in test metadata. Use the MSTest attribute when the description is meant for the test runner.

## How to fix violations

Remove or replace `System.ComponentModel.DescriptionAttribute` by `Microsoft.VisualStudio.TestTools.UnitTesting.DescriptionAttribute` instead.

## When to suppress warnings

We don't recommend to suppress the diagnostic as the `System.ComponentModel.DescriptionAttribute` has no effect in the context of tests.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0031
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0031
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0031.severity = none
```

For more information, see How to suppress code analysis warnings.
