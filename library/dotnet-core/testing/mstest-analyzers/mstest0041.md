---
title: "MSTEST0041: Use 'ConditionBaseAttribute' on test classes"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0041.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0041: Use 'ConditionBaseAttribute' on test classes

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0041                                                             |
| **Title**                           | Use 'ConditionBaseAttribute' on test classes                           |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning                                                                |
| **Introduced in version**           | 3.8.0                                                                  |
| **Is there a code fix**             | Yes, starting with MSTest 4.4                                          |

## Cause

The use of an attribute that inherits from `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionBaseAttribute` on a class that is not marked with `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute`.

## Rule description

An attribute that derives from `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionBaseAttribute` only has an effect when applied to a class that's marked with `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute`.

Conditions control whether MSTest runs a discovered test target; they don't declare a test class themselves. On an ordinary helper class, the condition can look like test policy without participating in test discovery or execution. This rule catches that mismatch between the apparent policy and the tests the runner actually recognizes.

## How to fix violations

Depending on the intent, either add the missing `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` or remove the attribute that derives from `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionBaseAttribute`.

Starting with MSTest 4.4, the code fix adds `[TestClass]` to the affected type.

## When to suppress warnings

Do not suppress a warning from this rule.
