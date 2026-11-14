---
title: "MSTEST0087: Avoid duplicated 'DataRow' display names"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/mstest0087.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTEST0087: Avoid duplicated `DataRow` display names

| Property | Value |
|---|---|
| **Rule ID** | MSTEST0087 |
| **Title** | Avoid duplicated `DataRow` display names |
| **Category** | Usage |
| **Fix is breaking or non-breaking** | Non-breaking |
| **Enabled by default** | Yes |
| **Default severity** | Warning |
| **Introduced in version** | 4.5.0 |
| **Is there a code fix** | No |

## Cause

Two or more `Microsoft.VisualStudio.TestTools.UnitTesting.DataRowAttribute` instances on the same test method set the same `DisplayName`, and the name isn't null, empty, or whitespace.

## Rule description

Duplicate explicit display names make data rows indistinguishable in Test Explorer, reports, and failure output. The rule compares names with ordinal, case-sensitive equality and reports each duplicate after the first occurrence. It ignores names that are null, empty, or whitespace.

```csharp
[TestMethod]
[DataRow(1, DisplayName = "valid")]
[DataRow(2, DisplayName = "valid")] // Violation
public void Validate(int value) { }
```

## How to fix violations

Give each row a unique display name, or remove `DisplayName` and let MSTest generate names from the method and arguments.

```csharp
[DataRow(1, DisplayName = "valid-one")]
[DataRow(2, DisplayName = "valid-two")]
```

## When to suppress warnings

Don't suppress this rule when the rows must remain distinguishable in test results. Suppression is reasonable only when a downstream runner replaces the display names with another unique identity.

## Suppress a warning

```csharp
#pragma warning disable MSTEST0087
// The code that's violating the rule is on this line.
#pragma warning restore MSTEST0087
```

To disable the rule for a file, folder, or project, set its severity to `none` in the configuration file.

```ini
[*.{cs,vb}]
dotnet_diagnostic.MSTEST0087.severity = none
```

For more information, see How to suppress code analysis warnings.

## See also

- Data-driven testing in MSTest
- MSTEST0042: Duplicate DataRow
