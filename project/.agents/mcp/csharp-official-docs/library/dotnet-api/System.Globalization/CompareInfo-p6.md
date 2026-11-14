---
title: "CompareInfo class (part 6 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 6 of 9)

## CompareInfo.IsPrefix(String, String, CompareOptions) method

```csharp
public bool IsPrefix (string source, string prefix, System.Globalization.CompareOptions options);
```

Determines whether the specified source string starts with the specified prefix using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search in.
- `prefix`: The string to compare with the beginning of `source`.
- `options`: A value that defines how `source` and `prefix` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: `true` if the length of `prefix` is less than or equal to the length of `source` and `source` starts with `prefix`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`prefix` is `null`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
Every string starts and ends with an empty substring (""); therefore, if `prefix` is an empty string, this method returns `true`.

The `NumericOrdering` and `StringSort` values are not valid for this method.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines whether a string is the prefix or suffix of another string using `CompareOptions`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IsPrefix/isprefixsuffixopt.cs._

## CompareInfo.IsPrefix(Char>, Char>, CompareOptions, Int32) method

```csharp
public bool IsPrefix (ReadOnlySpan<char> source, ReadOnlySpan<char> prefix, System.Globalization.CompareOptions options, out int matchLength);
```

Determines whether a string starts with a specific prefix.

Parameters:

- `source`: The read-only span of characters to search within.
- `prefix`: The read-only span of characters containing the prefix to attempt to match at the start of `source`.
- `options`: The `CompareOptions` to use during the match.
- `matchLength`: When this method returns, contains the number of characters of `source` that matched the desired prefix. This may be different than the length of `prefix` if a linguistic comparison is performed. Set to 0 if the prefix did not match.

Returns: `true` if `prefix` occurs at the start of `source`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

#### Remarks

This method has greater overhead than other `IsPrefix` overloads that don't take a `matchLength` argument. Call this overload only if you require the match length information.

## CompareInfo.IsSortable(Char) method

```csharp
public static bool IsSortable (char ch);
```

Indicates whether a specified Unicode character is sortable.

Parameters:

- `ch`: A Unicode character.

Returns: `true` if the `ch` parameter is sortable; otherwise, `false`.

#### Remarks
The `ch` parameter is sortable if it is a Unicode character that is defined in an internal `CompareInfo` class sort table, and is not a private use or unpaired high or low surrogate character.

## CompareInfo.IsSortable(Char>) method

```csharp
public static bool IsSortable (ReadOnlySpan<char> text);
```

Indicates whether a specified Unicode read-only span of characters is sortable.

Parameters:

- `text`: A read-only span of characters of zero or more Unicode characters.

Returns: `true` if `text` is non-empty and contains only sortable Unicode characters; otherwise, `false`.

To be added.

## CompareInfo.IsSortable(String) method

```csharp
public static bool IsSortable (string text);
```

Indicates whether a specified Unicode string is sortable.

Parameters:

- `text`: A string of zero or more Unicode characters.

Returns: `true` if the `text` parameter is not an empty string ("") and all the Unicode characters in `text` are sortable; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `text` is `null`.

#### Remarks
Each Unicode character in the `str` parameter is represented by one or more UTF-16 encoded `Char` objects. The `str` parameter is sortable if each Unicode character is defined in an internal `CompareInfo` class sort table, and is not a private use or unpaired high or low surrogate character.

## CompareInfo.IsSortable(Rune) method

```csharp
public static bool IsSortable (System.Text.Rune value);
```

Indicates whether a specified `Rune` is sortable.

Parameters:

- `value`: A Unicode scalar value.

Returns: `true` if `value` is a sortable Unicode scalar value; otherwise, `false`.

To be added.

## CompareInfo.IsSuffix(String, String) method

```csharp
public bool IsSuffix (string source, string suffix);
```

Determines whether the specified source string ends with the specified suffix.

Parameters:

- `source`: The string to search in.
- `suffix`: The string to compare with the end of `source`.

Returns: `true` if the length of `suffix` is less than or equal to the length of `source` and `source` ends with `suffix`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`suffix` is `null`.

#### Remarks
Every string starts and ends with an empty substring (""); therefore, if `suffix` is an empty string, this method returns `true`.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines whether a string is the prefix or suffix of another string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IsPrefix/isprefixsuffix.cs._

## CompareInfo.IsSuffix(Char>, Char>, CompareOptions) method

```csharp
public bool IsSuffix (ReadOnlySpan<char> source, ReadOnlySpan<char> suffix, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Determines whether a read-only span of characters ends with a specific suffix.

Parameters:

- `source`: The read-only span of characters to search within.
- `suffix`: The suffix to attempt to match at the end of `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the match. The default value is `CompareOptions.None`.

Returns: `true` if `suffix` occurs at the end of `source`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.

## CompareInfo.IsSuffix(String, String, CompareOptions) method

```csharp
public bool IsSuffix (string source, string suffix, System.Globalization.CompareOptions options);
```

Determines whether the specified source string ends with the specified suffix using the specified `CompareOptions` value.

Parameters:

- `source`: The string to search in.
- `suffix`: The string to compare with the end of `source`.
- `options`: A value that defines how `source` and `suffix` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal` used by itself, or the bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, and `CompareOptions.IgnoreKanaType`.

Returns: `true` if the length of `suffix` is less than or equal to the length of `source` and `source` ends with `suffix`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`suffix` is `null`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
Every string starts and ends with an empty substring (""); therefore, if `suffix` is an empty string, this method returns `true`.

The `NumericOrdering` and `StringSort` values are not valid for this method.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines whether a string is the prefix or suffix of another string using `CompareOptions`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IsPrefix/isprefixsuffixopt.cs._

## CompareInfo.IsSuffix(Char>, Char>, CompareOptions, Int32) method

```csharp
public bool IsSuffix (ReadOnlySpan<char> source, ReadOnlySpan<char> suffix, System.Globalization.CompareOptions options, out int matchLength);
```

Determines whether a string ends with a specific suffix.

Parameters:

- `source`: The read-only span of characters to search within.
- `suffix`: The read-only span of characters containing the suffix to attempt to match at the end of `source`.
- `options`: The `CompareOptions` to use during the match.
- `matchLength`: When this method returns, contains the number of characters of `source` that matched the desired suffix. This may be different than the length of `suffix` if a linguistic comparison is performed. Set to 0 if the suffix did not match.

Returns: `true` if `suffix` occurs at the end of `source`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

#### Remarks

This method has greater overhead than other `IsSuffix` overloads that don't take a `matchLength` argument. Call this overload only if you require the match length information.

## CompareInfo.LastIndexOf(String, Char) method

```csharp
public int LastIndexOf (string source, char value);
```

Searches for the specified character and returns the zero-based index of the last occurrence within the entire source string.

Parameters:

- `source`: The string to search.
- `value`: The character to locate within `source`.

Returns: The zero-based index of the last occurrence of `value`, if found, within `source`; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The source string is searched backward starting at the end of the string and ending at the beginning of the string.

This overload performs a culture-sensitive search. If the character is a Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), it might be considered equivalent to any occurrence of its components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if the Unicode values are the same, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value. Overloads of `String.LastIndexOf` that search for a character perform an ordinal search, whereas those that search for a string perform a culture-sensitive search.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.LastIndexOf(String, String) method

```csharp
public int LastIndexOf (string source, string value);
```

Searches for the specified substring and returns the zero-based index of the last occurrence within the entire source string.

Parameters:

- `source`: The string to search.
- `value`: The string to locate within `source`.

Returns: The zero-based index of the last occurrence of `value`, if found, within `source`; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

-or-

`value` is `null`.

#### Remarks
The source string is searched backward starting at the end of the string and ending at the beginning of the string.

This overload performs a culture-sensitive search. A Unicode value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture. To perform an ordinal (culture-insensitive) search, where the Unicode values are compared, you should call one of the overloads that has a parameter of type `CompareOptions` and use the `Ordinal` value.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example determines the indexes of the first and last occurrences of a character or a substring within a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/IndexOf/indexof.cs._

## CompareInfo.LastIndexOf(Char>, Char>, CompareOptions) method

```csharp
public int LastIndexOf (ReadOnlySpan<char> source, ReadOnlySpan<char> value, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Searches for the last occurrence of a substring within the specified read-only span of characters.

Parameters:

- `source`: The read-only span of characters to search within.
- `value`: The substring to locate within `source`.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the search. The default value is `CompareOptions.None`.

Returns: The zero-based index into `source` where the substring `value` last appears; or a negative value if `value` cannot be found within `source`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.
