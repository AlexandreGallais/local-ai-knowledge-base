---
title: "CompareInfo class (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 5 of 9)

## CompareInfo.IndexOf(String, String, Int32, CompareOptions) method

```csharp
public int IndexOf (string source, string value, int startIndex, System.Globalization.CompareOptions options);
```

Searches for the specified substring and returns the zero-based index of the first occurrence within the section of the source string that extends from the specified index to the end of the string using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the first occurrence of `value`, if found, within the section of `source` that extends from `startIndex` to the end of `source`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched forward starting at `startIndex` and ending at the end of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search, where the Unicode values are compared.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string. Note that `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` are searching in different portions of the string, even with the same `startIndex` parameter.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofint.cs._

## CompareInfo.IndexOf(String, String, Int32, Int32) method

```csharp
public int IndexOf (string source, string value, int startIndex, int count);
```

Searches for the specified substring and returns the zero-based index of the first occurrence within the section of the source string that starts at the specified index and contains the specified number of elements.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of `value`, if found, within the section of `source` that starts at `startIndex` and contains the number of elements specified by `count`; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `source`.

#### Remarks
The source string is searched forward starting at `startIndex` and ending at `startIndex` + `count` - 1.

This overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where the Unicode values are compared, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._

## CompareInfo.IndexOf(String, Char, Int32, Int32, CompareOptions) method

```csharp
public int IndexOf (string source, char value, int startIndex, int count, System.Globalization.CompareOptions options);
```

Searches for the specified character and returns the zero-based index of the first occurrence within the section of the source string that starts at the specified index and contains the specified number of elements using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the first occurrence of `value`, if found, within the section of `source` that starts at `startIndex` and contains the number of elements specified by `count`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched forward starting at `startIndex` and ending at `startIndex` + `count` - 1.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search. A character is considered equivalent to another character only if the Unicode values are the same. Overloads of `String.IndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._

## CompareInfo.IndexOf(String, String, Int32, Int32, CompareOptions) method

```csharp
public int IndexOf (string source, string value, int startIndex, int count, System.Globalization.CompareOptions options);
```

Searches for the specified substring and returns the zero-based index of the first occurrence within the section of the source string that starts at the specified index and contains the specified number of elements using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the first occurrence of `value`, if found, within the section of `source` that starts at `startIndex` and contains the number of elements specified by `count`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched forward starting at `startIndex` and ending at `startIndex` + `count` - 1.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search, where the Unicode values are compared.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._

## CompareInfo.IsPrefix(String, String) method

```csharp
public bool IsPrefix (string source, string prefix);
```

Determines whether the specified source string starts with the specified prefix.

Parameters:

- `source`: The string to search in.
- `prefix`: The string to compare with the beginning of `source`.

Returns: `true` if the length of `prefix` is less than or equal to the length of `source` and `source` starts with `prefix`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`prefix` is `null`.

#### Remarks
Every string starts and ends with an empty substring (""); therefore, if `prefix` is an empty string, this method returns `true`.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines whether a string is the prefix or suffix of another string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IsPrefix/isprefixsuffix.cs._

## CompareInfo.IsPrefix(Char>, Char>, CompareOptions) method

```csharp
public bool IsPrefix (ReadOnlySpan<char> source, ReadOnlySpan<char> prefix, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Determines whether a read-only span of characters starts with a specific prefix.

Parameters:

- `source`: The read-only span of characters to search within.
- `prefix`: The prefix to attempt to match at the start of `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the match. The default value is `CompareOptions.None`.

Returns: `true` if `prefix` occurs at the start of `source`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.
