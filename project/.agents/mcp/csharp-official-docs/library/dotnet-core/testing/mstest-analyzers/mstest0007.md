---
title: "MSTEST0007: Use test attributes only on test methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0007.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0007: Use test attributes only on test methods

| Property                            | Value                                    |
|-------------------------------------|------------------------------------------|
| **Rule ID**                         | MSTEST0007                               |
| **Title**                           | Use test attributes only on test methods |
| **Category**                        | Usage                                    |
| **Fix is breaking or non-breaking** | Non-breaking                             |
| **Enabled by default**              | Yes                                      |
| **Default severity**                | Warning starting with 4.0.0, Info before |
| **Introduced in version**           | 3.3.0                                    |
| **Is there a code fix**             | Yes                                      |

## Cause

A method that's not marked with `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` has one or more test attributes applied to it.

## Rule description

Test attributes supply metadata or execution policy for a discovered test. They don't declare a test entry point themselves. Without `[TestMethod]` or a derived attribute, MSTest doesn't use a helper method's test metadata or conditions when it runs tests.

The following test attributes should only be applied on methods marked with the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` attribute:

- `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionBaseAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CssIterationAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.CssProjectStructureAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.DescriptionAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.ExpectedExceptionBaseAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.OwnerAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.PriorityAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.TestPropertyAttribute`
- `Microsoft.VisualStudio.TestTools.UnitTesting.WorkItemAttribute`

## How to fix violations

To fix a violation of this rule, either convert the method on which you applied the test attributes to a test method by setting the `[TestMethod]` attribute or remove the test attributes altogether.

## When to suppress warnings

Do not suppress a warning from this rule. If you ignore this rule, your attributes will be ignored since they are designed for use only in a test context.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0007
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0007
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0007.severity = none
```

For more information, see How to suppress code analysis warnings.
