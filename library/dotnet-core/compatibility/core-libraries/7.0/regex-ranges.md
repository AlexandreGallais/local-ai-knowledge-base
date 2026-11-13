---
title: ".NET 7 breaking change: Regex patterns with ranges corrected"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/regex-ranges.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Regex patterns with ranges corrected

Regex incorrectly handles the casing of some ranges in .NET Framework, and in .NET 6 and earlier versions. This bug was fixed in .NET 7.

The fix for this bug could cause a breaking change if your regular expression has a bug that was hidden because of this bug or if you implemented a workaround for this bug.

## Previous behavior

In .NET 6 and earlier versions, the following two patterns produce different results. However, they should produce the same result (`false`), since the range `\xD7-\xD8` only includes the values `\xD7` and `\xD8` themselves.

```csharp
// Evaluates to false.
Regex.IsMatch("\xF7", @"^(?i:[\xD7\xD8])$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
// Evaluates to true.
Regex.IsMatch("\xF7", @"^(?i:[\xD7-\xD8])$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
```

## New behavior

Starting in .NET 7, the example patterns both evaluate to `false`.

```csharp
// Evaluates to false.
Regex.IsMatch("\xF7", @"^(?i:[\xD7\xD8])$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
// Evaluates to false.
Regex.IsMatch("\xF7", @"^(?i:[\xD7-\xD8])$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
```

## Version introduced

.NET 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was incorrect.

## Recommended action

If your regular expression has a hidden bug, fix it. If you had a workaround for this bug, you can remove the workaround.

## Affected APIs

- `System.Text.RegularExpressions.Regex.Count*`
- `System.Text.RegularExpressions.Regex.EnumerateMatches*`
- `System.Text.RegularExpressions.Regex.IsMatch*`
- `System.Text.RegularExpressions.Regex.Match*`
- `System.Text.RegularExpressions.Regex.Matches*`
- `System.Text.RegularExpressions.Regex.Replace*`
- `System.Text.RegularExpressions.Regex.Split*`
