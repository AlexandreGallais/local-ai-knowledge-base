---
title: "MSTEST0043: Use retry attribute on test method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0043.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0043: Use retry attribute on test method

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0043                                                                               |
| **Title**                           | Use retry attribute on test method                                                       |
| **Category**                        | Usage                                                                                    |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Warning (escalated to Error when setting `MSTestAnalysisMode` to `Recommended` or `All`) |
| **Introduced in version**           | 3.9.0                                                                                    |
| **Is there a code fix**             | No                                                                                       |

## Cause

A method or class has an attribute that derives from `Microsoft.VisualStudio.TestTools.UnitTesting.RetryBaseAttribute` but isn't a test method or test class.

## Rule description

`Microsoft.VisualStudio.TestTools.UnitTesting.RetryBaseAttribute` supplies retry policy for test execution. It doesn't declare a test or turn a helper or lifecycle method into a test. MSTest applies the policy when it invokes a test method, not when it calls an arbitrary method.

Starting with MSTest 4.3, retry attributes can also apply to a class marked with `[TestClass]` or a derived attribute. A class-level retry policy applies to the class's tests; it doesn't retry a lifecycle callback as an independent test. Earlier versions support retry attributes only on test methods.

## How to fix violations

Add `[TestMethod]` to an intended test method or, in MSTest 4.3 and later, `[TestClass]` to an intended test class. If the target isn't intended to declare tests, remove the retry attribute instead.

## When to suppress warnings

Do not suppress a warning from this rule.
