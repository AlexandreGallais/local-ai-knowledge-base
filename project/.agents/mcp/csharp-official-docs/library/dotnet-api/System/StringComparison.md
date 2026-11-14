---
title: "StringComparison enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/StringComparison.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringComparison enum

Namespace: `System`

```csharp
public enum StringComparison
```

Specifies the culture, case, and sort rules to be used by certain overloads of the `String.Compare` and `String.Equals` methods.

#### Remarks
The `StringComparison` enumeration is used to specify whether a string comparison should use the current culture or the invariant culture, word or ordinal sort rules, and be case-sensitive or case-insensitive.

> **Important:**
>  When you call a string comparison method such as `String.Compare`, `String.Equals`, or `String.IndexOf`, you should always call an overload that includes a parameter of type `StringComparison` so that you can specify the type of comparison that the method performs. For more information, see Best Practices for Using Strings.

An operation that uses word sort rules performs a culture-sensitive comparison wherein certain nonalphanumeric Unicode characters might have special weights assigned to them. Using word sort rules and the conventions of a specific culture, the hyphen ("-") might have a very small weight assigned to it so that "coop" and "co-op" appear next to each other in a sorted list.

An operation that uses ordinal sort rules performs a comparison based on the numeric value (Unicode code point) of each `Char` in the string. An ordinal comparison is fast but culture-insensitive. When you use ordinal sort rules to sort strings that start with Unicode characters (U+), the string U+xxxx comes before the string U+yyyy if the value of xxxx is numerically less than yyyy.

For more information about comparisons, see the `String` class remarks. For more information about culture, see the `CultureInfo` class remarks. For guidelines on when to use ordinal or culture-sensitive comparison rules or the rules of the invariant culture, see Best Practices for Using Strings. For a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, see Sorting Weight Tables. For the sort weight table for Linux and macOS, see the Default Unicode Collation Element Table.

#### Examples
The following example compares three sets of strings by using each member of the `StringComparison` enumeration. The comparisons use the conventions of the English (United States), Thai (Thailand), and Turkish (Türkiye) cultures. Note that the strings "a" and "a-" are considered equivalent in the "th-TH" culture but not in the others, while "i" and "İ" are considered equivalent in the "tr-TR" culture when case is ignored but not in the other cultures.

_Code sample not included: ~/snippets/csharp/System/String/Equals/equals_ex3.cs._

## StringComparison.CurrentCulture field

```csharp
CurrentCulture
```

Compare strings using culture-sensitive sort rules and the current culture.

## StringComparison.CurrentCultureIgnoreCase field

```csharp
CurrentCultureIgnoreCase
```

Compare strings using culture-sensitive sort rules, the current culture, and ignoring the case of the strings being compared.

## StringComparison.InvariantCulture field

```csharp
InvariantCulture
```

Compare strings using culture-sensitive sort rules and the invariant culture.

## StringComparison.InvariantCultureIgnoreCase field

```csharp
InvariantCultureIgnoreCase
```

Compare strings using culture-sensitive sort rules, the invariant culture, and ignoring the case of the strings being compared.

## StringComparison.Ordinal field

```csharp
Ordinal
```

Compare strings using ordinal (binary) sort rules.

## StringComparison.OrdinalIgnoreCase field

```csharp
OrdinalIgnoreCase
```

Compare strings using ordinal (binary) sort rules and ignoring the case of the strings being compared.
