---
title: "GlobalizationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/GlobalizationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GlobalizationExtensions class

Namespace: `System.Globalization`

```csharp
public static class GlobalizationExtensions
```

Provides globalization-related extension methods.

To be added.

## GlobalizationExtensions.GetStringComparer(CompareInfo, CompareOptions) method

```csharp
public static StringComparer GetStringComparer (this System.Globalization.CompareInfo compareInfo, System.Globalization.CompareOptions options);
```

Returns a `StringComparer` object based on the culture-sensitive string comparison rules of a specified `CompareInfo` object.

Parameters:

- `compareInfo`: An object that supports culture-sensitive string comparison.
- `options`: A value that defines how strings should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, the enumeration value `CompareOptions.OrdinalIgnoreCase`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, `CompareOptions.IgnoreKanaType`, `CompareOptions.NumericOrdering`, and `CompareOptions.StringSort`.

Returns: An object that can be used to perform string comparisons.

Exceptions:

- `ArgumentNullException`: `compareInfo` is `null`.
- `ArgumentException`: `options` is invalid.

To be added.
