---
title: "MSTEST0046: Use Assert instead of StringAssert"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0046.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0046: Use Assert instead of StringAssert

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0046                                                                               |
| **Title**                           | Use Assert instead of StringAssert                                                       |
| **Category**                        | Usage                                                                                    |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Info                                                                                     |
| **Introduced in version**           | 3.10.0                                                                                   |
| **Is there a code fix**             | Yes                                                                                      |

## Cause

A test method uses `Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert` methods instead of equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods.

## Rule description

`Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert` methods have equivalent counterparts in `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` that provide the same functionality. Use the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods for consistency, better readability, improved discoverability, and alignment with behavior across all test frameworks.

The following `Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert` methods have equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods:

- `StringAssert.Contains(value, substring)` → `Assert.Contains(substring, value)`
- `StringAssert.StartsWith(value, substring)` → `Assert.StartsWith(substring, value)`
- `StringAssert.EndsWith(value, substring)` → `Assert.EndsWith(substring, value)`
- `StringAssert.Matches(value, pattern)` → `Assert.MatchesRegex(pattern, value)`
- `StringAssert.DoesNotMatch(value, pattern)` → `Assert.DoesNotMatchRegex(pattern, value)`

> **Warning:**
> When migrating from `Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert` to `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods, be careful about the change in parameter order. In `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods, the expected value is always the first parameter.

## How to fix violations

Use the provided code fixer to automatically replace `Microsoft.VisualStudio.TestTools.UnitTesting.StringAssert` method calls with their equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods. You can also manually replace the method calls if needed.

## When to suppress warnings

Don't suppress warnings from this rule. The `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods provide the same functionality with better consistency.
