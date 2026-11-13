---
title: "MSTEST0084: Platform compatibility attributes should be consistent with '[OSCondition]'"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/mstest0084.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTEST0084: Platform compatibility attributes should be consistent with '\[OSCondition]'

| Property | Value |
|---|---|
| **Rule ID** | MSTEST0084 |
| **Title** | Platform compatibility attributes should be consistent with `[OSCondition]` |
| **Category** | Usage |
| **Fix is breaking or non-breaking** | Non-breaking |
| **Enabled by default** | Yes |
| **Default severity** | Info |
| **Introduced in version** | 4.5.0 |
| **Is there a code fix** | Yes, for C# only |

## Cause

An MSTest class or method uses `System.Runtime.Versioning.SupportedOSPlatformAttribute` or `System.Runtime.Versioning.UnsupportedOSPlatformAttribute`, but its MSTest `Microsoft.VisualStudio.TestTools.UnitTesting.OSConditionAttribute` doesn't express a compatible operating-system condition.

## Rule description

Platform compatibility attributes inform compile-time analysis, but they don't control whether MSTest runs a test. Without a compatible `[OSCondition]`, a test can execute on an unsupported operating system and fail before it reaches the behavior that it intends to verify.

```csharp
[TestMethod]
[SupportedOSPlatform("windows")]
public void UsesWindowsApi() { } // Violation
```

The rule accounts for platform compatibility attributes on the test, its containing types, and its assembly. A compatible class-level `[OSCondition]` can satisfy the requirement for a test method. If both the class and method declare `[OSCondition]`, their combined conditions must match the effective platform restriction.

The rule compares operating-system families, not platform versions. For example, `[SupportedOSPlatform("windows10.0")]` still requires a condition for the Windows family, but `[OSCondition]` doesn't enforce the minimum Windows version. The analyzer doesn't report versioned `[UnsupportedOSPlatform]` restrictions because excluding an entire operating-system family would also skip supported versions.

## How to fix violations

Keep the platform compatibility attribute for API analysis, and add or update `[OSCondition]` so MSTest skips the test on unsupported operating-system families.

```csharp
[TestMethod]
[SupportedOSPlatform("windows")]
[OSCondition(OperatingSystems.Windows)]
public void UsesWindowsApi() { }
```

A C# code fix adds or updates `[OSCondition]` when the analyzer can determine a compatible condition. The analyzer reports a diagnostic without a fix when, for example, a method's class-level condition conflicts with its platform attributes, the platform isn't represented by `OperatingSystems`, or the platform attributes mix supported and unsupported restrictions. Resolve those conflicts manually. Visual Basic <example-value> the diagnostic but doesn't provide an automatic fix.

## When to suppress warnings

Suppress the rule when another mechanism guarantees that the test can't run on an incompatible operating system and adding `[OSCondition]` would duplicate that policy.

## Suppress a warning

```csharp
#pragma warning disable MSTEST0084
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0084
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0084.severity = none
```

For more information, see How to suppress code analysis warnings.

## See also

- OSConditionAttribute
- MSTEST0061: Use OSCondition attribute instead of runtime check
