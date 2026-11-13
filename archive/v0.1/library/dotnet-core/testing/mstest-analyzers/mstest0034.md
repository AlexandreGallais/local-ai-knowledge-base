---
title: "MSTEST0034: Use `ClassCleanupBehavior.EndOfClass` with the `[ClassCleanup]`."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0034.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0034: Use `ClassCleanupBehavior.EndOfClass` with the `[ClassCleanup]`

| Property                            | Value                                                            |
|-------------------------------------|------------------------------------------------------------------|
| **Rule ID**                         | MSTEST0034                                                       |
| **Title**                           | Use `ClassCleanupBehavior.EndOfClass` with the `[ClassCleanup]`. |
| **Category**                        | Usage                                                            |
| **Fix is breaking or non-breaking** | Non-breaking                                                     |
| **Enabled by default**              | Yes                                                              |
| **Default severity**                | Info                                                             |
| **Introduced in version**           | 3.6.0                                                            |
| **Is there a code fix**             | No                                                               |

> **Note:**
> This analyzer is no longer relevant for MSTest 4 as `ClassCleanupBehavior` was removed.

## Cause

This rule raises a diagnostic when `ClassCleanupBehavior.EndOfClass` isn't set with the `[ClassCleanup]`.

## Rule description

In MSTest 3, the default `[ClassCleanup]` timing is the end of the assembly rather than the end of the class. That delay can retain class-owned resources, such as files or connections, while unrelated classes continue to run.

To release resources when their owning class's tests finish, use `ClassCleanupBehavior.EndOfClass`. If a resource intentionally belongs to the whole assembly, express that lifetime with `[AssemblyCleanup]` instead. MSTest 4 removes `ClassCleanupBehavior` and uses end-of-class cleanup.

## How to fix violations

Use `[ClassCleanup(ClassCleanupBehavior.EndOfClass)]`.

## When to suppress warnings

It's _not_ recommended to suppress warnings from this rule as you can use instead `[AssemblyCleanup]`.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0034
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0034
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0034.severity = none
```

For more information, see How to suppress code analysis warnings.
