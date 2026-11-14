---
title: "MSTEST0040: Do not assert inside 'async void' contexts"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0040.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0040: Do not assert inside 'async void' contexts

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0040                                                             |
| **Title**                           | Do not assert inside 'async void' contexts                             |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning                                                                |
| **Introduced in version**           | 3.8.0                                                                  |
| **Is there a code fix**             | No                                                                     |

## Cause

The use of any assertion method in an `async void` method, local function, or lambda.

## Rule description

Exceptions that are thrown in an `async void` context are unhandled. A failing assertion in an `async void` method will be swallowed and will not crash the process when using VSTest under .NET Framework. Under .NET, a failing assertion in an `async void` method might crash the process when using MTP or VSTest. In cases where a custom `SynchronizationContext` is present that catches the exception, the failing assertion might be silently swallowed.

## How to fix violations

Refactor the code to not use assertions in `async void`.

## When to suppress warnings

Do not suppress a warning from this rule.
