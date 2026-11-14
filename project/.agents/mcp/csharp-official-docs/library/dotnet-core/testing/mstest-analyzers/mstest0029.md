---
title: "MSTEST0029: Public method should be test method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0029.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0029: Public method should be test method

| Property                            | Value                                        |
|-------------------------------------|----------------------------------------------|
| **Rule ID**                         | MSTEST0029                                   |
| **Title**                           | Public method should be test method          |
| **Category**                        | Design                                       |
| **Fix is breaking or non-breaking** | Non-breaking                                 |
| **Enabled by default**              | No                                           |
| **Default severity**                | Info                                         |
| **Introduced in version**           | 3.5.0                                        |
| **Is there a code fix**             | Yes                                          |

## Cause

A `public` method should be a test method.

## Rule description

A `public` method of a class marked with `[TestClass]` should be a test method (marked with `[TestMethod]`). The rule ignores methods that are marked with `[TestInitialize]`, or `[TestCleanup]` attributes.

Public visibility alone doesn't make a method a test. This opt-in convention helps you catch a missing `[TestMethod]` attribute and distinguish test entry points from helper methods. A helper can still be valid public code, but MSTest won't discover it as an independent test.

## How to fix violations

Add `[TestMethod]` if the method is intended to be a test. If it's a helper, give it the least visibility its callers require instead of turning it into a test.

## When to suppress warnings

Suppress the diagnostic if the method is intentionally a public helper or must satisfy a public contract. Don't suppress a missing attribute on an intended test, because that test won't execute.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0029
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0029
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0029.severity = none
```

For more information, see How to suppress code analysis warnings.
