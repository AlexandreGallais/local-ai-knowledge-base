---
title: "MSTEST0038: Don't use 'Assert.AreSame' or 'Assert.AreNotSame' with value types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0038.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0038: Don't use 'Assert.AreSame' or 'Assert.AreNotSame' with value types

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0038                                                             |
| **Title**                           | Don't use 'Assert.AreSame' or 'Assert.AreNotSame' with value types     |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning                                                                |
| **Introduced in version**           | 3.8.0                                                                  |
| **Is there a code fix**             | Yes                                                                    |

## Cause

The use of `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreSame*` or `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreNotSame*` with one or both arguments being a value type.

## Rule description

`Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreSame*` and `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreNotSame*` work by comparing the *reference* of the given `expected`/`notExpected` and actual arguments via `ReferenceEquals`. Hence, when you pass a value type, it is boxed.

If using `AreSame`, the assert will always fail. If using `AreNotSame`, the assert will always pass.

For `AreSame`, the only case when the assert passes is if both arguments are nullable value types whose values are both null. In this case, it's clearer to have two separate `Assert.IsNull` calls.

## How to fix violations

Use `Assert.AreEqual` and `Assert.AreNotEqual` instead of `Assert.AreSame` and `Assert.AreNotSame`.
If using `Assert.AreSame` and both arguments are nullable value types whose values are expected to be null, then two separate `Assert.IsNull` calls might be a better fit than `AreEqual`, depending on the intent of the test.

## When to suppress warnings

Do not suppress a warning from this rule. Ignoring this rule will result in an assertion that will always fail or always pass.
