---
title: "MSTEST0004: Public types should be test classes"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0004.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0004: Public types should be test classes

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0004                                         |
| **Title**                           | Public types should be test classes                |
| **Category**                        | Design                                             |
| **Fix is breaking or non-breaking** | Breaking                                           |
| **Enabled by default**              | No                                                 |
| **Default severity**                | Disabled                                           |
| **Introduced in version**           | 3.2.0                                              |
| **Is there a code fix**             | Yes                                                |

## Cause

A public type is not a test class (class marked with the `[TestClass]` attribute).

## Rule description

To distinguish runnable tests from support code, reserve publicly visible concrete classes for test classes and keep helper classes `internal` when possible. This opt-in design rule helps you notice a missing `[TestClass]` attribute or an unintentionally public helper.

Public helper classes aren't invalid MSTest code. The rule enforces a project convention, not a discovery requirement, and doesn't report abstract or static classes.

## How to fix violations

Change the accessibility of the type to not be `public`.

## When to suppress warnings

Suppress the diagnostic when a helper must remain public for another assembly or an existing contract. A deliberately public helper doesn't become a test class unless it has `[TestClass]` or a derived attribute.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0004
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0004
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0004.severity = none
```

For more information, see How to suppress code analysis warnings.
