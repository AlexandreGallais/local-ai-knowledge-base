---
title: "MSTEST0026: Avoid conditional access in assertions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0026.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0026: Avoid conditional access in assertions

| Property                            | Value                                                 |
|-------------------------------------|-------------------------------------------------------|
| **Rule ID**                         | MSTEST0026                                            |
| **Title**                           | Avoid conditional access in assertions                |
| **Category**                        | Usage                                                 |
| **Fix is breaking or non-breaking** | Non-breaking                                          |
| **Enabled by default**              | Yes (from 3.5 to 3.7). No (starting with 3.8)         |
| **Default severity**                | Info                                                  |
| **Introduced in version**           | 3.5.0                                                 |
| **Is there a code fix**             | No                                                    |

## Cause

This rule raises a diagnostic when an argument containing a null conditional operator `(?.)` or `?[]` is passed to the assertion methods below:

- `Assert.IsTrue`
- `Assert.IsFalse`
- `Assert.AreEqual`
- `Assert.AreNotEqual`
- `Assert.AreSame`
- `Assert.AreNotSame`
- `CollectionAssert.AreEqual`
- `CollectionAssert.AreNotEqual`
- `CollectionAssert.AreEquivalent`
- `CollectionAssert.AreNotEquivalent`
- `CollectionAssert.Contains`
- `CollectionAssert.DoesNotContain`
- `CollectionAssert.AllItemsAreNotNull`
- `CollectionAssert.AllItemsAreUnique`
- `CollectionAssert.AllItemsAreInstancesOfType`
- `CollectionAssert.IsSubsetOf`
- `CollectionAssert.IsNotSubsetOf`
- `StringAssert.Contains`
- `StringAssert.StartsWith`
- `StringAssert.EndsWith`
- `StringAssert.Matches`
- `StringAssert.DoesNotMatch`

## Rule description

Conditional access returns `null` when its receiver is null, without evaluating the member access. An assertion on that result can fail because the receiver is missing rather than because the member has the wrong value. It can also pass <example-value> if both values compare equal as null.

To make the test's preconditions and failures explicit, assert that an object is non-null before you assert its members. A separate null assertion tells you whether the object was missing or its contents were incorrect.

## How to fix violations

Ensure that arguments do not contain `(?.)` or `?[]` when passed to the assertion methods. Instead, perform null checks before making the assertion.

```csharp
Company? company = GetCompany();
Assert.AreEqual("Contoso", company?.Name); // MSTEST0026
StringAssert.Contains(company?.Address, "Brazil"); // MSTEST0026

// Fixed code
Assert.IsNotNull(company);
Assert.AreEqual("Contoso", company.Name);
StringAssert.Contains(company.Address, "Brazil");
```

## When to suppress warnings

Suppress the diagnostic if null propagation is itself the behavior you intend to verify. Otherwise, assert the expected non-null precondition explicitly.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0026
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0026
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0026.severity = none
```

For more information, see How to suppress code analysis warnings.
