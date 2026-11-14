---
title: "CompareOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareOptions enum

Namespace: `System.Globalization`

```csharp
public enum CompareOptions
```

Defines the string comparison options to use with `CompareInfo`.

The cross-platform ICU (International Components for Unicode) library is used for string processing. The ICU library has the following behaviors:

- The default option `None` is equivalent to the `StringSort` option.
- Ligatures (combined characters like "æ" and "œ") are seen as distinct from their expanded forms ("ae", "oe") in string comparisons by default. To treat ligatures and their expanded forms as equivalent, use the `IgnoreNonSpace` option.

For more information, see .NET globalization and ICU.

The `CompareOptions` options denote case sensitivity or necessity to ignore types of characters.

.NET uses three distinct ways of sorting: word sort, string sort, and ordinal sort. Word sort performs a culture-sensitive comparison of strings. Certain nonalphanumeric characters might have special weights assigned to them. For example, the hyphen ("-") might have a very small weight assigned to it so that "coop" and "co-op" appear next to each other in a sorted list. String sort is similar to word sort, except that there are no special cases. Therefore, all nonalphanumeric symbols come before all alphanumeric characters. Ordinal sort compares strings based on the Unicode values of each element of the string. For a downloadable set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, see Sorting Weight Tables. For the sort weight table for Linux and macOS, see the Default Unicode Collation Element Table. The specific version of the sort weight table on Linux and macOS depends on the version of the International Components for Unicode libraries installed on the system. For information on ICU versions and the Unicode versions that they implement, see Downloading ICU.

The `StringSort` value can only be used with `CompareInfo.Compare` and `CompareInfo.GetSortKey`. `ArgumentException` is thrown if the StringSort value is used with `CompareInfo.IsPrefix`, `CompareInfo.IsSuffix`, `CompareInfo.IndexOf`, or `CompareInfo.LastIndexOf`.

> **Note:**
> When possible, you should use string comparison methods that accept a `CompareOptions` value to specify the kind of comparison expected. As a general rule, user-facing comparisons are best served by the use of linguistic options (using the current culture), while security comparisons should specify `Ordinal` or `OrdinalIgnoreCase`.

#### Culture-sensitive sorts

#### Examples

The following code example shows how each of the `CompareOptions` values affect string comparisons.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareOptions/Overview/compareoptions_values.cs._

The following code example shows how sorting with `StringSort` differs from sorting without StringSort.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareOptions/Overview/compareoptions_stringsort.cs._

## CompareOptions.IgnoreCase field

```csharp
IgnoreCase
```

A string comparison that ignores case differences.

## CompareOptions.IgnoreKanaType field

```csharp
IgnoreKanaType
```

A string comparison that ignores the kana type. Kana type refers to Japanese hiragana and katakana characters, which represent phonetic sounds. Hiragana is used for native Japanese words, while katakana is used for words borrowed from other languages. With this option, hiragana and katakana characters that represent the same sound are considered equal.

## CompareOptions.IgnoreNonSpace field

```csharp
IgnoreNonSpace
```

A string comparison that ignores nonspacing combining characters, such as diacritics. Nonspacing characters modify base characters without occupying their own space. The Unicode Standard defines combining characters as characters that are combined with base characters to produce a new character.

## CompareOptions.IgnoreSymbols field

```csharp
IgnoreSymbols
```

A string comparison that ignores symbols, including whitespace, punctuation, currency symbols, the percent sign, mathematical symbols, the ampersand, and similar characters.

## CompareOptions.IgnoreWidth field

```csharp
IgnoreWidth
```

A string comparison that ignores character width. For example, full-width and half-width forms of Japanese katakana characters are considered equal with this option.

## CompareOptions.None field

```csharp
None
```

A string comparison with default option settings.

## CompareOptions.NumericOrdering field

```csharp
NumericOrdering
```

A string comparison that sorts sequences of digits (Unicode general category "Nd") based on their numeric value.

For example, "2" comes before "10". Non-digit characters such as decimal points, minus, and plus signs aren't considered as part of the sequence and will terminate it. This flag is not valid for indexing methods (such as `CompareInfo.IndexOf` and `CompareInfo.IsPrefix`).

## CompareOptions.Ordinal field

```csharp
Ordinal
```

A string comparison that uses the Unicode UTF-16 encoded values of the strings, comparing them code unit by code unit. This results in a fast, culture-insensitive comparison where strings are ordered based only on their binary values. This option can't be combined with other `CompareOptions` values and must be used alone.

## CompareOptions.OrdinalIgnoreCase field

```csharp
OrdinalIgnoreCase
```

A string comparison that ignores case, then performs an ordinal comparison. This technique is equivalent to converting the string to uppercase using the invariant culture and then performing an ordinal comparison on the result.

This value can't be combined with other `CompareOptions` values and must be used alone.

## CompareOptions.StringSort field

```csharp
StringSort
```

A string comparison that uses the string sort algorithm, where nonalphanumeric symbols (such as hyphens and apostrophes) are sorted before alphanumeric characters.
