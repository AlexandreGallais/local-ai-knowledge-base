---
id: csharp-analysis-string-culture-rules
title: C# string and culture rules
topic: csharp-analysis
summary: CA1305, CA1310 and CA1862, with wrong and right examples. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# string and culture rules

Contents: 1. CA1305 · 2. CA1310 · 3. CA1862 · Sources

## 1. Parse and format with an explicit culture (CA1305)

Pass `CultureInfo.InvariantCulture` when you parse or format numbers and dates for files and data. Pass `CultureInfo.CurrentCulture` only for text shown to the user. [S1]

Why: the default culture changes with the machine. A machine set to French writes `3,14` and can fail to read `3.14`.

Wrong:

```csharp
public static class PressureText
{
    public static string Format(string text)
    {
        double pressure = double.Parse(text);
        return pressure.ToString("F2");
    }
}
```

Right:

```csharp
public static class PressureText
{
    public static string Format(string text)
    {
        double pressure = double.Parse(text, CultureInfo.InvariantCulture);
        return pressure.ToString("F2", CultureInfo.InvariantCulture);
    }
}
```

## 2. Compare strings with a StringComparison (CA1310)

Pass a `StringComparison` to `StartsWith`, `EndsWith`, `IndexOf` and `Compare`. Use `Ordinal` for identifiers, tags, keys and paths. [S1]

Wrong:

```csharp
public static class Tags
{
    public static bool IsValve(string tag) => tag.StartsWith("V-");
}
```

Right:

```csharp
public static class Tags
{
    public static bool IsValve(string tag) => tag.StartsWith("V-", StringComparison.Ordinal);
}
```

## 3. Compare without case, never with ToLower (CA1862)

Write `string.Equals(a, b, StringComparison.OrdinalIgnoreCase)`. Never call `ToLower()` or `ToUpper()` to compare. [S1]

Why: `ToLower()` creates a new string, and it depends on the culture (CA1311).

Wrong:

```csharp
public static class Kinds
{
    public static bool IsPump(string kind) => kind.ToLower() == "pump";
}
```

Right:

```csharp
public static class Kinds
{
    public static bool IsPump(string kind) => string.Equals(kind, "pump", StringComparison.OrdinalIgnoreCase);
}
```

## Sources

- [S1] Microsoft, "Code quality rules: globalization (CA1304, CA1305, CA1309, CA1310, CA1311) and performance (CA1862)", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/globalization-warnings>, read 2026-11-13, CC BY 4.0, summarized.
