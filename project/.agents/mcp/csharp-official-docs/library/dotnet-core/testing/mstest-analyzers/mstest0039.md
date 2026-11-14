---
title: "MSTEST0039: Use newer 'Assert.Throws' methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0039.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0039: Use newer 'Assert.Throws' methods

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0039                                                             |
| **Title**                           | Use newer 'Assert.Throws' methods                                      |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning starting with 3.10, Info before                                |
| **Introduced in version**           | 3.8.0                                                                  |
| **Is there a code fix**             | Yes                                                                    |

> **Note:**
> This analyzer is no longer relevant for MSTest 4 as the old assertion APIs were removed.

## Cause

The use of `Assert.ThrowsException` or `Assert.ThrowsExceptionAsync`, which are no longer recommended.

## Rule description

The newer exception assertions make the exception-type contract explicit. `Assert.ThrowsExactly` and `Assert.ThrowsExactlyAsync` require the exact exception type, while `Assert.Throws` and `Assert.ThrowsAsync` also accept derived exception types.

To preserve the exact-type behavior of `Assert.ThrowsException` and `Assert.ThrowsExceptionAsync`, migrate to the `ThrowsExactly` variants. Choose a `Throws` variant only if accepting derived exceptions is intentional. The older APIs are removed in MSTest 4.

## How to fix violations

Use `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.ThrowsExactly*` or `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.ThrowsExactlyAsync*` instead of `Assert.ThrowsException` or `Assert.ThrowsExceptionAsync`.

## When to suppress warnings

Do not suppress a warning from this rule. It's strongly recommended to move from the old APIs to the new ones.
