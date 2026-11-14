---
title: "MSTEST0068: Use Assert instead of CollectionAssert"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0068.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0068: Use Assert instead of CollectionAssert

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0068                                         |
| **Title**                           | Use `Assert` instead of `CollectionAssert`         |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Info                                               |
| **Introduced in version**           | 4.3.0                                              |
| **Is there a code fix**             | Yes                                                |

> **Note:**
> This rule is available starting with MSTest 4.3.

## Cause

A test method uses `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` methods instead of equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods.

## Rule description

Most `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` methods have equivalent counterparts in `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` that provide the same functionality. Prefer the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods for consistency, better readability, improved discoverability, and alignment with behavior across all test frameworks.

The following `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` methods have equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods:

- `CollectionAssert.AreEqual(a, b)` → `Assert.AreSequenceEqual(a, b)`
- `CollectionAssert.AreNotEqual(a, b)` → `Assert.AreNotSequenceEqual(a, b)`
- `CollectionAssert.AreEquivalent(a, b)` → `Assert.AreSequenceEqual(a, b, SequenceOrder.InAnyOrder)`
- `CollectionAssert.AreNotEquivalent(a, b)` → `Assert.AreNotSequenceEqual(a, b, SequenceOrder.InAnyOrder)`
- `CollectionAssert.AllItemsAreNotNull(a)` → `Assert.AreAllNotNull(a)`
- `CollectionAssert.AllItemsAreUnique(a)` → `Assert.AreAllDistinct(a)`
- `CollectionAssert.AllItemsAreInstancesOfType(collection, typeof(T))` → `Assert.AreAllOfType<T>(collection)`
- `CollectionAssert.Contains(collection, value)` → `Assert.Contains(value, collection)`
- `CollectionAssert.DoesNotContain(collection, value)` → `Assert.DoesNotContain(value, collection)`

> **Warning:**
> When migrating from `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` to `Microsoft.VisualStudio.TestTools.UnitTesting.Assert`, be careful about the change in parameter order for `Contains`, `DoesNotContain`, and `AllItemsAreInstancesOfType`. In `Microsoft.VisualStudio.TestTools.UnitTesting.Assert`, the expected value is always the first parameter.

Overloads of `AreEqual`/`AreNotEqual` that take an `System.Collections.IComparer` are skipped because `Assert.AreSequenceEqual` expects an `System.Collections.Generic.IEqualityComparer`1` (different semantics). Overloads of `AreEquivalent`/`AreNotEquivalent` that take an `System.Collections.Generic.IEqualityComparer`1` are also skipped. `IsSubsetOf`/`IsNotSubsetOf` have no direct `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` equivalent today and are not handled.

## How to fix violations

Use the provided code fixer to automatically replace `Microsoft.VisualStudio.TestTools.UnitTesting.CollectionAssert` method calls with their equivalent `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods. You can also manually replace the method calls if needed.

## When to suppress warnings

Don't suppress warnings from this rule. The `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` methods provide the same functionality with better consistency.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0068
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0068
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0068.severity = none
```

For more information, see How to suppress code analysis warnings.
