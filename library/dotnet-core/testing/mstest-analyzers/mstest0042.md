---
title: "MSTEST0042: Avoid duplicated 'DataRow' entries"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0042.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0042: Avoid duplicated 'DataRow' entries

| Property                            | Value                                                                  |
|-------------------------------------|------------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0042                                                             |
| **Title**                           | Avoid duplicated 'DataRow' entries                                     |
| **Category**                        | Usage                                                                  |
| **Fix is breaking or non-breaking** | Non-breaking                                                           |
| **Enabled by default**              | Yes                                                                    |
| **Default severity**                | Warning                                                                |
| **Introduced in version**           | 3.9.0                                                                  |
| **Is there a code fix**             | No                                                                     |

## Cause

A test method has two or more DataRow attributes that are equivalent.

## Rule description

`Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute` is used to denote inputs to test methods. It's not expected that a test will intentionally run twice with the exact same data. Duplicated `DataRow`s are often a copy/paste error.

## How to fix violations

Either remove the duplicate `DataRow` attribute, or fix it to make unique.

## When to suppress warnings

Do not suppress a warning from this rule, unless you intended to use the same input more than once.
