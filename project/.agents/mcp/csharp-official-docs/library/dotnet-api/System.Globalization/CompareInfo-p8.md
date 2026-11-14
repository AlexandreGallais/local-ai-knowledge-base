---
title: "CompareInfo class (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 8 of 9)

## CompareInfo.LastIndexOf(String, Char, Int32, CompareOptions) method

```csharp
public int LastIndexOf (string source, char value, int startIndex, System.Globalization.CompareOptions options);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the section of the source string that extends from the beginning of the string to the specified index using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that extends from the beginning of `source` to `startIndex`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at the beginning of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search. A character is considered equivalent to another character only if the Unicode values are the same. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string. Note that `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` are searching in different portions of the string, even with the same `startIndex` parameter.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofint.cs._

## CompareInfo.LastIndexOf(String, Char, Int32, Int32) method

```csharp
public int LastIndexOf (string source, char value, int startIndex, int count);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the section of the source string that contains the specified number of elements and ends at the specified index.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that contains the number of elements specified by `count` and that ends at `startIndex`; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `source`.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at `startIndex` - `count` + 1.

This overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if the Unicode values are the same, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._

## CompareInfo.LastIndexOf(String, String, Int32, CompareOptions) method

```csharp
public int LastIndexOf (string source, string value, int startIndex, System.Globalization.CompareOptions options);
```

Searches for the specified substring and returns the zero-based index of the last occurrence within the section of the source string that extends from the beginning of the string to the specified index using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that extends from the beginning of `source` to `startIndex`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at the beginning of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search, where the Unicode values are compared.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string. Note that `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` are searching in different portions of the string, even with the same `startIndex` parameter.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofint.cs._

## CompareInfo.LastIndexOf(String, String, Int32, Int32) method

```csharp
public int LastIndexOf (string source, string value, int startIndex, int count);
```

Searches for the specified substring and returns the zero-based index of the last occurrence within the section of the source string that contains the specified number of elements and ends at the specified index.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that contains the number of elements specified by `count` and that ends at `startIndex`; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

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
The source string is searched backward starting at `startIndex` and ending at `startIndex` - `count` + 1.

This overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where the Unicode values are compared, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons .

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._

## CompareInfo.LastIndexOf(String, Char, Int32, Int32, CompareOptions) method

```csharp
public int LastIndexOf (string source, char value, int startIndex, int count, System.Globalization.CompareOptions options);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the section of the source string that contains the specified number of elements and ends at the specified index using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `options`: A value that defines how `source` and `value` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the last occurrence of `value`, if found, within the section of `source` that contains the number of elements specified by `count` and that ends at `startIndex`, using the specified comparison options; otherwise, -1. Returns `startIndex` if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `source`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `source`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched backward starting at `startIndex` and ending at `startIndex` - `count` + 1.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search. A character is considered equivalent to another character only if the Unicode values are the same. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a portion of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexofintint.cs._
