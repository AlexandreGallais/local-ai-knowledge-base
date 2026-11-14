---
title: "MSTEST0079: Use ArchitectureCondition attribute instead of runtime checks"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0079.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0079: Use ArchitectureCondition attribute instead of runtime checks

| Property                            | Value                                              |
|-------------------------------------|----------------------------------------------------|
| **Rule ID**                         | MSTEST0079                                          |
| **Title**                           | Use ArchitectureCondition attribute instead of runtime checks |
| **Category**                        | Usage                                              |
| **Fix is breaking or non-breaking** | Non-breaking                                       |
| **Enabled by default**              | Yes                                                |
| **Default severity**                | Info                                               |
| **Introduced in version**           | 4.4.0                                              |
| **Is there a code fix**             | Yes, for C# only                                   |

## Cause

A test method's first statement compares `System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture` to an `System.Runtime.InteropServices.Architecture` value and then either returns early or calls `Assert.Inconclusive`, instead of using the `[ArchitectureCondition]` attribute.

## Rule description

Test methods that compare `RuntimeInformation.ProcessArchitecture` and then early return or call `Assert.Inconclusive` should use the `[ArchitectureCondition]` attribute instead. The attribute is more declarative and discoverable, and it reports the test as skipped rather than passed, which an early return doesn't.

```csharp
[TestMethod]
public void TestMethod()
{
    if (RuntimeInformation.ProcessArchitecture != Architecture.X64) return; // Violation
}
```

The analyzer only recognizes the guard when it's the method's first statement, with no `else` branch, and when the referenced `Architecture` member has a matching `TestArchitectures` flag.

## How to fix violations

Replace the runtime check with the `[ArchitectureCondition]` attribute.

```csharp
[TestMethod]
[ArchitectureCondition(TestArchitectures.X64)]
public void TestMethod() { }
```

A C# code fix replaces the guard with the attribute for you. Visual Basic code has this diagnostic but doesn't have an automatic fix; apply the attribute by hand.

## When to suppress warnings

You might suppress this warning if your runtime check is more complex than a simple first-statement guard, or if you need conditional logic that `[ArchitectureCondition]` can't express.

## Suppress a warning

If you just want to suppress a single violation, add preprocessor directives to your source file to disable and then re-enable the rule.

```csharp
#pragma warning disable MSTEST0079
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0079
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0079.severity = none
```

For more information, see How to suppress code analysis warnings.

## See also

- ArchitectureConditionAttribute
- MSTEST0061: Use OSCondition attribute instead of runtime checks
