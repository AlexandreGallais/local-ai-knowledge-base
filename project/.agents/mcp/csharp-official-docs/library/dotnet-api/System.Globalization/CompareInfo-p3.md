---
title: "CompareInfo class (part 3 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 3 of 9)

## CompareInfo.GetHashCode(String, CompareOptions) method

```csharp
public int GetHashCode (string source, System.Globalization.CompareOptions options);
```

Gets the hash code for a string based on specified comparison options.

Parameters:

- `source`: The string whose hash code is to be returned.
- `options`: A value that determines how strings are compared.

Returns: A 32-bit signed integer hash code.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The behavior of `CompareInfo.GetHashCode` is dependent on its implementation, which might change from one version of the common language runtime to another, or from one platform to another.

> **Important:**
> If two string objects are equal, the `CompareInfo.GetHashCode` method returns identical values. However, there is not a unique hash code value for each unique string value. Different strings can return the same hash code.
>
> The hash code itself is not guaranteed to be stable. Hash codes for identical strings can differ across versions of .NET and across platforms (such as 32-bit and 64-bit) for a single version of .NET. Hash codes shouldn't be treated as unique identifiers, persisted, or used outside the current process.

## CompareInfo.GetSortKey(String) method

```csharp
public System.Globalization.SortKey <example-value> (string source);
```

Gets the sort key for the specified string.

Parameters:

- `source`: The string for which a `SortKey` object is obtained.

Returns: The `SortKey` object that contains the sort key for the specified string.

#### Remarks
Each character in a string is given several categories of sort weights, including script, alphabetic, case, and diacritic weights. A sort key is the repository of these weights for a particular string. For example, a sort key might contain a string of alphabetic weights, followed by a string of case weights, and so on. The `CompareInfo.GetSortKey` method is equivalent to the Windows API method `LCMapString` with the LCMAP_SORTKEY flag.

## CompareInfo.GetSortKey(String, CompareOptions) method

```csharp
public System.Globalization.SortKey <example-value> (string source, System.Globalization.CompareOptions options);
```

Gets a `SortKey` object for the specified string using the specified `CompareOptions` value.

Parameters:

- `source`: The string for which a `SortKey` object is obtained.
- `options`: A bitwise combination of one or more of the following enumeration values that define how the sort key is calculated: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, `CompareOptions.IgnoreKanaType`, `CompareOptions.NumericOrdering`, and `CompareOptions.StringSort`.

Returns: The `SortKey` object that contains the sort key for the specified string.

Exceptions:

- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
Each character in a string is given several categories of sort weights, including script, alphabetic, case, and diacritic weights. A sort key is the repository of these weights for a particular string. For example, a sort key might contain a string of alphabetic weights, followed by a string of case weights, and so on. The `CompareInfo.GetSortKey` method is equivalent to the Windows API method `LCMapString` with the LCMAP_SORTKEY flag.

## CompareInfo.GetSortKey(Char>, Byte>, CompareOptions) method

```csharp
public int GetSortKey (ReadOnlySpan<char> source, Span<byte> destination, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Computes a sort key for the specified input.

Parameters:

- `source`: The text to get the sort key for.
- `destination`: The buffer into which the resulting sort key bytes are stored.
- `options`: An optional combination of `CompareOptions` enumeration values to use for computing the sort key. The default value is `CompareOptions.None`.

Returns: The number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `destination` is too small to contain the resulting sort key; or `options` contains an unsupported flag; or `source` cannot be processed using the desired `CompareOptions` under the current `CompareInfo`.

#### Remarks

Use `GetSortKeyLength` to query the required size of `destination`.
It is acceptable to provide a larger-than-necessary output buffer to this method.

## CompareInfo.GetSortKeyLength(Char>, CompareOptions) method

```csharp
public int GetSortKeyLength (ReadOnlySpan<char> source, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Gets the total number of sort key bytes that would be produced from the specified input.

Parameters:

- `source`: The text to get the sort key for.
- `options`: An optional combination of `CompareOptions` enumeration values to use for computing the sort key. The default value is `CompareOptions.None`.

Returns: The length, in bytes, of the sort key.

Exceptions:

- `ArgumentException`: `options` contains an unsupported flag.

-or-

`source` cannot be processed using the desired `CompareOptions` under the current `CompareInfo`.

To be added.

## CompareInfo.IndexOf(String, Char) method

```csharp
public int IndexOf (string source, char value);
```

Searches for the specified character and returns the zero-based index of the first occurrence within the entire source string.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.

Returns: The zero-based index of the first occurrence of `value`, if found, within `source`; otherwise, -1. Returns 0 (zero) if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method searches the source string from the beginning of the string to the end of the string.

This overload performs a culture-sensitive search. If `value` represents a precomposed Unicode character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode code points are the same, you should call an overload that has a parameter of type `CompareOptions` and use the `Ordinal` value. Unlike `CompareInfo.IndexOf`, which performs a culture-sensitive comparison, overloads of the `String.IndexOf` method that search for a character perform an ordinal comparison and overloads that search for a string perform a culture-sensitive comparison.

> **Note:**
>  When possible, you should use string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.IndexOf(String, String) method

```csharp
public int IndexOf (string source, string value);
```

Searches for the specified substring and returns the zero-based index of the first occurrence within the entire source string.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.

Returns: The zero-based index of the first occurrence of `value`, if found, within `source`; otherwise, -1. Returns 0 (zero) if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.

#### Remarks
The source string is searched forward starting at the beginning of the string and ending at the end of the string.

This overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where the Unicode values are compared, you should use one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.IndexOf(Char>, Char>, CompareOptions) method

```csharp
public int IndexOf (ReadOnlySpan<char> source, ReadOnlySpan<char> value, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Searches for the first occurrence of a substring within the specified read-only span of characters.

Parameters:

- `source`: The string to search within.
- `value`: The substring to locate within `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the search. The default value is `CompareOptions.None`.

Returns: The zero-based index into `source` where the substring `value` first appears; or a negative value if `value` cannot be found within `source`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.

## CompareInfo.IndexOf(Char>, Rune, CompareOptions) method

```csharp
public int IndexOf (ReadOnlySpan<char> source, System.Text.Rune value, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Searches for the first occurrence of a `Rune` within the specified read-only span of characters.

Parameters:

- `source`: The read-only span of characters to search within.
- `value`: The `Rune` to locate within `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the search. The default value is `CompareOptions.None`.

Returns: The zero-based index into `source` where `value` first appears; or a negative value if `value` cannot be found within `source`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.

## CompareInfo.IndexOf(String, Char, CompareOptions) method

```csharp
public int IndexOf (string source, char value, System.Globalization.CompareOptions options);
```

Searches for the specified character and returns the zero-based index of the first occurrence within the entire source string using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.
- `options`: A value that defines how the strings should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: The zero-based index of the first occurrence of `value`, if found, within `source`, using the specified comparison options; otherwise, -1. Returns 0 (zero) if `value` is an ignorable character.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
The source string is searched forward starting at the beginning of the string and ending at the end of the string.

The `NumericOrdering` and `StringSort` values are not valid for this method.

If `options` does not include the `Ordinal` value, this overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. If `options` includes the `Ordinal` value, this overload performs an ordinal (culture-insensitive) search. A character is considered equivalent to another character only if the Unicode values are the same. Overloads of `String.IndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should use string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._
