---
title: "CompareInfo class (part 7 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 7 of 9)

## CompareInfo.LastIndexOf(Char>, Rune, CompareOptions) method

```csharp
public int LastIndexOf (ReadOnlySpan<char> source, System.Text.Rune value, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Searches for the last occurrence of a `Rune` within the specified read-only span of characters.

Parameters:

- `source`: The read-only span of characters to search within.
- `value`: The `Rune` to locate within `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the search. The default value is `CompareOptions.None`.

Returns: The zero-based index into `source` where `value` last appears; or a negative value if `value` cannot be found within `source`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.

## CompareInfo.LastIndexOf(String, Char, CompareOptions) method

```csharp
public int LastIndexOf (string source, char value, System.Globalization.CompareOptions options);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the entire source string using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the last occurrence of `value`, if found, within `source`, using the specified comparison options; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched backward starting at the end of the string and ending at the beginning of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search. A character is considered equivalent to another character only if the Unicode values are the same. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.LastIndexOf(String, Char, Int32) method

```csharp
public int LastIndexOf (string source, char value, int startIndex);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the section of the source string that extends from the beginning of the string to the specified index.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that extends from the beginning of `source` to `startIndex`; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at the beginning of the string.

This overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if the Unicode values are the same, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string. Note that `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` are searching in different portions of the string, even with the same `startIndex` parameter.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofint.cs._

## CompareInfo.LastIndexOf(String, String, CompareOptions) method

```csharp
public int LastIndexOf (string source, string value, System.Globalization.CompareOptions options);
```

Searches for the specified substring and returns the zero-based index of the last occurrence within the entire source string using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the last occurrence of `value`, if found, within `source`, using the specified comparison options; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched backward starting at the end of the string and ending at the beginning of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search, where the Unicode values are compared.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.LastIndexOf(String, String, Int32) method

```csharp
public int LastIndexOf (string source, string value, int startIndex);
```

Searches for the specified substring and returns the zero-based index of the last occurrence within the section of the source string that extends from the beginning of the string to the specified index.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that extends from the beginning of `source` to `startIndex`; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at the beginning of the string.

This overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where the Unicode values are compared, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string. Note that `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` are searching in different portions of the string, even with the same `startIndex` parameter.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofint.cs._

## CompareInfo.LastIndexOf(Char>, Char>, CompareOptions, Int32) method

```csharp
public int LastIndexOf (ReadOnlySpan<char> source, ReadOnlySpan<char> value, System.Globalization.CompareOptions options, out int matchLength);
```

Searches for the last occurrence of a substring within a source string.

Parameters:

- `source`: The read-only span of characters to search within.
- `value`: The read-only span of characters containing the substring to locate within `source`.
- `options`: The `CompareOptions` to use during the search.
- `matchLength`: When this method returns, contains the number of characters of `source` that matched the desired value. This may be different than the length of `value` if a linguistic comparison is performed. Set to 0 if `value` is not found within `source`.

Returns: The zero-based index into `source` where the substring `value` last appears; or a negative number if `value` cannot be found within `source`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

#### Remarks

This method has greater overhead than other `CompareInfo.LastIndexOf` overloads that don't take a `matchLength` argument. Call this overload only if you require the match length information.
