---
title: "MSTEST0044: Prefer TestMethod over DataTestMethod"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0044.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0044: Prefer TestMethod over DataTestMethod

| Property                            | Value                                                                                    |
|-------------------------------------|------------------------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0044                                                                               |
| **Title**                           | Prefer TestMethod over DataTestMethod                                                    |
| **Category**                        | Design                                                                                   |
| **Fix is breaking or non-breaking** | Non-breaking                                                                             |
| **Enabled by default**              | Yes                                                                                      |
| **Default severity**                | Warning                                                                                  |
| **Introduced in version**           | 3.10.0                                                                                    |
| **Is there a code fix**             | Yes                                                                                       |

## Cause

A method or type uses `Microsoft.VisualStudio.TestTools.UnitTesting.DataTestMethodAttribute` or inherits from it.

## Rule description

`Microsoft.VisualStudio.TestTools.UnitTesting.DataTestMethodAttribute` provides no additional value over `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` and will be removed in a future version. Use `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` instead for all test methods, including those that use data source attributes like `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute`.

## How to fix violations

Use the provided code fixer to automatically replace `Microsoft.VisualStudio.TestTools.UnitTesting.DataTestMethodAttribute` with `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute`. You can also manually replace the attribute if needed. If you have a custom attribute that inherits from `Microsoft.VisualStudio.TestTools.UnitTesting.DataTestMethodAttribute`, change it to inherit from `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` instead.

## When to suppress warnings

Don't suppress warnings from this rule. `Microsoft.VisualStudio.TestTools.UnitTesting.DataTestMethodAttribute` will be removed in a future version, so you should migrate to `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute`.
