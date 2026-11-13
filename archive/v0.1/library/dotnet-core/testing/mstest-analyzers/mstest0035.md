---
title: "MSTEST0035: [DeploymentItem] can be specified only on test class or test method."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0035.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0035: `[DeploymentItem]` can be specified only on test class or test method

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0035                                                             |
| **Title**                           | `[DeploymentItem]` can be specified only on test class or test method. |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning starting with 4.0.0, Info before                               |
| **Introduced in version**           | 3.6.0                                                                  |
| **Is there a code fix**             | No                                                                     |

## Cause

This rule raises a diagnostic when `[DeploymentItem]` isn't set on test class or test method.

## Rule description

`[DeploymentItem]` describes files or directories that a test needs in its deployment location. MSTest reads deployment metadata from test classes and test methods so it can associate those assets with discovered tests.

An attribute on a helper or lifecycle method doesn't supply deployment metadata for those tests. The expected files can then be unavailable when the test runs, causing an environment failure instead of exercising the intended behavior.

## How to fix violations

Ensure the attribute `[DeploymentItem]` is specified on a test class or a test method, otherwise remove the attribute.

## When to suppress warnings

It's _not_ recommended to suppress warnings from this rule as the `[DeploymentItem]` will be ignored.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0035
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0035
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0035.severity = none
```

For more information, see How to suppress code analysis warnings.
